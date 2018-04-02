/**
 * @file Configuration file.
 */
'use strict';

module.exports = {
    logging: {
        level: process.env.CM_LOG_LEVEL || 'debug',
    },
    webserver: {
        host: process.env.CM_INTERNAL_IP || '0.0.0.0',
        port: process.env.CM_INTERNAL_PORT || 3000
    },
    database: {
        username: process.env.CM_DB_USERNAME,
        password: process.env.CM_DB_PASSWORD,
        host: process.env.CM_DB_HOST || 'localhost',
        port: process.env.CM_DB_PORT || '27017',
        name: process.env.CM_DB_NAME || 'chat-manager'
    },
    apiai: {
        secret: process.env.CM_API_AI_KEY
    }
};
