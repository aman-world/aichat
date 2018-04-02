var express = require('express');
var router = express.Router();

require('../controllers/me-controller')(router);
require('../controllers/chat-controller')(router);

module.exports = router;
