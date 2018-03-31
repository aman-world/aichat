const dotenv = require('dotenv');
const path = require('path');
const logger = require('../utils/logger/logger')(__filename);

const setEnv = (path) => {
    let result = {};
    if (path) {
        result = dotenv.config({ path: path });
    } else {
        result = dotenv.config();
    }
    if (result.error) {
        logger.error(`Error while setting env: ${result.error}`);
        return;
    }

    logger.info(`Result: ${JSON.stringify(result)}`);
};

// setEnv(path.join(__dirname, '../utils/data/env/.env'));
