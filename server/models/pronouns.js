var ActiveRecord = require('../utils/active_record');
var AR = new ActiveRecord();

function getPronouns (params, done) {
    var queryParams = [];

    var query = [
        'select * from pronouns order by title'
    ].join('');

    AR.execute(query, queryParams, done);
}

module.exports = {
    getPronouns: getPronouns
};