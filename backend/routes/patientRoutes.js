const express = require('express');
const router = express.Router();
const Request = require('./../models/Request')
const {jwtAuthMiddleWare, generateToken} = require('./../jwt');

router.post('/request', async (req, res) => {
    try{

        const request = req.body;
        // const userId = req.user.id;
        const newRequest = new Request(request);
        // newRequest.userId = userId;
        //have to take hospital id from frontend when user select the sepecific hospital.
        const response = await newRequest.save();
        
        console.log(response);
    
        res.status(200).json({message: "Request sent successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
})
router.get('/request',jwtAuthMiddleWare ,async (req, res) => {
     try{
        const userId = req.user.id;
        const request = await Request.findById(userId);
        if(!request){
           res.status(401).json({message: "Request not found"});
        }

        res.status(200).json({message:"Request successfullt fetched", response: request});

     }catch(err){
        res.status(501).json({message: "Invalid server error"});
     }
})

module.exports = router;