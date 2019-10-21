const {GooglePhotosClient} = require('../lib/GooglePhotosClient');

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
  const token = req.user.tokens.find((token) => token.kind === 'google');
  // console.log(`token: ${JSON.stringify(token, undefined, 2)}`);
  
  const photosClient = new GooglePhotosClient(token);
  const response = await photosClient.getMediaItems();
  res.json(response);
};
