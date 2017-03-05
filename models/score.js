const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hole = new Schema({
  name: { type: String },
  playerId: { type: String },
  holeId: { type: Number },
  gameId: { type: String },
});

module.exports = mongoose.model( 'Hole', Hole );
