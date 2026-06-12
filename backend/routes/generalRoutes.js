const express = require('express');
const router = express.Router();
const User = require('./../models/User');
const Hospital = require('../models/Hospital');
const { jwtAuthMiddleWare } = require('./../jwt');

router.get('/hospital/:hospitalId', jwtAuthMiddleWare, async (req, res) => {
    try {
        const hospitalInfo = await Hospital.findById(req.params.hospitalId).lean();
        if (!hospitalInfo) return res.status(404).json({ message: "Hospital not found" });

        res.status(200).json({ message: "Hospital Info Fetched", response: hospitalInfo });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

// OPTIMIZED: Native Geospatial Index query to fetch only what is needed close to coordinates
router.get('/hospital/nearby', jwtAuthMiddleWare, async (req, res) => {
    try {
        const lon = parseFloat(req.query.lon);
        const lat = parseFloat(req.query.lat);
        const maxDist = parseFloat(req.query.distance) || 15000; // Default 15km

        if (isNaN(lon) || isNaN(lat)) {
            return res.status(400).json({ message: "Valid longitude and latitude parameters are required" });
        }

        const response = await Hospital.find({
            verificationStatus: "Approved",
            location: {
                $near: {
                    $geometry: { type: "Point", coordinates: [lon, lat] },
                    $maxDistance: maxDist
                }
            }
        }).lean();

        res.status(200).json({ message: "Hospitals fetched successfully by proximity", response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/location', jwtAuthMiddleWare, async (req, res) => {
    try {
        const { lon, lat } = req.body;
        if (typeof lat !== "number" || typeof lon !== "number") {
            return res.status(400).json({ message: "Invalid coordinates" });
        }

        const response = await User.findByIdAndUpdate(
            req.user.id,
            { location: { type: "Point", coordinates: [lon, lat] } },
            { new: true }
        );

        if (!response) {
            return res.status(404).json({ message: "User not found" });
        }
    
        res.status(200).json({ message: "Successfully saved location", response });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = router;