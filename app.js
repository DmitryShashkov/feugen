var config = require('./config');

var app = require('./server/api');

app.listen(config.server.port, function () {
    console.log('Web server successfully started at port ' + config.server.port);
});