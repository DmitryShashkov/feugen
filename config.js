var defaults = {
    server: {
        port: 3000,
        host: 'localhost'
    },
    db: {
        host: 'localhost',
        port: 3306,
        dbname: 'feugen',
        user: 'root',
        password: 'root',
        charset: 'utf8',
        connectionRetryCount: 5,
        delayBeforeReconnect: 3000,
        showErrors: true
    },
    staticDir: 'frontend'
};

module.exports = defaults;
