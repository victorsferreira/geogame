const mysql = require('mysql');
const Logger = require('./logger');

const config = __CONFIG;

class MySQL {
    constructor() {
        this.logger = new Logger('Database');
        this.config = config.mysql;
        this.connection = null;
    }

    connect() {
        return new Promise((resolve, reject) => {
            this.connection = mysql.createConnection(this.config);

            this.connection.connect(function (err) {
                if (err) reject(err);
                else {
                    console.log('Connection with MySQL successfully established');
                    resolve(true);
                }
            });
        });
    }

    query(sql) {
        return new Promise((resolve, reject) => {
            this.connection.query(sql, function (err, result) {
                if (err) reject(err);
                else resolve(result);
            });
        });
    }
}

module.exports = new MySQL();