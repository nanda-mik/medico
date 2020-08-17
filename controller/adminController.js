const Doctor = require('../models/doctorAuth');
const Patient = require('../models/patientAuth');
const Relation = require('../models/relation');
const Appointment = require('../models/appointments');

exports.getAllData = async(req, res, next) => {
    try{
        const patients = await Patient.find();
        const patArr = patients.map(x => {
            return {
                name: x.name || "",
                age: x.age || "",
                gender: x.gender || "",
                disease: x.disease || ""
            }
        });
        const doctors = await Doctor.find();
        const docArr = doctors.map(x => {
            return {
                name: x.name || "",
                age: x.age || "",
                gender: x.gender || "",
                specialization: x.specialization || ""
            }
        });
        const relation = await Relation.find();
        const underConsult = [];
        for(let i=0;i<relation.length;i++){
            var doctor = await Doctor.findOne(relation[i].doctorId);
            var patient = await Patient.findOne(relation[i].patientId);
            var obj = {
                docName: doctor.name,
                patName: patient.name
            };
            underConsult.push(obj);
        }
        res.status(200).json({patients: patArr, doctors: docArr, underConsult: underConsult});
    }catch(err){
        console.log(err);
        next(err)
    }
}