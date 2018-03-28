/**
 * @file Configuration file.
 */
'use strict';

module.exports = {
    logging: {
        level: process.env.CM_LOG_LEVEL || 'info',
    },
    webserver: {
        host: process.env.CM_INTERNAL_IP || '0.0.0.0',
        port: process.env.CM_INTERNAL_PORT || 3000,
        canoncialDns: 'https://' + process.env.CM_CANONICAL_DNS + '/' || 'http://localhost:3000/',
    }
};
