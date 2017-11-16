/**
 * Location model for storing parks in db.
 */
const mongoose = require('mongoose');

const schema = mongoose.Schema;

const parkSchema = new schema({
    title:{type:String,required:true},
    position: {
        lat:{type:Number,required:true},
        lng:{type:Number,required:true}
    },
    icon:{type:String,required:true}
});

const Park = module.exports = mongoose.model("Park",parkSchema);

module.exports.findByTitle = function (title,callback) {
    const query = {title:title};
    Park.findOne(query,callback);
};