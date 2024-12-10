const express = require('express');
const Game = require('../models/Game');
const verifyToken = require('../middleware/authMiddleware.js');
const router = express.Router();


router.get('/', async (req, res) => {
  try {
    const games = await Game.find();
    res.json(games || []);
  } catch (error) {
    console.error('Error fetching games:', error);
    res.status(500).json({ error: 'Failed to fetch games' });
  }
});

router.post('/', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can add games' });
    }

    const { title, description, price, genre } = req.body;

    if (!title || !description || !price || !genre) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const game = new Game({ title, description, price, genre });
    const savedGame = await game.save();
    console.log('Game saved:', savedGame);
    res.status(201).json(savedGame);
  } catch (error) {
    console.error('Error saving game:', error);
    res.status(500).json({ error: 'Failed to create game' });
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can update games' });
    }

    const { title, description, price, genre } = req.body;

    const updatedGame = await Game.findByIdAndUpdate(
      req.params.id,
      { title, description, price, genre },
      { new: true, runValidators: true }
    );

    if (!updatedGame) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json(updatedGame);
  } catch (error) {
    console.error('Error updating game:', error);
    res.status(500).json({ error: 'Failed to update game' });
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Only admins can delete games' });
    }

    const deletedGame = await Game.findByIdAndDelete(req.params.id);
    if (!deletedGame) {
      return res.status(404).json({ error: 'Game not found' });
    }

    res.json({ message: 'Game deleted successfully' });
  } catch (error) {
    console.error('Error deleting game:', error);
    res.status(500).json({ error: 'Failed to delete game' });
  }
});

module.exports = router;
