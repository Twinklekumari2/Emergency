const express = require('express');
const router = express.Router();
const Ambulance = require('./../models/Ambulance')
const {jwtAuthMiddleWare, generateToken} = require('./../jwt');
const Hospital = require('../models/Hospital');
const Request = require('../models/Request');

router.post('/ambulance',jwtAuthMiddleWare, async (req, res) => {
    try{

        const ambulance = req.body;
        // const userId = req.user.id;
        const newAmbulance = new Ambulance(ambulance);
        // newRating.userID = userId;
        //hospital id is sent dynamically though frontend. keep it in mind...
        const response = await newAmbulance.save();
        
        console.log(response);
    
        res.status(200).json({message: "Successfully added Ambulance details.", response: response});
    }catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
})

router.post('/hospitals',jwtAuthMiddleWare, async (req, res) => {
    try{

        const hospital = req.body;
        // const userId = req.user.id;
        const newHospital = new Hospital(hospital);
        // newRating.userID = userId;
        //hospital id is sent dynamically though frontend. keep it in mind...
        const response = await newHospital.save();
        
        console.log(response);
    
        res.status(200).json({message: "Successfully added Hospital details.", response: response});
    }catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
})

router.patch('/request/:requestId/accept',jwtAuthMiddleWare, async (req,res) => {
    try{
        
        const requestId = req.params.requestId;
        const hospitalId = req.user.id; //here user if hospital.
        
        const request = await Request.findById(requestId);
        if(!request){
            return res.status(404).json({message: "Request not found"});
        }
        if (request.hospitalId.toString() !== hospitalId) {
            return res.status(403).json({ message: "Not authorized to accept this request" });
        }

        request.status = "accepted"
        const updatedRequest = await request.save();

        res.status(200).json({message: "Updated status successfully", response: updatedRequest })
    }catch(err){
        console.log(err);
        res.status(501).json({error:"Internal server error"});

    }
})

router.patch('/request/:requestId/completed',jwtAuthMiddleWare, async (req,res) => {
    try{
        
        const requestId = req.params.requestId;
        const hospitalId = req.user.id;
        
        const request = await Request.findById(requestId);
        if(!request){
            return res.status(404).json({message: "Request not found"});
        }
        if (request.hospitalId.toString() !== hospitalId) {
            return res.status(403).json({ message: "Not authorized to accept this request" });
        }
        
        if(request.status === "completed") {
           return res.status(400).json({ message: "Request is already completed" });
        }

        if(request.status !== "accepted") {
           return res.status(400).json({ message: "Only accepted requests can be completed" });
        }

        request.status = "completed"
        const updatedRequest = await request.save();

        res.status(200).json({message: "Updated status successfully", response: updatedRequest })
    }catch(err){
        console.log(err);
        res.status(500).json({error:"Internal server error"});

    }
})

module.exports = router;