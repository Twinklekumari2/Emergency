const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const cors = require('cors'); 
const { createServer } = require('http'); // 1. Node HTTP Server declared perfectly here
const { Server } = require('socket.io'); 

app.use(cors({
    origin: ["https://emergency-tan-six.vercel.app", "http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors:{
        origin: "http://localhost:5173",
        methods: ["GET", "POST", "PATCH"]
    }
});

io.on('connection', (socket) => {
    console.log(` New Node Connected: ${socket.id}`);

    socket.on('join_hospital_room', (hospitalId) => {
        socket.join(`hospital-room-${hospitalId}`);
        console.log(`Hospital Node ${hospitalId} locked into secure server room`);
    });

    // Fixed typo from 'disconnet' to 'disconnect'
    socket.on('disconnect', () => {
        console.log(`Node disconnected: ${socket.id}`);
    });
});


const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;

// Routes Layout Pipeline
const userRoutes = require('./routes/userRoutes.js');
app.use('/user', userRoutes);

const hospitalRoutes = require('./routes/hospitalRoutes.js');
app.use('/hospital', hospitalRoutes);

const adminRoutes = require('./routes/'); 
app.use('/admin', adminRoutes);

const generalRoutes = require('./routes/generalRoutes.js');
app.use('/general', generalRoutes);

const patientRoutes = require('./routes/patientRoutes.js');
app.use('/patient', patientRoutes);

const locationRoutes = require('./routes/locationRoutes.js');
app.use('/location', locationRoutes);

// Fire up the HTTP + Socket Server engine
httpServer.listen(PORT, () => {
    console.log('Server is running on port', PORT);
});

module.exports = { io };