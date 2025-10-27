const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;

const userRoutes = require('./routes/userRoutes.js');
app.use('/user', userRoutes);

const hospitalRoutes = require('./routes/hospitalRoutes.js');
app.use('/user', hospitalRoutes);

const generalRoutes = require('./routes/generalRoutes.js');
app.use('/general', generalRoutes);

const patientRoutes = require('./routes/patientRoutes.js');
app.use('/user', patientRoutes);


app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})