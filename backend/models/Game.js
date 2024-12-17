const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  genre: String,
});

module.exports = mongoose.model('Game', gameSchema);