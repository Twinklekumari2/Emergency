const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser');
app.use(bodyParser.json());
const PORT = process.env.PORT || 4000;

const userRoutes = require('./routes/userRoutes.js');
app.use('/user', userRoutes);

const generalRoutes = require('./routes/generalRoutes.js');
app.use('/general', generalRoutes);


app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})