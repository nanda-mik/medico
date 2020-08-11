const config = require('../config');
const { videoToken } = require('../token');

const sendTokenResponse = (token, res) => {
    res.status(200).send({ token: token.toJwt() });
};

exports.postVideo = (req, res, next) => {
    const identity = req.body.identity;
    const room = req.body.room;
    const token = videoToken(identity, room, config);
    sendTokenResponse(token, res);
};