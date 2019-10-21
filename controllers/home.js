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
  // console.log(`user: ${JSON.stringify(req.user, undefined, 2)}`);
  const token = req.user.tokens.find((token) => token.kind === 'google');
  // console.log(`token: ${JSON.stringify(token, undefined, 2)}`);
  
  const photosClient = new GooglePhotosClient({user: req.user, token});
  try {
    const response = await photosClient.getMediaItems();
    res.json(response);
  } catch (error) {
    console.log(error);
    res.status(500);
    res.json({error: true, errorMsg: "An unexpected error occurred."});
  }
  
};
