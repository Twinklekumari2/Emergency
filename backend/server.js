const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const cors = require('cors'); 

app.use(cors({
    origin: ["https://emergency-tan-six.vercel.app", "http://localhost/5173"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true
}));

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;

const userRoutes = require('./routes/userRoutes.js');
app.use('/user', userRoutes);

const hospitalRoutes = require('./routes/hospitalRoutes.js');
app.use('/hospital', hospitalRoutes);

const generalRoutes = require('./routes/generalRoutes.js');
app.use('/general', generalRoutes);

const patientRoutes = require('./routes/patientRoutes.js');
app.use('/patient', patientRoutes);

const locationRoutes = require('./routes/locationRoutes.js');
app.use('/location', locationRoutes)

app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})