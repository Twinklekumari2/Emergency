const express = require('express');
const router = express.Router();
const Ambulance = require('./../models/Ambulance');
const Hospital = require('../models/Hospital');
const Request = require('../models/Request');
const { jwtAuthMiddleWare, generateToken } = require('./../jwt');

// Helper to replace undefined checkHospitalRole dependency cleanly
const verifyHospitalNode = async (id) => {
    const check = await Hospital.exists({ _id: id });
    return !!check;
};

router.post('/ambulance/:hospitalId', jwtAuthMiddleWare, async (req, res) => {
    try {
        const { hospitalId } = req.params;
        if(req.user.id !== hospitalId) return res.status(403).json({ message: "Unauthorized access" });

        const hospitalExists = await Hospital.exists({ _id: hospitalId });
        if (!hospitalExists) return res.status(404).json({ message: "Hospital not found" });

        const newAmbulance = new Ambulance({ ...req.body, hospitalId });
        const response = await newAmbulance.save();
        
        res.status(200).json({ message: "Successfully added Ambulance details.", response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/ambulance', jwtAuthMiddleWare, async (req, res) => {
    try {
        const fleet = await Ambulance.find().lean();
        res.status(200).json({ message: "Ambulances successfully fetched", response: fleet });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/ambulance/:id', jwtAuthMiddleWare, async (req, res) => {
  try {
    const ambulance = await Ambulance.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );

    if (!ambulance) return res.status(404).json({ message: "Ambulance not found" });

    res.status(200).json({ success: true, response: ambulance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post('/hospitals', async (req, res) => {
    try {
        const newHospital = new Hospital(req.body);
        const response = await newHospital.save();
        const token = generateToken({ id: newHospital._id });
    
        res.status(200).json({ message: "Successfully added Hospital details.", token, response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/list', jwtAuthMiddleWare, async (req, res) => {
    try {
        const hospitals = await Hospital.find().lean();
        res.status(200).json({ message: "Hospitals successfully fetched", response: hospitals });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/hospitals', jwtAuthMiddleWare, async(req, res) => {
    try {
        let filter = {};
        if (req.query.icu === "true") {
            filter.icuBeds = { $gt: 0 };
        }
        const hospitals = await Hospital.find(filter).lean();
        res.status(200).json({ response: hospitals, message: "Successfully filtered" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.patch('/request/:requestId/accept', jwtAuthMiddleWare, async (req, res) => {
    try {
        if (!await verifyHospitalNode(req.user.id)) {
            return res.status(403).json({ message: "User does not have hospital privileges" });
        }
        
        const request = await Request.findById(req.params.requestId);
        if (!request) return res.status(404).json({ message: "Request not found" });

        if (request.hospitalId !== req.user.id && request.assignedHospital?.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to accept this request" });
        }

        request.status = "accepted";
        const updatedRequest = await request.save();

        res.status(200).json({ message: "Updated status successfully", response: updatedRequest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.patch('/request/:requestId/completed', jwtAuthMiddleWare, async (req, res) => {
    try {
        if (!await verifyHospitalNode(req.user.id)) {
            return res.status(403).json({ message: "User does not have hospital privileges" });
        }
        
        const request = await Request.findById(req.params.requestId);
        if (!request) return res.status(404).json({ message: "Request not found" });

        if (request.hospitalId !== req.user.id && request.assignedHospital?.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to manage this request" });
        }
        
        if (request.status === "completed") {
           return res.status(400).json({ message: "Request is already completed" });
        }

        request.status = "completed";
        const updatedRequest = await request.save();

        res.status(200).json({ message: "Updated status successfully", response: updatedRequest });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { registrationNo, adminPassword } = req.body;
        const hospital = await Hospital.findOne({ registrationNo });

        if (!hospital || !(await hospital.comparePassword(adminPassword))) {
           return res.status(401).json({ error: 'Invalid verification numbers or password' });
        }
        
        const token = generateToken({ id: hospital.id });
        res.status(200).json({ token, message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/me", jwtAuthMiddleWare, async (req, res) => {
    try {
        const hospital = await Hospital.findById(req.user.id).lean();
        if (!hospital) return res.status(404).json({ message: "Hospital profile not found" });

        res.json({ response: hospital, message: "Successfully displayed profile" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.put('/update/:hospitalId', jwtAuthMiddleWare, async (req, res) => {
  try {
    const { hospitalId } = req.params;
    if (req.user.id !== hospitalId) return res.status(403).json({ message: "Unauthorized profile modification lookups" });

    const allowedUpdates = [
      "hospitalName", "officialEmail", "website", "imageOfHospital",
      "ambulanceCount", "availableAmbulances", "totalBeds", "icuBeds",
      "oxygenBeds", "availableBeds", "ventilators", "isAcceptingEmergency"
    ];

    const updates = {};
    allowedUpdates.forEach(field => {
      if (req.body[field] !== undefined) updates[field] = req.body[field];
    });
    updates.lastUpdated = new Date();

    const hospital = await Hospital.findByIdAndUpdate(hospitalId, { $set: updates }, { new: true });
    if (!hospital) return res.status(404).json({ message: "Hospital entity data missing" });

    res.status(200).json({ message: "Hospital profile updated successfully", response: hospital });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/logout', (req, res) => {
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "strict" });
    res.status(200).json({ message: "Logout successful" });
});

// RESOLVED RACE CONDITIONS: Atomic operation ensures ONLY ONE hospital can transition a request status from pending
router.patch('/accept-emergency/:requestId', jwtAuthMiddleWare, async (req, res) => {
  try {
    const { requestId } = req.params;
    const hospitalId = req.user.id; 

    const emergencyRequest = await Request.findOneAndUpdate(
        { _id: requestId, status: 'pending' }, 
        { $set: { assignedHospital: hospitalId, status: 'dispatched' } },
        { new: true }
    );

    if (!emergencyRequest) {
      return res.status(409).json({ 
        success: false, 
        message: "This emergency assignment has already been secured by another medical facility or is unavailable." 
      });
    }

    return res.status(200).json({
      success: true,
      message: "Emergency pipeline secured. Route locking initiated.",
      request: emergencyRequest
    });
  } catch (error) {
    console.error("Collision resolution processing error:", error);
    res.status(500).json({ success: false, message: "Internal server registry error." });
  }
});

module.exports = router;