const Patient = require('../models/patientAuth');
const Doctor = require('../models/doctorAuth');
const Relation = require('../models/relation');
const Prescription = require('../models/prescription');
const Monitor = require('../models/monitorData');
const nodemailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const Appointment = require('../models/appointments');


const transporter = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:process.env.api_key
      }
    })
  );


exports.getDoctors = async (req, res, next) => {
    const id = req.userId;
    try {
        var patient = await Patient.findById(id);
        var docInRel = await Relation.find({ patientId: id });
        var doctors = await Doctor.find();
        var reqDoc = patient.request;
        console.log(reqDoc);
        var relDoc = docInRel.map(el => el.doctorId.toString());
        console.log(relDoc);
        var fdoc = reqDoc.concat(relDoc);
        var filterDoc = doctors.filter(el => !fdoc.includes(el._id.toString()));
        console.log(filterDoc);
        res.status(200).json({ message: "success", users: filterDoc });
    } catch (err) {
        next(err);
    }
}

exports.saveProfile = async (req, res, next) => {
    const id = req.userId;
    const { location, gender, age, contact, weight, height, aboutMe, disease, medicines } = req.body;
    console.log(disease);
    console.log(medicines);
    try {
        const patient = await Patient.findById(id);
        patient.city = location.city;
        patient.state = location.state;
        patient.zip = parseInt(location.zip);
        patient.gender = gender;
        patient.age = parseInt(age);
        patient.contact1 = parseInt(contact.contact1);
        patient.contact2 = parseInt(contact.contact2);
        patient.weight = parseInt(weight);
        patient.height = parseInt(height);
        patient.disease = disease;
        patient.medicines = medicines;
        patient.aboutMe = aboutMe;
        var result = await patient.save();
        console.log(result);
        res.status(200).json({ message: "success", profile: result });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.getProfile = async (req, res, next) => {
    const id = req.userId;
    try {
        const profile = await Patient.findById(id);
        console.log(profile);
        var data = await Monitor.findOne({ patientId: id });
        console.log(data);
        res.status(200).json({ message: "success", profile: profile, monitorData: data });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.sendRequest = async (req, res, next) => {
    const docId = req.params.doctorId;
    const patientId = req.userId;
    console.log(docId);
    try {
        const doctor = await Doctor.findById(docId);
        const patient = await Patient.findById(patientId);
        patient.request.push(docId);
        await patient.save();
        doctor.invitation.push(patientId);
        await doctor.save();
        res.status(200).json({ message: "success" });
        console.log("email starting");
        const email = patient.email;
        const name = patient.name;
        const disease = patient.disease;
        const about = patient.aboutMe;
        transporter.sendMail({
            to: doctor.email,
            from: 'b518045@iiit-bh.ac.in',
            subject: 'New appointment request',
            html: `
                <h3>New appointment request from ${email}</h3>
                <p>Name: ${name}</p>
                <p>Disease: ${disease}</p>
                <p>About: ${about}</p>
                <p><a href="http://localhost:3000">Confirm Appointment</a></p>
            `
        });
        console.log("email sent");
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.getAppointedDoctors = async (req, res, next) => {
    const id = req.userId;
    try {
        var arr = [];
        const result = await Relation.find({ patientId: id });
        for (let i = 0; i < result.length; i++) {
            const docId = result[i].doctorId;
            const data = await Doctor.findById(docId);
            arr.push(data);
        }
        console.log("doctors", '\n');
        console.log(arr);
        res.status(200).json({ message: "success", arr: arr });
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.getPrescription = async (req, res, next) => {
    const id = req.userId;
    const docId = req.params.doctorId;
    try {
        const result = await Relation.findOne({ doctorId: docId, patientId: id });
        const relationId = result._id;
        const resData = await Prescription.findOne({ relationId: relationId });
        var prescArr = [];
        var problemArr = [];
        var event = [];
        const eventData = await Appointment.find({patientId: id,doctorId: docId});
        if(eventData){
            event = eventData;
            console.log(event);
        }
        if (resData) {
            prescArr = resData.data;
            problemArr = resData.problem;
            console.log(prescArr,'\n',problemArr);
            res.status(200).json({ message: "success", prescArr: prescArr, problemArr: problemArr, event: event });
        } else {
            res.status(200).json({ message: "success", prescArr: prescArr, problemArr:problemArr, event: event });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.sendProblem = async (req, res, next) => {
    const id = req.userId;
    const docId = req.params.doctorId;
    try{
        const result = await Relation.findOne({doctorId: docId, patientId: id});
        const relationId = result._id;
        const problem = req.body.problem;
        const time = req.body.time;
        const presc = await Prescription.findOne({relationId: relationId});
        if(presc){
            presc.problem.push({
                problemData: problem,
                time: time
            });
            const resu = await presc.save();
            console.log(resu);
        }else{
            const prescription = new Prescription({
                relationId: relationId,
                problem: {
                    problemData: problem,
                    time: time
                }
            });
            const resu = await prescription.save();
            console.log(resu);
        }
        const arr = await Prescription.findOne({relationId: relationId});
        res.status(200).json({message: "success", arr: arr});
    }catch(err){

    }
}

exports.saveMonitorData = async (req, res, next) => {
    const { bloodpressure, diabetes, covid, calories, pulse } = req.body;
    const id = req.userId;
    try {
        const resu = await Monitor.findOne({ patientId: id });
        if (resu) {
            resu.patientId = id;
            resu.bloodpressure = bloodpressure;
            resu.diabetes = diabetes;
            resu.covid = covid;
            resu.calories = calories;
            resu.pulse = pulse;
            const result = await resu.save();
            console.log(result); res.status(200).json({ message: "success", arr: result });
        } else {
            const data = new Monitor({
                bloodpressure: bloodpressure,
                diabetes: diabetes,
                covid: covid,
                calories: calories,
                pulse: pulse,
                patientId: id
            });
            const result = await data.save();
            console.log(result);
            res.status(200).json({ message: "success", arr: result });
        }
    } catch (err) {
        console.log(err);
        next(err);
    }
}

exports.sendVideoRequest = async (req, res, next) => {
    const docId = req.params.doctorId;
    const patientId = req.userId;
    try{
        const doctor = await Doctor.findById(docId);
        const d = new Date();
        const obj = {
            patientId: patientId,
            date: d.toDateString()
        };
        doctor.appointment.push(obj);
        await doctor.save();
        console.log("sent");
        res.status(200).json({ message: "success" });
    }catch(err){
        console.log(err);
        next(err);
    }
}