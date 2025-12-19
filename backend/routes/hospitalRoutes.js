const express = require('express');
const router = express.Router();
const Ambulance = require('./../models/Ambulance')
const {jwtAuthMiddleWare, generateToken} = require('./../jwt');
const Hospital = require('../models/Hospital');
const Request = require('../models/Request');
const User = require('../models/User');

//add ambulance driver details
router.post('/ambulance/:hospitalId',jwtAuthMiddleWare, async (req, res) => {
    try{

        const {hospitalId} = req.params;
        const hospital = await Hospital.findById(hospitalId);
        if(!hospital){
            return res.status(404).json({message:"Hospital not found"});
        }

        const ambulance = req.body; //data that is sent by frontend
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

router.get('/ambulance', jwtAuthMiddleWare, async (req, res) => {
    try{
        const ambulance = await Ambulance.find();
        if(!ambulance){
            return res.status(404).json({message:"Hospital is not present"});
        }

        res.status(200).json({message:"ambulance successfully fetched", response: ambulance})

    }catch(err){
        res.status(501).json({error:err});
    }
})


router.put('/ambulance/:id', jwtAuthMiddleWare, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const ambulance = await Ambulance.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!ambulance) {
      return res.status(404).json({ message: "Ambulance not found" });
    }

    res.status(200).json({
      success: true,
      response: ambulance
    });
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//signup
router.post('/hospitals', async (req, res) => {
    try{

        const hospital = req.body;
        const newHospital = new Hospital(hospital);
        const response = await newHospital.save();
        
        console.log(response);
        const payload = {
            id : newHospital._id,
        }
        const token = generateToken(payload);
        console.log("Token is: ", token);
    
        res.status(200).json({message: "Successfully added Hospital details.",token:token, response: response});
    }catch(err){
        console.log(err);
        res.status(500).json({error: err})
    }
})

router.get('/list', jwtAuthMiddleWare, async (req, res) => {
    try{
        const hospital = await Hospital.find();
        if(!hospital){
            return res.status(404).json({message:"Hospital is not present"});
        }

        res.status(200).json({message:"hospital successfully fetched", response: hospital})

    }catch(err){
        res.status(501).json({error:err});
    }
})

router.get('/hospitals', jwtAuthMiddleWare, async(req, res) => {
    try{
        const { icu } = req.query;
        let filter = {};
        if(icu == "true"){
            filter.icuAvailable = true;
        }

        const hospitals = await Hospital.find(filter);
        res.status(200).json({response: hospitals, message: "Successfully filtered"})
    }catch(err){
        console.log(err);
        res.status(501).json({error: err});

    }

})

router.patch('/request/:requestId/accept',jwtAuthMiddleWare, async (req,res) => {
    try{
        if(! await checkHospitalRole(req.user.id))
            return res.status(403).json({message:"user has not hospital role"});
        
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
        if(! await checkHospitalRole(req.user.id))
            return res.status(403).json({message:"user has not hospital role"});
        
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

//hospital login
router.post('/login', async (req, res) => {
    try{
        const {registrationNo, adminPassword} = req.body;
        console.log("Login attempt:", registrationNo, adminPassword);
        //finding the given username in the Hospital Model.
        const user = await Hospital.findOne({registrationNo: registrationNo
        });

        if(!user || !(await user.comparePassword(adminPassword))){
           console.log(adminPassword, user)
           return res.status(401).json({error: 'Invalid username or password'});
        }
        const payload = {
            id : user.id,
        }
        const token = generateToken(payload);
        console.log("Token is: ", token);
        res.status(200).json({token: token, message:"login successfully"});
    }catch(err){
        console.log(err);
        res.status(500).json({error: "internal server error"});

    }
})

//accessing a single hospital.
router.get("/me", jwtAuthMiddleWare, async (req, res) => {
    try {
        const hospitalId = req.user.id;  // ID from token

        const hospital = await Hospital.findById(hospitalId);

        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }

        res.json({response: hospital, message:"Successfully shown the profile" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

//updating the hospital
router.put('/update/:hospitalId', jwtAuthMiddleWare, async (req, res) => {
  try {
    const { hospitalId } = req.params;

    // 1. Check hospital exists
    const hospital = await Hospital.findById(hospitalId);
    if (!hospital) {
      return res.status(404).json({ message: "Hospital not found" });
    }

    // 2. Ensure logged-in hospital is updating its own profile
    if (req.user.id !== hospitalId) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    // 3. Allowed fields to update (IMPORTANT)
    const allowedUpdates = [
      "hospitalName",
      "officialEmail",
      "website",
      "imageOfHospital",
      "ambulanceCount",
      "availableAmbulances",
      "totalBeds",
      "icuBeds",
      "oxygenBeds",
      "availableBeds",
      "ventilators"
    ];

    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) {
        hospital[field] = req.body[field];
      }
    });

    hospital.lastUpdated = new Date();

    await hospital.save();

    res.status(200).json({
      message: "Hospital profile updated successfully",
      response: hospital
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/logout', async (req, res) => {
      res.clearCookie("token", {
    httpOnly: true,
    secure: true,       // true in production
    sameSite: "strict",
  });
    res.status(200).json({
    message: "Logout successful",
    });
})



module.exports = router;