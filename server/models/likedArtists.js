const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `likedArtists` array in User.js
const artistSchema = new Schema({
  name: 
  {
      type: String,
  },
  song: {
    type: String,
  },
  // saved artist id from Genius
  artistId: {
    type: String,
  },
  image: {
    type: String,
  },
  year: {
    type: Number,
  },
  sample: {
    type: String,
  }
});

module.exports = artistSchema;