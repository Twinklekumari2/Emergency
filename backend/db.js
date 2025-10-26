//very important

const mongoose = require('mongoose');
require('dotenv').config();
//define the mongoDB connection url

const mongoURL = process.env.DB_URL_LOCAL;
console.log(mongoURL)
// const mongoURL = process.env.DB_URL;

//set up connection(ye required parameter hai)
mongoose.connect(mongoURL)
//isi connection se hum apne db server and nodejs server ko connect krte hsi 
//isse mongoose khud maintain karta hai
const db = mongoose.connection;

db.on('connected',() => {     
    console.log('connected to MongoDB server');
})

db.on('error', (err) => {
    console.log('❌ MongoDB connection error:', err);
});

db.on('disconnected',()=>{
    console.log('MongoDB disconnected');
})

//export
module.exports = db;