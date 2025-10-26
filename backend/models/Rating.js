const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    userID:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    hospitalId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "Hospital",
    },
    rating:{
        type:Number,
        required:true,
    },
    feedback:{
        type:String,
        required:true,
    }
})

const Rating = mongoose.model('rating', ratingSchema);
module.exports = Rating