const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Hole = new Schema({
  name: { type: String },
  playerIds: { type: Array },
  hole: { type: Number },
  gameId: { type: String },
  created_at: { type: Date },
  finished_at: { type: Date }
});

module.exports = mongoose.model( 'Hole', Hole );
