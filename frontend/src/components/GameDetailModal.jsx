import { motion, AnimatePresence } from 'framer-motion';
import React, { useEffect } from 'react';
import axios from 'axios';

const GameDetailModal = ({ isOpen, onClose, game }) => {
    useEffect(() => {
        if (isOpen && game) {
          const addToWatchedGames = async () => {
            try {
              await axios.post('/api/games/watched', { gameId: game._id }, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
              });
            } catch (error) {
              console.error('Error adding game to watched list:', error);
            }
          };
          addToWatchedGames();
        }
      }, [isOpen, game]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-md flex items-center justify-center z-50"
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="bg-gray-800 p-4 rounded-lg shadow-lg shadow-blue-500/30 border-4 border-blue-500 max-w-[90vw] max-h-[90vh] overflow-auto"
                    >
                        <img 
                            src={`/images/${game.title.toLowerCase().replace(/[:\s]+/g, '-').replace(/--+/g, '-')}.jpg`} 
                            alt={game.title} 
                            className="w-full h-auto max-h-[70vh] object-contain rounded-md mb-4 border-2 border-blue-500"
                        />
                        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">{game.title}</h2>
                        <p className="text-lg text-blue-200 mb-2 break-words">{game.description}</p>
                        <p className="text-xl text-purple-400 font-semibold mb-2">Price: ${game.price}</p>
                        <p className="text-lg text-blue-300 mb-4">Genre: {game.genre}</p>
                        <button 
                            onClick={onClose} 
                            className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
                        >
                            Close
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GameDetailModal;