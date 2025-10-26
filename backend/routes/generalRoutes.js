const express = require('express');
const router = express.Router();
const User = require('./../models/User');
const Rating = require('./../models/Rating')
const {jwtAuthMiddleWare, generateToken} = require('./../jwt');
const Hospital = require('../models/Hospital');

router.post('/rating',jwtAuthMiddleWare, async (req, res) => {
    try{

        const rating = req.body;
        const userId = req.user.id;
        const newRating = new Rating(rating);
        newRating.userID = userId;
        //hospital id is sent dynamically though frontend. keep it in mind...
        const response = await newRating.save();
        
        console.log(response);
    
        res.status(200).json({message: "Successfully Rated", response: response});
    }catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
})

router.get('/hospital/:hospitalId',jwtAuthMiddleWare, async (req, res) => {
    try{
        const hospitalId = req.params.hospitalId;
        const hospitalInfo = await Hospital.findById(hospitalId);
        console.log(hospitalInfo);

        res.status(200).json({message:"Hospital Info Fetched", response:hospitalInfo})

    }catch(err){
        console.log(err);
        res.status(501).json({error:err});
    }
})

router.get('/hospital/nearby', jwtAuthMiddleWare, async (req, res) => {
    try{
        const response = await Hospital.find();
        console.log(response);
        res.status(200).json({message:"Hospital Fetched Successfully", response: response})

    }catch(err){
        console.log(err);
        res.status(500).json({error: err});
    }
})

router.post('/location',jwtAuthMiddleWare, async (req, res) => {
    try{

        const {lon, lat} = req.body;
        if (typeof lat !== "number" || typeof lon !== "number") {
            return res.status(400).json({ message: "Invalid coordinates" });
        }

        const userId = req.user.id;
        const user = await User.findById(userId);

        if(!user){
            return res.status(404).json({message: "User not found"});
        }

        user.location = {lat: lat, lon: lon};
        //hospital id is sent dynamically though frontend. keep it in mind...
        const response = await user.save();
        
        console.log(response);
    
        res.status(200).json({message: "Successfully saved location", response: response});
    }catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
})

module.exports = router;