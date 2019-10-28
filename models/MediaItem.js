const mongoose = require('mongoose');

const mediaItemSchema = new mongoose.Schema({
  id: {type: String, unique: true},
  userId: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  baseUrl: String,
  productUrl: String,
  mimeType: String,
  filename: String,

  mediaMetadata: {
    creationTime: String,
    width: String,
    height: String,
    photo: Object
    //   cameraMake: String,
    //   cameraModel: String,
    //   focalLength: Number,
    //   apertureFNumber: Number,
    //   isoEquivalent: Number
    // }
  }
}, {timestamps: true});

const MediaItem = mongoose.model('MediaItem', mediaItemSchema);

module.exports = MediaItem;
