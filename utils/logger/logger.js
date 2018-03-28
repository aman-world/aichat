
const config = require('../../config');

const log4js = require('log4js');
const path = require('path');
const logger = log4js.getLogger();
logger.level = config.logging.level;

module.exports = (fileName) => {
    return log4js.getLogger(`[${path.basename(fileName, '.js')}]`);
};

// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');