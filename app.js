const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load config
dotenv.config({path: './config/config.env'});

// Connect with DB
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});