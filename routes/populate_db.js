const express = require('express');

const router = express.Router();

// Study Model
const Study = require('../models/study');

// @route   GET /populate_db
// @desc    Populate the DB 
// @access  Public
router.get('/', (req, res) => {
    Study.countDocuments({}, (err, count) => {
        if(count === 0) {
            require('../db_setup')
            res.json({message: "All good!"});
        } else {
            res.status(404).json({error: "You have documents in your database! Delete them and try again or run `./db_setup.js` manually"});
        }
    })
    .catch(() => res.status(404).json({error: "Is the mongo service running?"}));
});

module.exports = router;