const express = require("express");
const Hospital = require("../models/Hospital");
const router = express.Router();

const fetch = (...args) => import("node-fetch").then(({ default: f }) => f(...args));

router.get("/reverse-geocode", async (req, res) => {
    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) return res.status(400).json({ error: "Latitude and Longitude required" });

        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;
        const response = await fetch(url, {
            headers: { "User-Agent": "Emergency-App/1.0 (twinklekumari246@gmail.com)" }
        });

        const data = await response.json();
        res.status(200).json({ response: data, message: "Location fetched successfully" });
    } catch (error) {
        console.error("Reverse Geocode Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.get('/city/:cityName', async (req, res) => {
    try {
        const hospitals = await Hospital.find({ city: new RegExp(`^${req.params.cityName}$`, 'i') }).lean();
        if (!hospitals.length) return res.status(404).json({ message: "No hospitals found in this city" });

        res.status(200).json({ message: "Filtered based on city successfully", response: hospitals });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/state/:stateName', async (req, res) => {
     try {
        const hospitals = await Hospital.find({ state: new RegExp(`^${req.params.stateName}$`, 'i') }).lean();
        if (!hospitals.length) return res.status(404).json({ message: "No hospitals found in this state" });

        res.status(200).json({ response: hospitals });
     } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
     }
});

module.exports = router;