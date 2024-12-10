const mongoose = require('mongoose');

const gameSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    genre: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Game', gameSchema);
