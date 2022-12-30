const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from likedArtists.js
const artistSchema = require('./likedArtists');

// import schema from likedSongs.js
// const songSchema = require('./likedSongs');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedArtists to be an array of data that adheres to the artistSchema
    savedArtists: [artistSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `artistCount` with the number of saved artists we have
userSchema.virtual('artistCount').get(function () {
  return this.savedArtists.length;
});

const User = model('User', userSchema);

module.exports = User;
