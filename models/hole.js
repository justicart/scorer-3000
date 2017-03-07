const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hole = new Schema({
  name: { type: String },
  playerIds: { type: Array },
  hole: { type: Number },
  gameId: { type: String },
  date: { type: Date }
});

module.exports = mongoose.model( 'Hole', Hole );
