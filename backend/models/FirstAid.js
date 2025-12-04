const mongoose = require('mongoose');

const firstAidSchema = new mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    symptoms:{
        type: String,
    },
    steps:{
        type: String,
    }
    
})

const firstAid = mongoose.model('firstAid', firstAidSchema);
module.exports = firstAid