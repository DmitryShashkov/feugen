var terminalsModel = require('../models/terminals');
var prepositionsModel = require('../models/prepositions');
var pronounsModel = require('../models/pronouns');
var conjunctionsModel = require('../models/conjunctions');
var rulesModel = require('../models/rules');

function getTerminals (req, res, next) {
    var params = {
        query: req.params.query
    };
    terminalsModel.getTerminals(params, function (err, result) {
        if (err) {
            return next(err);
        }
        return res.send({
            'status': 'ok',
            'rows': result
        });
    });
}

function removeTerminal (req, res, next) {
    var params = {
        id: req.params.id
    };
    terminalsModel.removeTerminal(params, function (err, result) {
        if (err) {
            return next(err);
        }
        return res.send({
            'status': 'ok'
        });
    });
}

function addTerminal (req, res, next) {
    var params = {
        rusSpelling: req.body.rusSpelling,
        engSpelling: req.body.engSpelling,
        partOfSpeech: req.body.partOfSpeech
    };
    terminalsModel.addTerminal(params, function (err, result) {
        if (err) {
            return next(err);
        }
        return res.send({
            'status': 'ok'
        });
    });
}

function editTerminal (req, res, next) {
    var params = {
        id: req.params.id,
        rusSpelling: req.body.rusSpelling,
        engSpelling: req.body.engSpelling,
        partOfSpeech: req.body.partOfSpeech
    };
    terminalsModel.editTerminal(params, function (err, result) {
        if (err) {
            return next(err);
        }
        return res.send({
            'status': 'ok'
        });
    });
}

function getPrepositions (req, res, next) {
    var params = {};
    prepositionsModel.getPrepositions(params, function (err, result) {
        if (err) {
            return next(err);
        }
        return res.send({
            'status': 'ok',
            'rows': result
        });
    });
}

function getPronouns (req, res, next) {
    var params = {};
    pronounsModel.getPronouns(params, function (err, result) {
        if (err) {
            return next(err);
        }
        return res.send({
            'status': 'ok',
            'rows': result
        });
    });
}

function getConjunctions (req, res, next) {
    var params = {};
    conjunctionsModel.getConjunctions(params, function (err, result) {
        if (err) {
            return next(err);
        }
        return res.send({
            'status': 'ok',
            'rows': result
        });
    });
}

function addRule (req, res, next) {
    var params = {
        title: req.body.title,
        sequence: req.body.sequence
    };
    rulesModel.addRule(params, function (err, result) {
        if (err) {
            return next(err);
        }
        return res.send({
            'status': 'ok'
        });
    });
}

function getRules (req, res, next) {
    var params = {};
    rulesModel.getRules(params, function (err, result) {
        if (err) {
            return next(err);
        }
        return res.send({
            'status': 'ok',
            'rows': result
        });
    });
}

function removeRule (req, res, next) {
    var params = {
        id: parseInt(req.params.id)
    };
    rulesModel.removeRule(params, function (err, result) {
        if (err) {
            return next(err);
        }
        return res.send({
            'status': 'ok'
        });
    });
}

module.exports = {
    getTerminals: getTerminals,
    removeTerminal: removeTerminal,
    addTerminal: addTerminal,
    editTerminal: editTerminal,
    getPrepositions: getPrepositions,
    getPronouns: getPronouns,
    getConjunctions: getConjunctions,
    addRule: addRule,
    getRules: getRules,
    removeRule: removeRule
};