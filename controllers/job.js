const agenda = require('../lib/agenda');
const ObjectId = require('mongoose').Types.ObjectId;
const JobStatus = require('../models/JobStatus');

/**
 * POST /job
 * Start a new job.
 */
exports.postJob = async (req, res) => {
  let job = await agenda.now('photos', {
    userId: req.user._id
  });
  let jobId = job.attrs._id;

  res.format({
    json: () => {
      res.json({success: true, data: {jobId}});
    },
    html: () => {
      res.redirect(`/job/${jobId}`);
    }
  });
};

/**
 * GET /job
 * View job status.
 */
exports.getJob = async (req, res) => {
  let jobId = req.params.id;
  let jobs = await agenda.jobs({
    name: 'photos',
    "data.userId": req.user._id,
    _id: ObjectId(jobId)
  });
  let job = jobs[0];
  let jobStatus = await JobStatus.findOne({jobId});
  
  

  // res.format({
  //   json: () => {
      res.json({data: {job, jobStatus}});
  //   },
  //   html: () => {
  //     // res.render('jobStatus', {
  //     //   title: 'Job Status',
  //     //   jobStatus
  //     // });
  //   }
  // });
};
