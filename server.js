

'use strict';

// Infrastructure
const config = require('./config');

// Webserver
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const path = require('path');

const api = require('./routes');

class ChatManager {
    constructor(options) {
        options = options || {};
        this.host = options.host || config.webserver.host;
        this.port = options.port || config.webserver.port;
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
        this.app.use(express.static(path.join(__dirname, 'public')));
        this.app.use('/api', this.apiRouter());
        this.app.use(this.notFound());
        this.app.use(this.errorHandler());
    }

    setup() {
        this.setupWebserver();
    }

    run() {
        this.setup();
        const promise = new Promise((resolve, reject) => {
            this.server = http.createServer(this.app);
            this.server.listen(this.port, this.host);

            this.server.on('close', () => {
                console.log(`${this.constructor.name} is shutting down...`);
            });

            this.server.on('listening', () => {
                const port = this.server.address().port;
                const address = this.server.address().address;
                console.log(`${this.constructor.name} is now listening on ${address}:${port}`);
                resolve();
            });
        });
        return promise;
    }

    stop() {
        this.server.close();
    }
}

module.exports = ChatManager;
// If called directly we start the server
if (require.main === module) {
    const server = new ChatManager();
    server.run();
}
