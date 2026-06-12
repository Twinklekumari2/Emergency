const express = require('express');
const router = express.Router();
const Admin = require('./../models/Admin');
const Hospital = require('../models/Hospital');
const { jwtAuthMiddleWare, generateToken } = require('./../jwt');

router.post('/signup', async (req, res) => {
    try {
        const newAdmin = new Admin(req.body);
        const response = await newAdmin.save();
        const token = generateToken({ id: response.id });
        
        res.status(200).json({ response, token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email.toLowerCase().trim() });

        if (!admin || !(await admin.comparePassword(password))) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }
        
        const token = generateToken({ id: admin.id });
        res.status(200).json({ token, message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get('/profile', jwtAuthMiddleWare, async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id).lean();
        if (!admin) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ admin });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/profile/password', jwtAuthMiddleWare, async (req, res) => {
    try {
        const adminId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        const admin = await Admin.findById(adminId);
        if (!admin || !(await admin.comparePassword(currentPassword))) {
            return res.status(400).json({ error: 'Incorrect password' });
        }

        admin.password = newPassword;
        await admin.save();

        res.status(200).json({ message: "Password updated successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.patch('/approve/:hospitalId', jwtAuthMiddleWare, async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id).lean();
        if (!admin || admin.role !== "admin") {
            return res.status(403).json({ message: "Access Denied" });
        }

        const hospital = await Hospital.findByIdAndUpdate(
            req.params.hospitalId,
            { verificationStatus: "Approved" },
            { new: true }
        );

        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        
        return res.status(200).json({ message: "Approved successfully", response: hospital });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.patch('/reject/:hospitalId', jwtAuthMiddleWare, async (req, res) => {
    try {
        const admin = await Admin.findById(req.user.id).lean();
        if (!admin || admin.role !== "admin") {
            return res.status(403).json({ message: "Access Denied" });
        }

        const hospital = await Hospital.findByIdAndUpdate(
            req.params.hospitalId,
            { verificationStatus: "Rejected" },
            { new: true }
        );

        if (!hospital) {
            return res.status(404).json({ message: "Hospital not found" });
        }
        
        return res.status(200).json({ message: "Rejected successfully", response: hospital });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;