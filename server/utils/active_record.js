var mysql = require('mysql');
var config = require('./../../config');

function ActiveRecord() {

    if (ActiveRecord.prototype.instance)
        return ActiveRecord.prototype.instance;

    ActiveRecord.prototype.instance = this;

    this.pool = mysql.createPool({
        host : config.db.host,
        port : config.db.port,
        user : config.db.user,
        password: config.db.password,
        database: config.db.dbname,
        charset: config.db.charset,
        acquireTimeout: 20000,
    });
    this.count = config.db.connectionRetryCount;
    this.delay = config.db.delayBeforeReconnect;
}

ActiveRecord.prototype.query = function (sql_query, value, callback) {
    var self = this;
    var count = self.count;
    var delay = self.delay;
    var tryConnect  = function () {
        var connection = self.pool.getConnection(function (err, connection) {
            if (!err) {
                connection.query('SET NAMES utf8');
                connection.query(sql_query, value, function (error, rows, fields) {
                    if (error) {
                        console.log(mysql.format(sql_query, value), error);
                    }
                    connection.release();
                    if (callback)
                        callback.apply(self, arguments);
                });

            } else {
                //handle connection error
                console.log('info', 'Couldn\'t establish connection to MySql. Trying again...' + count--);
                if (count > 0)
                    setTimeout(tryConnect, delay);
                else if (callback)
                    callback(err);
            }
        });
    };
    tryConnect();
};

ActiveRecord.prototype.insert = function (table, value, callback) {
    var sql_query = "INSERT INTO " + table + " SET ? ";
    this.query(sql_query, value, callback);
};

ActiveRecord.prototype.execute = function (query, prms, callback) {
    this.query(query, prms, callback);
};

ActiveRecord.prototype.getObject = function (query, prms, callback) {
    this.query(query, prms, function (error, rows) {
        if (error)
            callback(error);
        else if (rows.length)
            callback(null, rows[0]);
        else
            callback(null, null);
    });
};

ActiveRecord.prototype.appendLikeParameter = function (name, value, query, delimiter, prms, type) {
    if (value) {
        query = query + ' ' + delimiter + ' ' + name + ' like ? ';
        if (!type)
            prms.push('%' + value + '%');
        else if (type === 'start')
            prms.push(value + '%');
        else if (type === 'end')
            prms.push('%' + value);
        else if (type === 'strict')
            prms.push(value);
    }
    return query;
};

ActiveRecord.prototype.appendBetweenParameter = function (name, value, query, prms) {
    if (value) {
        query = query + ' ' + (prms.length == 0 ? '' : 'AND') + ' ' + name + ' BETWEEN ? AND ? ';
        prms.push.apply(prms, value);
    }
    return query;
};

ActiveRecord.prototype.appendEqualParameter = function (name, value, query, delimiter, prms) {
    if (value) {
        query = query + ' ' + delimiter + ' ' + name + ' = ? ';
        prms.push(value);
    }
    return query;
};

ActiveRecord.prototype.getLimit = function (opts) {
    if (opts && opts.max) {
        var max = parseInt(opts.max);
        if (opts.index) {
            var index = parseInt(opts.index);
            return ' LIMIT ' + (max * index).toString() + ', ' + max.toString();
        }
        return ' LIMIT 0, ' + max.toString();
    }

    return '';
};

module.exports = ActiveRecord;





