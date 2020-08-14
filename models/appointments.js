const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const appointmentSchema = new Schema({
    event:{
        type: Object
    },
    patientId:{
        type: Schema.Types.ObjectId,
        ref: 'patient'
    },
    doctorId:{
        type: Schema.Types.ObjectId,
        ref: 'doctor'
    }
},{timestamps: true});

module.exports = mongoose.model('appointments', appointmentSchema);