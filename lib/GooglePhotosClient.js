const {google} = require('googleapis');
const MediaItem = require('../models/MediaItem');

class GooglePhotosClient {

  constructor(args) {
    let {token, user} = args;
    this.userId = user._id;
    this.accessToken = token.accessToken;
    this.refreshToken = token.refreshToken;

    this.authObj = new google.auth.OAuth2(
      process.env.GOOGLE_ID,
      process.env.GOOGLE_SECRET
      // "http://localhost:8080/auth/google/callback"
    );

    this.authObj.setCredentials({
      refresh_token: token.refreshToken,
      access_token: this.accessToken
    });
  }

  async getMediaItems() {
    const maxItems = 1000;
    let response, nextPageToken, itemCount = 0;
    let params = {
      pageSize: 100
    };
    
    while (itemCount < maxItems) {
      if (nextPageToken) {
        params.pageToken = nextPageToken;
      }

      response = await this.authObj.request({
        url: "https://photoslibrary.googleapis.com/v1/mediaItems",
        method: 'GET',
        params
      });
      // console.log(`response: ${JSON.stringify(response, undefined, 2)}`);

      if (response.status == 200) {
        // let ids = response.data.mediaItems.map((item) => item.id);
        // console.log(`ids: ${JSON.stringify(ids, undefined, 2)}`);

        for (const mediaItemData of response.data.mediaItems) {
          // console.log(`index: ${JSON.stringify(index, undefined, 2)}`);

          let mediaItem = await MediaItem.findOne({
            userId: this.userId,
            id: mediaItemData.id
          });
          if (mediaItem) {
            console.log(`Found mediaItem with id ${mediaItemData.id}`);
            // Already in our database. No-op.
          } else {
            console.log(`Saving new mediaItem with id ${mediaItemData.id}`);
            mediaItem = new MediaItem({
              userId: this.userId,
              ...mediaItemData
            });
            await mediaItem.save();
          }
        }

        // await MediaItem.insertMany(response.data.mediaItems);

        itemCount += response.data.mediaItems.length;
        nextPageToken = response.data.nextPageToken;
      }
      
    }
    
    return itemCount;
  }

}

exports.GooglePhotosClient = GooglePhotosClient;
