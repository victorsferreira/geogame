const config = require('./config');
const libs = require('./libs');
libs.load();

const server = require('./api/server');

const { database, redis, Logger, mysql } = global.__LIBS;

const logger = new Logger('Application');

process.on('uncaughtException', function (err) {
    logger.error(`Uncaught Exception!`, err);
    console.log(err)
});

server.setup();
server.connect()
    // .then((app) => {
    //     return redis.connect();
    // })
    .then(() =>{
        return mysql.connect();
    });