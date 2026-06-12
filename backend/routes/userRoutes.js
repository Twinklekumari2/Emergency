const express = require('express');
const router = express.Router();
const User = require('./../models/User');
const Hospital = require('../models/Hospital');
const { jwtAuthMiddleWare, generateToken } = require('./../jwt');

// ==========================================
// SILENT GUEST INITIALIZATION
// ==========================================
router.post('/silent-init', async (req, res) => {
  try {
    const { deviceId } = req.body;

    if (!deviceId) {
      return res.status(400).json({ success: false, message: "Device ID is required" });
    }

    // Use .lean() to make the read operation incredibly fast
    let user = await User.findOne({ deviceId }).lean();

    if (!user) {
      // Create a plain object or regular save for new entries
      const newUser = await User.create({ deviceId });
      const token = generateToken({ id: newUser._id });
      
      return res.status(201).json({ 
        success: true, 
        message: "New guest user registered", 
        token,
        user: newUser 
      });
    }

    // Generate token for returning user to satisfy auth middleware down the line
    const token = generateToken({ id: user._id });

    return res.status(200).json({ 
      success: true, 
      message: "Existing user verified", 
      token,
      user 
    });
  } catch (error) {
    console.error("Error in silent-init:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});

// ==========================================
// ADMIN: APPROVE HOSPITAL NODE
// ==========================================
router.patch('/approve/:hospitalId', jwtAuthMiddleWare, async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Optimize role verification check
        const user = await User.findById(userId).select('role').lean();
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied" });
        }

        const { hospitalId } = req.params;
        
        // Atomically update instead of doing a separate find, mutate, and save cycle
        const hospital = await Hospital.findByIdAndUpdate(
            hospitalId,
            { $set: { verificationStatus: "Approved" } },
            { new: true }
        );

        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        
        // FIXED: Corrected res.json(200).json chain crash
        return res.status(200).json({ message: "Approved successfully", response: hospital });

    } catch (err) {
        console.error("Error in hospital approval:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

// ==========================================
// ADMIN: REJECT HOSPITAL NODE
// ==========================================
router.patch('/reject/:hospitalId', jwtAuthMiddleWare, async (req, res) => {
    try {
        const userId = req.user.id;
        
        // Optimize role verification check
        const user = await User.findById(userId).select('role').lean();
        if (!user || user.role !== "admin") {
            return res.status(403).json({ message: "Access Denied" });
        }

        const { hospitalId } = req.params;
        
        // Atomically update directly inside the database engine
        const hospital = await Hospital.findByIdAndUpdate(
            hospitalId,
            { $set: { verificationStatus: "Rejected" } },
            { new: true }
        );

        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        
        // FIXED: Corrected res.json(200).json chain crash
        return res.status(200).json({ message: "Rejected successfully", response: hospital });

    } catch (err) {
        console.error("Error in hospital rejection:", err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;