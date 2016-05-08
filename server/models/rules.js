var ActiveRecord = require('../utils/active_record');
var AR = new ActiveRecord();

function addRule (params, done) {
    var queryParams = [
        params.title
    ];

    var query = [
        'insert into rules(title) values (?)'
    ].join('');

    AR.execute(query, queryParams, function (err, newRule) {
        var insertValues = [];
        query = 'insert into rules_parts(rule_id, node_type, value) values';
        queryParams = [];
        
        params.sequence.forEach(function (node) {
            insertValues.push('(' + newRule.insertId + ', ' + node.type + ', "' + node.value + '")');
        });
        
        AR.execute(query + insertValues.join(', '), queryParams, done);
    });
}

function getRule (params, done) {
    var queryParams = [params.id];

    var query = [
        'select node_type, value from rules_parts',
        ' where rule_id = ? order by id;'
    ].join('');
    
    AR.execute(query, queryParams, done);
}

function getRules (params, done) {
    var queryParams = [];

    var query = [
        'select * from rules'
    ].join('');
    
    AR.execute(query, queryParams, done);
}

function removeRule (params, done) {
    var queryParams = [params.id];

    var query = 'delete from rules_parts where rule_id = ?; ';
    
    AR.execute(query, queryParams, function () {
        query = 'delete from rules where id = ?;';
        AR.execute(query, queryParams, done);
    });
}

module.exports = {
    addRule: addRule,
    getRule: getRule,
    getRules: getRules,
    removeRule: removeRule
};