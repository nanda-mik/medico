const Patient = require('../models/patientAuth');
const Doctor = require('../models/doctorAuth');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.docSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const doctor = new Doctor({
        email: email,
        password: hashedPw,
        name: name,
      });
      return doctor.save();
    })
    .then((result) => {
      res.status(201).json({ message: 'doctor created!', userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.patientSignup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  bcrypt
    .hash(password, 12)
    .then((hashedPw) => {
      const patient = new Patient({
        email: email,
        password: hashedPw,
        name: name,
      });
      return patient.save();
    })
    .then((result) => {
      res.status(201).json({ message: 'patient created!', userId: result._id });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.docLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  let loadedUser;
  try {
    let user = await Doctor.findOne({ email: email });
    if (!user) {
      const error = new Error('A user with this email not found');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    let isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      'secretblogsecret',
      { expiresIn: '1h' }
    );
    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
      loadedUser: loadedUser,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};

exports.patientLogin = async (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email, password);
  let loadedUser;
  try {
    let user = await Patient.findOne({ email: email });
    if (!user) {
      const error = new Error('A user with this email not found');
      error.statusCode = 401;
      throw error;
    }
    loadedUser = user;
    let isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) {
      const error = new Error('Wrong password');
      error.statusCode = 401;
      throw error;
    }
    const token = jwt.sign(
      {
        email: loadedUser.email,
        userId: loadedUser._id.toString(),
      },
      'secretblogsecret',
      { expiresIn: '1h' }
    );
    res.status(200).json({
      token: token,
      userId: loadedUser._id.toString(),
      loadedUser: loadedUser,
      expiresIn: 60 * 60 * 1000,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
