var ActiveRecord = require('../utils/active_record');
var AR = new ActiveRecord();

function getTerminals (params, done) {
    var queryParams = [];

    var query = [
        'select terminals.id, terminals.rus_spelling, terminals.eng_spelling,',
        ' parts_of_speech.name as part_of_speech from terminals', 
        ' join parts_of_speech on (terminals.part_of_speech = parts_of_speech.id)',
        (params.query ? 'WHERE terminals.eng_spelling LIKE "%' + params.query + '%"' : ''),
        ' order by terminals.id;'
    ].join('');

    AR.execute(query, queryParams, done);
}

function removeTerminal (params, done) {
    var queryParams = [
        params.id
    ];

    var query = [
        'delete from terminals where id = ?'
    ].join('');

    AR.execute(query, queryParams, done);
}

function addTerminal (params, done) {
    var queryParams = [
        params.rusSpelling,
        params.engSpelling,
        params.partOfSpeech
    ];
    
    var query = [
        'insert into terminals(rus_spelling, eng_spelling, part_of_speech)',
        ' values (?, ?, ?)'
    ].join('');
    
    AR.execute(query, queryParams, done);
}

function editTerminal (params, done) {
    var queryParams = [
        params.rusSpelling,
        params.engSpelling,
        params.partOfSpeech,
        params.id
    ];
    
    var query = [
        'update terminals set',
            ' rus_spelling = ?,',
            ' eng_spelling = ?,',
            ' part_of_speech = ?',
        ' where id = ?'    
    ].join('');
    
    AR.execute(query, queryParams, done);
}

function getTerminalsByPartOfSpeech (params, done) {
    var queryParams = [params.partOfSpeech];

    var query = [
        'SELECT * FROM terminals where part_of_speech = ?;'
    ].join('');

    AR.execute(query, queryParams, done);
}

module.exports = {
    getTerminals: getTerminals,
    removeTerminal: removeTerminal,
    addTerminal: addTerminal,
    editTerminal: editTerminal,
    getTerminalsByPartOfSpeech: getTerminalsByPartOfSpeech
};