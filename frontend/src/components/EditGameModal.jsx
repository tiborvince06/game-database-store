import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const EditGameModal = ({ isOpen, onClose, onSave, game, gameGenres }) => {
  const [editedGame, setEditedGame] = useState(game || {
    title: '',
    description: '',
    price: 0,
    genre: '',
  });

  useEffect(() => {
    if (game) {
      setEditedGame(game);
    }
  }, [game]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedGame({ ...editedGame, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedGame);
  };

  if (!game) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-96 border-2 border-blue-500"
          >
            <h2 className="text-2xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Edit Game</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="title" className="block text-blue-300 text-sm font-bold mb-2">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={editedGame.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-blue-300 text-sm font-bold mb-2">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={editedGame.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  required
                ></textarea>
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-blue-300 text-sm font-bold mb-2">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={editedGame.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  required
                />
              </div>
              <div className="mb-6">
                <label htmlFor="genre" className="block text-blue-300 text-sm font-bold mb-2">
                  Genre
                </label>
                <select
                  id="genre"
                  name="genre"
                  value={editedGame.genre}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 bg-gray-700 border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-white"
                  required
                >
                  <option value="" disabled>
                    Select a genre
                  </option>
                  {gameGenres.map((genre) => (
                    <option key={genre} value={genre}>
                      {genre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex justify-between">
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)" }}
                  className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                >
                  Save Changes
                </motion.button>
                <motion.button
                  type="button"
                  onClick={onClose}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)" }}
                  className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default EditGameModal;
