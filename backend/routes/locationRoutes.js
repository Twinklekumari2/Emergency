const express = require("express");
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
        res.json(data);

    } catch (error) {
        console.error("Reverse Geocode Error:", error);
        res.status(500).json({ error: "Server Error" });
    }
});

module.exports = router;
