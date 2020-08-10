const express = require('express');
const router = express.Router();
const { body } = require('express-validator/check');
const Patient = require('../models/patientAuth');
const Doctor = require('../models/doctorAuth');

const authController = require('../controller/authController');

router.put('/docSignup',[
    body('email').isEmail().withMessage('please enter a valid email')
    .custom((value, {req})=>{
        return Doctor.findOne({email: value})
            .then(userDoc => {
                if(userDoc){
                    return Promise.reject('Email already exist');
                }
            });
    }).normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 5}),
    body('name')
        .trim()
        .not()
        .isEmpty()
], authController.docSignup);

router.put('/patientSignup',[
    body('email').isEmail().withMessage('please enter a valid email')
    .custom((value, {req})=>{
        return Patient.findOne({email: value})
            .then(userDoc => {
                if(userDoc){
                    return Promise.reject('Email already exist');
                }
            });
    }).normalizeEmail(),
    body('password')
        .trim()
        .isLength({min: 5}),
    body('name')
        .trim()
        .not()
        .isEmpty()
], authController.patientSignup);

router.post('/docLogin',authController.docLogin);

router.post('/patientLogin',authController.patientLogin);

module.exports = router;