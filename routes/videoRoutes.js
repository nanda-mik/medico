const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/is-auth');
const videoController = require('../controller/videoController');

router.post("/token",isAuth, videoController.postVideo);

module.exports = router;