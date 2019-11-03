const User = require('../../models/User');
const {GooglePhotosClient} = require('../../lib/GooglePhotosClient');

module.exports = function(agenda) {
  agenda.define('photos', async job => {
    try {
      console.log(`job.attrs: ${JSON.stringify(job.attrs, undefined, 2)}`);

      let user = await User.findById(job.attrs.data.userId);
      // console.log(`user: ${JSON.stringify(user, undefined, 2)}`);

      let token = user.tokens.find((token) => token.kind === 'google');
      // console.log(`token: ${JSON.stringify(token, undefined, 2)}`);

      let photosClient = new GooglePhotosClient({user: user, token});
      try {
        await photosClient.getMediaItems();
        await photosClient.findDuplicateMediaItems();
      } catch (error) {
        console.log(error);
        // res.status(500);
        // res.json({error: true, errorMsg: "An unexpected error occurred."});
      }

    } catch (error) {
      console.log(error);
      job.fail(error);
    };

    console.log("photos job done!");
    job.done();
  });

  // agenda.define('reset password', async job => {
  //   // Etc
  // });
};