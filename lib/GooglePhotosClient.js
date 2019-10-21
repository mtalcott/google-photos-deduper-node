const {google} = require('googleapis');

class GooglePhotosClient {

  constructor(token) {
    // console.log(`req.user: ${JSON.stringify(req.user, undefined, 2)}`);
    this.accessToken = token.accessToken;
    this.refreshToken = token.refreshToken;

    this.authObj = new google.auth.OAuth2({
      access_type: 'offline'
    });

    this.authObj.setCredentials({
      refresh_token: token.refreshToken,
      access_token: this.accessToken
    });
  }

  async getMediaItems() {
    const url = 'https://photoslibrary.googleapis.com/v1/mediaItems';
    const response = await this.authObj.request({
      url,
      method: 'GET'
    });

    console.log(`response: ${JSON.stringify(response, undefined, 2)}`);

    return response;
  }

}

exports.GooglePhotosClient = GooglePhotosClient;
