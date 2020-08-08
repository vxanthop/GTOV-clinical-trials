const express = require('express');
const router = express.Router();

// Study Model
const Study = require('../models/study');

// @route   GET /populate_db
// @desc    Populate the DB 
// @access  Public
router.get('/', (req, res) => {
    Study.countDocuments({}, (err, count) => {
        if(count == 0) {
            require('../db_setup')
            res.json({success: true});
        } else {
            res.status(404).json({success: false});
        }
    })
    .catch(err => res.status(404).json({success: false}));
});

module.exports = router;