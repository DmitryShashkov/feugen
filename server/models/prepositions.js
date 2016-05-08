var ActiveRecord = require('../utils/active_record');
var AR = new ActiveRecord();

function getPrepositions (params, done) {
    var queryParams = [];

    var query = [
        'select * from prepositions order by title'
    ].join('');

    AR.execute(query, queryParams, done);
}

module.exports = {
    getPrepositions: getPrepositions
};