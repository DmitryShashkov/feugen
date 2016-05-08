var ActiveRecord = require('../utils/active_record');
var AR = new ActiveRecord();

function getConjunctions (params, done) {
    var queryParams = [];

    var query = [
        'select * from conjunctions order by title'
    ].join('');

    AR.execute(query, queryParams, done);
}

module.exports = {
    getConjunctions: getConjunctions
};