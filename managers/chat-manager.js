'use strict';

const apiAi = require('../services/apiai-service');

const logger = require('../utils/logger/logger')(__filename);

module.exports = (app, io) => {
    io.on('connection', (socket) => {
        logger.info(`User connected with user id:${socket.userId}`);

        socket.on('disconnect', () => {
            logger.info(`User disconnected with user id:${socket.userId}`);
        });
        socket.on('message', (msg) => {
            logger.debug(`User message: ${msg}`);
            if (!msg || msg.trim().lenght < 1) return;
            apiAi.handleTextRequest(msg, '12345')
                .then(response => {
                    if (response && response.result && response.result.fulfillment && response.result.fulfillment.speech) {
                        io.emit('message', response.result.fulfillment.speech);
                    }
                });
        });
    });
};