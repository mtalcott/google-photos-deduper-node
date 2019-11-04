const User = require('../../models/User');
const JobStatus = require('../../models/JobStatus');
const {GooglePhotosClient} = require('../../lib/GooglePhotosClient');

module.exports = function(agenda) {
  agenda.define('photos', async job => {
    try {
      let jobId = job.attrs._id;
      let jobStatus = await JobStatus.create({jobId, status: "inProgress"});

      console.log(`job.attrs: ${JSON.stringify(job.attrs, undefined, 2)}`);

      let user = await User.findById(job.attrs.data.userId);
      // console.log(`user: ${JSON.stringify(user, undefined, 2)}`);

      let token = user.tokens.find((token) => token.kind === 'google');
      // console.log(`token: ${JSON.stringify(token, undefined, 2)}`);

      let photosClient = new GooglePhotosClient({user: user, token});
      let onUpdate = async (attributes) => {
        await jobStatus.updateOne(attributes).catch(error => console.log(error));
      };
      
      await photosClient.getMediaItems({onUpdate});
      await photosClient.findDuplicateMediaItems({onUpdate});

      console.log("photos job done!");
      await jobStatus.updateOne({status: "complete", statusText: "Complete."});
    } catch (error) {
      console.log(error);
      await jobStatus.updateOne({statusText: "An unexpected error has occurred."});
      job.fail(error);
    };
  });

  // agenda.define('reset password', async job => {
  //   // Etc
  // });
};