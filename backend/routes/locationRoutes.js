const express = require("express");
const Hospital = require("../models/Hospital");
const router = express.Router();

// Node fetch
const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

router.get("/reverse-geocode", async (req, res) => {
    try {
        const { lat, lon } = req.query;

        if (!lat || !lon) {
            return res.status(400).json({ error: "Latitude and Longitude required" });
        }

        const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`;

        const response = await fetch(url, {
            headers: {
                "User-Agent": "Emergency-App/1.0 (twinklekumari246@gmail.com)"
            }
        });

        const data = await response.json();
        res.status(200).json({response:data, message: "Location fetch successfully"});

    } catch (error) {
        console.error("Reverse Geocode Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

router.get('/city/:cityName', async (req, res) => {
    try {
        const { cityName } = req.params;

        // Find hospitals with the given city
        const hospitals = await Hospital.find({ city: cityName });

        if (!hospitals.length) {
            return res.status(404).json({ message: "No hospitals found in this city" });
        }

        res.status(200).json({message:"filtered based on city is successful", response: hospitals});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get('/state/:stateName', async (req, res) => {
     try{
        const { stateName } = req.params;
        const hospitals = await Hospital.find({state: stateName});
        if(!hospitals.length()){
            return res.starue(404).json({message: "No hsopitals found in this city"});
        }
        res.status(200).json({response: hospitals});
     }
     catch(err){
        console.log(err);
        res.status(500).json({message: "Internal server error"});
     }
})

module.exports = router;
