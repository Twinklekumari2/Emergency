const express = require("express");
const router = express.Router();
const Request = require("./../models/Request");
const Hospital = require("./../models/Hospital");
const { jwtAuthMiddleWare } = require("./../jwt");

router.post("/request", jwtAuthMiddleWare, async (req, res) => {
  try {
    const newRequest = new Request({ ...req.body, user: req.user.id });
    const response = await newRequest.save();
    res.status(200).json({ message: "Request sent successfully", response });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/request", jwtAuthMiddleWare, async (req, res) => {
  try {
    const requests = await Request.find({ user: req.user.id }).lean();
    res.status(200).json({ message: "Requests fetched successfully", response: requests || [] });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.post('/trigger-sos', jwtAuthMiddleWare, async (req, res) => {
  try {
    const { latitude, longitude } = req.body;
    const userId = req.user.id;
    const patientCoords = [parseFloat(longitude), parseFloat(latitude)];

    if (isNaN(patientCoords[0]) || isNaN(patientCoords[1])) {
        return res.status(400).json({ success: false, message: "Invalid geo coordinates provided" });
    }

    // 1. Find target facilities using high-performance lean projection paths (only get _id)
    const broadCastHospitals = await Hospital.find({
      verificationStatus: "Approved",
      isAcceptingEmergency: true,
      location: {
        $near: {
          $geometry: { type: "Point", coordinates: patientCoords },
          $maxDistance: 10000 // 10km radius boundary
        }
      }
    }).select('_id').lean();

    if (broadCastHospitals.length === 0) {
      return res.status(404).json({ 
        success: false, 
        message: "No active medical facilities detected inside response radius." 
      });
    }

    // 2. Track the active incident pipeline inside our collections
    const activeEmergency = await Request.create({
      user: userId,
      location: { type: 'Point', coordinates: patientCoords },
      status: 'pending'
    });

    const targetedHospitalIds = broadCastHospitals.map(h => h._id);

    return res.status(201).json({
      success: true,
      message: `Emergency broadcast initiated to ${broadCastHospitals.length} target nodes.`,
      requestId: activeEmergency._id,
      broadcastList: targetedHospitalIds
    });
  } catch (error) {
    console.error("SOS Broadcast System Failure:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
});

module.exports = router;