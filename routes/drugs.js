const express = require('express');
const router = express.Router();

// @route   GET /api/drugs/all
// @desc    Fetch all drugs 
// @access  Public
router.get('/', (req, res) => {
    let lim = parseInt(req.query.limit) || 10;
    Study.find({ "drugs" : 1 , "_id" : 0})
    .limit(lim)
    .then(data => res.json(data))
});

// @route   GET /api/drugs/:prefix
// @desc    Fetch all drugs starting with :prefix
// @access  Public
router.get('/:prefix', (req, res) => {
    const lim = parseInt(req.query.limit) || 10;
    Study.find(
        { "drugs": { $regex: `^${req.params.prefix}` , $options : "i"} }, 
        { "drugs" : 1 , _id : 0},
    )
    .limit(lim)
    .then(data => res.json(data))
});

module.exports = router;