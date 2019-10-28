const agenda = require('../lib/agenda');

/**
 * GET /
 * Home page.
 */
exports.index = (req, res) => {
  res.render('home', {
    title: 'Home'
  });
};

/**
 * GET /start
 * Do some photos stuff.
 */
exports.start = async (req, res) => {
  let job = await agenda.now('photos', {
    userId: req.user._id
  });

  res.json({success: true, data: {jobId: job.attrs._id}});
};
