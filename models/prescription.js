const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const prescribeSchema = new Schema({
    relationId:{
        type:Schema.Types.ObjectId,
        ref: 'relation'
    },
    data:[{
            presData: String,
            time: String
        }]
});

module.exports = mongoose.model('prescribe', prescribeSchema);