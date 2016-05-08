var fs = require('fs');
var path = require('path');

var words = fs.readFileSync(path.join(__dirname, '/adverbs.txt'), 'utf8').split('\r\n');
var insertValues = [];

//words.forEach(function (word) {
//    insertValues.push('("' + word + '")');
//});
words.forEach(function (word) {
    if (word.length > 1) {
        //var values = word.split('.')[1].replace(/ /g,'').split('-');
        //var values = word.replace(/  /g,' ').replace(/\t/g,' ').toLowerCase().split(' ');
        var values = word.replace(/ — /g,'—').split('—');
        insertValues.push('("' + values[0] + '", "' + values[1] + '", 3)');
    }
});

//var query = 'truncate table pronouns; insert into pronouns (title) values ' + insertValues.join(', ') + ';';
var query = 'insert into terminals (eng_spelling, rus_spelling, part_of_speech) values ' + insertValues.join(', ') + ';';

fs.writeFileSync(path.join(__dirname, '/query.txt'), query);