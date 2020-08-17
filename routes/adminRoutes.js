const express = require('express');
const router = express.Router();

const adminController = require('../controller/adminController');

router.get("/data",adminController.getAllData);

module.exports = router;