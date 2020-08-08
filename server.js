const express = require('express');
const dotenv = require('dotenv').config({ path: './config/config.env' });;
const connectDB = require('./config/db');
const PORT = process.env.PORT || 5000;

// Connect with DB
connectDB();

const app = express();

// Routes
app.use('/populate_db', require('./routes/populate_db'));
app.use('/api/studies', require('./routes/studies'));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});