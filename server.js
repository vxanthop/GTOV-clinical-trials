const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Load config
dotenv.config({path: './config/config.env'});

// Connect with DB
// connectDB();

const app = express();

// Fetch data from the DB according to the request and return them in JSON
app.get('/api/studies', (req, res) => {
    const studies = [
        {id: 1, a: "yes", b: "yes"},
        {id: 2, a: "no", b: "no"},
        {id: 3, a: "no", b: "yes"},
        {id: 4, a: "yes", b: "yes"}
    ];

    res.json(studies);
});

app.get('/api/studies/:id', (req, res) => {
    const studies = [
        {id: 5, a: "yeerrreas", b: "yes"}
    ];

    res.json(studies);
});

// Config
const PORT = process.env.PORT || 5000;

// Routes
app.use('/', require('./routes/index'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});