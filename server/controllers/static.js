var fs = require('fs');
var config = require('../../config');

module.exports = {
    index: function (req, res, next) {
        fs.createReadStream(__dirname + "/../../" + config.staticDir + "/index.html")
            .pipe(res);
    }
};