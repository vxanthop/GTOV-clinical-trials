const mongoose = require('mongoose');

const mongoURI = `mongodb://${process.env.HOST}:${process.env.DB_PORT}/${process.env.DB}`;
const connectDb = () => {
    mongoose
        .connect(mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})
        .then(() => console.log('MongoDB Connected...'))
        .catch(err => console.log(err));
};

module.exports = connectDb;
