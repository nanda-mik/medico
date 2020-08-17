const Doctor = require('../models/doctorAuth');
const Patient = require('../models/patientAuth');
const Relation = require('../models/relation');
const Prescription = require('../models/prescription');
const Monitor = require('../models/monitorData');
const Appointment = require('../models/appointments');
const Subscription = require('../models/subscribers');
const webpush = require('web-push');

webpush.setVapidDetails(process.env.WEB_PUSH_CONTACT, process.env.PUBLIC_VAPID_KEY, process.env.PRIVATE_VAPID_KEY);

exports.getProfile = async(req, res, next) => {
    const id = req.userId;
    try{
        const profile = await Doctor.findById(id);
        console.log(profile);
        var arr =[];
        const result = await Relation.find({doctorId: id});
        for(let i=0;i<result.length;i++){
            const patId = result[i].patientId;
            const data = await Patient.findById(patId);
            const monData = await Monitor.findOne({patientId: patId});
            const patientData = {};
            patientData.profile = data;
            patientData.monitor = monData;
            arr.push(patientData);
        }
        console.log(arr);
        res.status(200).json({message: "success", profile: profile, patient: arr, });
    }catch(err) {
        console.log(err);
        next(err);
    }
}

exports.saveProfile = async(req,res,next) => {
    const id = req.userId;
    const { location, gender, age, contact, qualification, yearOfExp, aboutMe} = req.body;
    console.log(req.body);
    try{
        const doctor = await Doctor.findById(id);
        doctor.city = location.city;
        doctor.state = location.state;
        doctor.zip = parseInt(location.zip);
        doctor.gender = gender;
        doctor.age = parseInt(age);
        doctor.contact1 = parseInt(contact.contact1);
        doctor.contact2 = parseInt(contact.contact2);
        doctor.university = qualification.university;
        doctor.specialization = qualification.specialization;
        doctor.honors = qualification.honors;
        doctor.yearOfExp = parseInt(yearOfExp);
        doctor.aboutMe = aboutMe;
        var result = await doctor.save();
        console.log(result);
        res.status(200).json({message: "success", profile: result});
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.checkInvitaion = async (req, res, next) => {
    const id = req.userId;
    try{
        const doctor = await Doctor.findById(id);
        let inviteArr = doctor.invitation;
        console.log(inviteArr);
        var arr = [];
        for(let i=0;i<inviteArr.length;i++){
            const patient  = await Patient.findById(inviteArr[i]);
            arr.push(patient);
        }
        console.log(arr);
        res.status(200).json({message: "success", arr: arr});
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.confirmInvitation = async(req, res, next) => {
    const id = req.userId;
    const patId = req.params.patientId;
    try{
        const relation = new Relation({
            patientId: patId,
            doctorId: id
        });
        const result = await relation.save();
        console.log(result);
        const doctor = await Doctor.findById(id);
        doctor.invitation.pop();
        await doctor.save();
        const profileData = await Patient.findById(patId);
        const monitorData = await Monitor.findOne({patientId: patId});
        res.status(200).json({ message: "success", profile: profileData, monitor: monitorData })
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.getPatients = async(req, res, next) => {
    const id = req.userId;
    try{
        var arr =[];
        const result = await Relation.find({doctorId: id});
        for(let i=0;i<result.length;i++){
            const patId = result[i].patientId;
            const data = await Patient.findById(patId);
            arr.push(data);
        }
        console.log(arr);
        res.status(200).json({message: "success", arr: arr});
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.getPrescription = async(req, res, next) => {
    const id = req.userId;
    const patId = req.params.patientId;
    try{
        const result = await Relation.findOne({doctorId: id, patientId: patId});
        const relationId = result._id;
        const resData = await Prescription.findOne({relationId: relationId});
        var prescArr = [];
        var problemArr = [];
        if(resData){
            prescArr = resData.data;
            problemArr = resData.problem;
            console.log(prescArr,'\n',problemArr);
            res.status(200).json({message: "success", prescArr: prescArr, problemArr: problemArr});
        }else{
            res.status(200).json({message: "success", prescArr: prescArr, problemArr: problemArr});
        }
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.addPrescription = async(req, res, next) => {
    const id = req.userId;
    const patId = req.params.patientId;
    try{
        const result = await Relation.findOne({doctorId: id, patientId: patId});
        const relationId = result._id;
        const prescribed = req.body.presData;
        const time = req.body.time;
        const presc = await Prescription.findOne({relationId: relationId});
        if(presc){
            presc.data.push({
                presData: prescribed,
                time: time
            });
            const resu = await presc.save(); 
            console.log(resu);
        }else{
            const prescription = new Prescription({
                relationId: relationId,
                data: {
                    presData: prescribed,
                    time: time
                }
            });
            const resu = await prescription.save();
            console.log(resu);
        }
        const subscriptions = await Subscription.find();
        subscriptions.forEach(async sub => {
            var pushConfig = {
                endpoint: sub.endpoint,
                keys:{
                    auth: sub.keys.auth,
                    p256dh: sub.keys.p256dh
                }
            };
            const resu = await webpush.sendNotification(pushConfig,JSON.stringify({title:"Notified",body:"New prescription added"}));
            console.log(resu);
        })
        const arr = await Prescription.find();
        res.status(200).json({message: "success", arr: arr});
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.checkRequest = async(req, res, next) => {
    const id = req.userId;
    try{
        const doctor = await Doctor.findById(id);
        let appointArr = doctor.appointment;
        console.log(appointArr);
        var arr = [];
        for(let i=0;i<appointArr.length;i++){
            const patient  = await Patient.findById(appointArr[i].patientId);
            const obj = {
                patient:patient,
                date: appointArr[i].date
            }
            arr.push(obj);
        }
        console.log(arr);
        res.status(200).json({message: "success", arr: arr});
    }catch(err){
        console.log(err);
        next(err);
    }
}

exports.saveAppointments = async(req, res, next) => {
    const id = req.userId;
    const patientId = req.params.patientId;
    try{
        const body = req.body;
        const appointment = new Appointment({
            event: body,
            patientId: patientId,
            doctorId: id
        });
        await appointment.save();
        const doctor = await Doctor.findById(id);
        doctor.appointment.pop();
        await doctor.save();
        res.status(201).json({message: 'success'});
    }catch(err){
        console.log(err);
        next(err);
    }
}