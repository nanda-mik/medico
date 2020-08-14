const express = require('express');
const router = express.Router();

const dietController = require('../controller/dietController');

router.route('/:state').get(dietController.getData);

module.exports = router;
