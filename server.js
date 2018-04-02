

'use strict';

// Infrastructure
const config = require('./config');

// Webserver
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const logger = require('./utils/logger/logger')(__filename);
const api = require('./routes');

class ChatManager {
    constructor(options) {
        options = options || {};
        this.host = options.host || config.webserver.host;
        this.port = options.port || config.webserver.port;
        this.dbName = options.dbName || config.database.name;
    }

    apiRouter() {
        return api;
    }

    errorHandler() {
        return (err, req, res, next) => {
            const status = (err && err.status) ? err.status : 500;
            const errorMessage = (err && err.message) ? err.message : 'Internal Server Error';
            res.status(status).send({
                error: err,
                message: errorMessage
            });
        };
    }

    notFound() {
        return (req, res, next) => {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        };
    }

    setupWebserver() {
        this.app = express();
        this.app.use(bodyParser.urlencoded({
            extended: false
        }));
        this.app.use(bodyParser.json());
        // this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use('/api', this.apiRouter());
        this.app.use(this.notFound());
        this.app.use(this.errorHandler());
    }

    setupDatabase() {
        mongoose.Promise = global.Promise;
        const dbUrl = `mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${this.dbName}`;
        mongoose.connect(dbUrl)
            .catch(err => {
                logger.fatal(`Failed to connect to ${this.dbName} database with error: ${err}`);
                process.exit(-1);
            });
    }

    run() {
        this.setupDatabase();
        this.setupWebserver();
        this.app.listen(this.port, this.host, () => {
            logger.info(`${this.constructor.name} is now listening on ${this.host}:${this.port}`);
        });
    }
}

module.exports = ChatManager;
// If called directly we start the server
if (require.main === module) {
    const server = new ChatManager();
    server.run();
}
