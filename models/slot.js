/**
 * Location model for storing slots in db.
 */
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const slotSchema = new schema({
    title:{type:String,required:true},
    park: {type: mongoose.Schema.Types.ObjectId, ref: 'Park', required: true},
    lastReservedBy:{type: mongoose.Schema.Types.ObjectId, ref: 'User', required:false},
    isReserved:{type:Boolean,required:true},
    issReservePending: {type:Boolean,required:true},
});

const Slot = module.exports = mongoose.model("Slot",slotSchema);

module.exports.findByTitle = function (title,callback) {
    const query = {title:title};
    Slot.findOne(query,callback);
};