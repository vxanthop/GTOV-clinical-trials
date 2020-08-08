const express = require('express');
const router = express.Router();

// Study Model
const Study = require('../models/study');

// @route   GET /api/studies
// @desc    Fetch all studies
// @access  Public
router.get('/', (req, res) => {
    Study.find()
        .limit(10)
        .sort({ study_id: 1 })
        .then(studies => res.json(studies))
});

// @route   GET /api/studies
// @desc    Fetch all studies
// @access  Public
router.get('/all', (req, res) => {
    Study.find()
        .sort({ study_id: 1 })
        .then(studies => res.json(studies))
});

// @route   GET /api/studies/:drug
// @desc    Fetch studies matching the query 
// @access  Public
router.get('/:drug', (req, res) => {
    Study.find({ drugs: req.params.drug })
        .sort({ study_id: 1 })
        .then(studies => res.json(studies))
});

// @route   POST /api/studies/:id
// @desc    Delete a study 
// @access  Public
router.delete('/:id', (req, res) => {
    Study.findById(req.params.id)
        .then(study => study.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;