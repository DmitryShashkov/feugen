var terminalsModel = require('../models/terminals');
var rulesModel = require('../models/rules');
var async = require('async');

// rule node types:
// 1 - word
// 2 - part of speech
// 3 - preposition
// 4 - conjunction
// 5 - pronoun
// not that scalable, but, you know...

// this surely should be taken from DB
var partsOfSpeech = {
    'существительное': 0,
    'прилагательное': 1,
    'глагол': 2,
    'наречие': 3
};

function generate (req, res, next) {
    var params = {
        id: req.params.id
    };
    var phrase = '';
    rulesModel.getRule(params, function (err, ruleParts) {
        if (err) {
            return next(err);
        }
        async.eachSeries(ruleParts,
            function iteratee (rulePart, callback) {
                // magic constant, but still
                if (rulePart['node_type'] !== 2) {
                    // for all nodes except 'part of speech', just put it's value in
                    phrase += rulePart['value'] + ' ';
                    callback();
                } else {
                    params = {
                        partOfSpeech: partsOfSpeech[rulePart['value']]
                    };
                    terminalsModel.getTerminalsByPartOfSpeech(params, function (err, terminals) {
                        if (err) {
                            return next(err);
                        }
                        phrase += terminals[Math.floor(Math.random() * terminals.length)]['eng_spelling'] + ' ';
                        callback();
                    });
                }
            },
            function resultCallback (err) {
                if (err) {
                    return next(err);
                }
                return res.send({
                    status: 'ok',
                    phrase: phrase
                });   
            });
    });
}

module.exports = {
    generate: generate
};