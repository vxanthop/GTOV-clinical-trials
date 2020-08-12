const express = require('express');
const router = express.Router();

// Study Model
const Study = require('../models/study');

// Escape the regex string to avoid, among others, parentheses mismatch
const escapeRegExp = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

// @route   GET /api/studies?limit&drug
// @desc    Fetch `limit` amount of studies with drugs starting with `drug` 
// @access  Public
router.get('/', (req, res) => {
    let lim = parseInt(req.query.limit);
    let drug = req.query.drug || '';
    Study.find(
        { "drugs": { $regex: escapeRegExp(`^${drug}`) , $options : "i"} }, 
    )
    .limit(lim)
    .sort({ "study_id": 1 })
    .then(studies => res.json(studies))
});

// @route   GET /api/studies/:drug
// @desc    Fetch studies containing given drug 
// @access  Public
router.get('/:drug', (req, res) => {
    let lim = parseInt(req.query.limit);
    Study.find(
        { "drugs": { $regex: escapeRegExp(req.params.drug) , $options : "i"} }, 
    )
    .limit(lim)
    .sort({ "study_id": 1 })
    .then(studies => res.json(studies))
});

// @route   DEL /api/studies/:id
// @desc    Delete a study given it's ID
// @access  Public
router.delete('/:id', (req, res) => {
    Study.findById(req.params.id)
        .then(study => study.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;
