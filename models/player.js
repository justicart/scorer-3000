const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Player = new Schema({
  name: { type: String },
  image: { type: String }
});

module.exports = mongoose.model( 'Player', Player );
