const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Game = new Schema({
  name: { type: String },
  playerIds: { type: Array },
  holes: { type: Number },
  playedHoles: { type: Array },
  date: { type: Date },
});

module.exports = mongoose.model( 'Game', Game );
