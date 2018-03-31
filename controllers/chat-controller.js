'use strict';

const apiAi = require('../services/apiai-service');
const appConst = require('../utils/app-constants');

const logger = require('../utils/logger/logger')(__filename);

module.exports = (app) => {
    app.post('/v0/text', (req, res) => {
        const textMessage = req.body.text;
        if (!textMessage || textMessage.trim().length < 1) {
            return res.status(400).send({ error: appConst.EMPTY_TEXT_FIELD });
        }
        return apiAi.handleTextRequest(textMessage, '12345')
            .then(response => {
                res.send(response);
            })
            .catch(err => {
                res.status(500).send();
            });
    });

};
