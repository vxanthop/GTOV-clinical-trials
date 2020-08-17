const express = require('express');
const Study = require('../models/study');

const router = express.Router();

// Escape the regex string to avoid, among others, parentheses mismatch
const escapeRegExp = str => str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");

// @route   GET /api/studies?limit&drug
// @desc    Fetch `limit` amount of studies with drugs starting with `drug` 
// @access  Public
router.get('/', (req, res) => {
    const lim = parseInt(req.query.limit, 10);
    const drug_prefix = req.query.drug_prefix || '';
    Study.find(
        { "drugs": { $regex: escapeRegExp(`^${drug_prefix}`) , $options : "i"} }, 
    )
    .limit(lim)
    .sort({ "study_id": 1 })
    .then(studies => res.json(studies))
});

// @route   GET /api/studies/:drug
// @desc    Fetch studies containing given drug 
// @access  Public
router.get('/:drug', (req, res) => {
    const lim = parseInt(req.query.limit, 10);
    Study.find(
        { "drugs": { $regex: escapeRegExp(req.params.drug) , $options : "i"} }, 
    )
    .limit(lim)
    .sort({ "study_id": 1 })
    .then(studies => res.json(studies))
});

module.exports = router;
