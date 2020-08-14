const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const doctorSchema = new Schema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    state:{
        type: String
    },
    city:{
        type: String
    },
    zip:{
        type: Number
    },
    gender:{
        type: String
    },
    age:{
        type: Number
    },
    contact1:{
        type: Number
    },
    contact2:{
        type: Number
    },
    university: {
        type: String
    },
    specialization: {
        type: String
    },
    honors: {
        type: String
    },
    ratings:{
        type: Number
    },
    yearOfExp: {
        type: Number
    },
    aboutMe: {
        type: String
    },
    invitation: {
        type: Array
    },
    appointment:{
        type: Array
    }
}, {timestamps: true});

module.exports = mongoose.model('doctor', doctorSchema);