const express = require('express');
const router = express.Router();

const isAuth = require('../middleware/is-auth');
const doctorController = require('../controller/doctorController');

router.get('/getProfile', isAuth, doctorController.getProfile);

router.post("/saveProfile", isAuth, doctorController.saveProfile);

router.get("/checkInvitation", isAuth, doctorController.checkInvitaion);

router.get("/confirmInvitation/:patientId", isAuth, doctorController.confirmInvitation);

router.get("/getPatients", isAuth, doctorController.getPatients);

router.get("/getPrescription/:patientId", isAuth, doctorController.getPrescription);

router.post("/addPrescription/:patientId", isAuth, doctorController.addPrescription);

module.exports = router;