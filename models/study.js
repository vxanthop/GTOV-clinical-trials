const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// Create Schema
const StudySchema = new Schema({
    study_id:  String,
    status:  String,
    brief_title:  String,
    url:  String,
    date: String,
    drugs:  [String],
    brief_summary:  String,
    eligibility_criteria:  String,
    conditions: [String],
});

module.exports = Study = mongoose.model('study', StudySchema);
