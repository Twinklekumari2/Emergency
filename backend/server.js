const express = require('express');
const app = express();
const db = require('./db');
require('dotenv').config();
const cors = require('cors'); 
const { createServer } = require('http'); 
const { Server } = require('socket.io'); 
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 4000;

// ==========================================
// CORS CONFIGURATION
// ==========================================
const allowedOrigins = ["https://emergency-tan-six.vercel.app", "http://localhost:5173"];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

// ==========================================
// HTTP & SOCKET.IO SERVER ENGINE
// ==========================================
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: allowedOrigins, // Keeps WebSocket alignment identical to HTTP CORS rules
        methods: ["GET", "POST", "PATCH", "PUT", "DELETE"]
    }
});

// ==========================================
// SOCKET.IO ROOM MANAGMENT
// ==========================================
io.on('connection', (socket) => {
    console.log(`New Node Connected: ${socket.id}`);

    socket.on('join_hospital_room', (hospitalId) => {
        if (hospitalId) {
            socket.join(`hospital-room-${hospitalId}`);
            console.log(`Hospital Node ${hospitalId} locked into secure server room`);
        }
    });

    socket.on('disconnect', () => {
        console.log(`Node disconnected: ${socket.id}`);
    });
});

// ==========================================
// BACKEND PERFORMANCE MIDDLEWARES
// ==========================================
app.use(bodyParser.json());

// CRITICAL OPTIMIZATION: Inject 'io' into Express request pipeline.
// This completely destroys circular dependencies!
app.use((req, res, next) => {
    req.io = io;
    next();
});

// ==========================================
// ROUTES PIPELINE
// ==========================================
const userRoutes = require('./routes/userRoutes.js');
const hospitalRoutes = require('./routes/hospitalRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js'); 
const generalRoutes = require('./routes/generalRoutes.js');
const patientRoutes = require('./routes/patientRoutes.js');
const locationRoutes = require('./routes/locationRoutes.js');

app.use('/user', userRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/admin', adminRoutes);
app.use('/general', generalRoutes);
app.use('/patient', patientRoutes);
app.use('/location', locationRoutes);

// Fallback Route for non-matching API endpoints
app.use('*', (req, res) => {
    res.status(404).json({ success: false, message: "Resource Endpoint Not Found" });
});

// ==========================================
// FIRE UP ENGINE
// ==========================================
httpServer.listen(PORT, () => {
    console.log(`Emergency backend server securely running on port ${PORT}`);
});