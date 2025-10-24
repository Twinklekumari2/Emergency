const mongoose = require('mongoose');
const { emit } = require('../../../Voting-app/models/User');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        enum:['user','hospital'],
        required:true,
    },
    location:{
        lat:{
            type:Number,
        },
        lon:{
            type:Number
        }
    },
    
})

const User = mongoose.model('user', userSchema);
module.exports = User;