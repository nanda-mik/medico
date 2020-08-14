const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const monitorDataSchema = new Schema({
    patientId: {
        type: Schema.Types.ObjectId,
        ref: "patient"
    },
    bloodpressure: {
        type: Array
    },
    diabetes: {
        type:Array
    },
    covid:{
        type: Array
    },
    calories:{
        type: Array
    },
    pulse:{
        type: Array
    }
},{timestamps: true});

module.exports = mongoose.model('monitor', monitorDataSchema);