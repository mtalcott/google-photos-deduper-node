const mongoose = require('mongoose');

const jobStatusSchema = new mongoose.Schema({
  jobId: {type: String, unique: true}
}, {strict: false, timestamps: true});

const JobStatus = mongoose.model('JobStatus', jobStatusSchema);

module.exports = JobStatus;
