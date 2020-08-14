const data = require('../assets/data/data.json');

exports.getData = (req, res, next) => {
  const state = req.params.state.toLowerCase();
  const diet = data[state];
  res.status(200).json({
    message: 'success',
    diet,
  });
};
