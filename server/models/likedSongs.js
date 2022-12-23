const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedSongs` array in User.js
const songSchema = new Schema({
  song: [
    {
      type: String,
    },
  ],
  lyrics: {
    type: String,
    required: true,
  },
  // saved song id from Genius
  songId: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  link: {
    type: String,
  },
  genreTitle: {
    type: String,
    required: true,
  },
});

module.exports = songSchema;