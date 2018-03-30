const apiai = require('apiai');
const uuid = require('uuid-v4');

const config = require('../config.js');
const logger = require('../utils/logger/logger')(__filename);
const app = apiai(config.apiai.secret);

/**
 * Function to handle text request
 * @param {string} textMessage Text message
 * @param {string} sessionId User session id
 * @returns {Promise}
 */
const handleTextRequest = (textMessage, sessionId) => {
    const METHOD_NAME = `[handleTextRequest] -`;
    return new Promise((resolve, reject) => {
        const options = {
            sessionId: sessionId || uuid()
        };
        const request = app.textRequest(textMessage, options);
        request.on('response', (response) => {
            logger.debug(`${METHOD_NAME} Response: ${JSON.stringify(response)}`);
            resolve(response);
        });

        request.on('error', (error) => {
            logger.error(`${METHOD_NAME} ${error}`);
            reject(error);
        });
        request.end();
    });
};

module.exports.handleTextRequest = handleTextRequest;
