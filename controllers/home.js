const {google} = require('googleapis');

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
exports.start = (req, res) => {
  // console.log(`req.user: ${JSON.stringify(req.user, undefined, 2)}`);
  const token = req.user.tokens.find((token) => {
    return token.kind === "google";
  }); // accessToken, accessTokenExpires, refreshToken
  // console.log(`token: ${JSON.stringify(token, undefined, 2)}`);

  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_ID,
    process.env.GOOGLE_SECRET,
    "http://localhost:8080/auth/google/callback"
  );

  oAuth2Client.setCredentials({
    refresh_token: token.refreshToken,
    access_token: token.accessToken
  });

  const url = 'https://photoslibrary.googleapis.com/v1/mediaItems';
  oAuth2Client.request({
    url,
    method: 'GET'
  })
  .then(response => {
    console.log(`response: ${JSON.stringify(response, undefined, 2)}`);
    
    res.json(response);
  });
};
