const express = require('express');
const router = express.Router();

const dietController = require('../controller/dietController');
const isAuth = require('../middleware/is-auth');

router.get('/:state',isAuth, dietController.getData);

module.exports = router;