/**
 * @file To reset database.
 */

'use strict';

const mongoose = require('mongoose');

const models = require('../models');
const config = require('../config.js');
const userStubs = require('../utils/data/db/users.json');

const logger = require('../utils/logger/logger')(__filename);

/**
 * Function to remove all data from a collection and insert given stubs.
 * @param {object} model Model object to a collection
 * @param {object[]} stubs Array of objects to insert in the given collection
 * @returns {Promise}
 */
const resetCollection = (model, stubs) => {
    return model.remove({})
        .then(() => {
            return model.insertMany(stubs);
        });
};

/**
 * Function to remove all data from db and and insert pre-defined data.
 * @returns {Promise}
 */
const resetDB = () => {
    mongoose.Promise = global.Promise;
    const dbUrl = `mongodb://${config.database.username}:${config.database.password}@${config.database.host}:${config.database.port}/${config.database.name}`;
    return mongoose.connect(dbUrl)
        .then(() => {
            logger.info('Reset DB started ... ');
            return Promise.all(
                [
                    resetCollection(models.User, userStubs)
                ]);
        })
        .then(() => {
            logger.info('Reset DB succeeded. ');
            mongoose.connection.close();
            return Promise.resolve();
        })
        .catch((err) => {
            mongoose.connection.close();
            logger.error(`Error in reset db: ${err}`);
            return Promise.reject(err);
        });
};

resetDB();

module.exports.resetDB = resetDB;
