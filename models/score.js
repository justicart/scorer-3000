const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Score = new Schema({
  score: { type: Number },
  playerId: { type: String },
  holeId: { type: String },
  gameId: { type: String },
});

module.exports = mongoose.model( 'Score', Score );
