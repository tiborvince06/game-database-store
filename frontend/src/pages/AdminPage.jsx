import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import EditGameModal from '../components/EditGameModal';

const AdminPage = () => {
  const gameGenres = [
    "Action",
    "Adventure",
    "RPG",
    "Strategy",
    "Sports",
    "Racing",
    "Shooter",
    "Puzzle",
  ];
  const [users, setUsers] = useState([]);
  const [games, setGames] = useState([]);
  const [newGame, setNewGame] = useState({
    title: '',
    description: '',
    price: '',
    genre: '',
  });
  const [editingGame, setEditingGame] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const gameCardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (index) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: index * 0.2,
        duration: 0.5,
      },
    }),
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    const fetchGames = async () => {
      try {
        const response = await axios.get('/api/games', {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setGames(response.data);
      } catch (error) {
        console.error('Error fetching games:', error);
      }
    };

    fetchUsers();
    fetchGames();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewGame({ ...newGame, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/games', newGame, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setGames([...games, response.data]);
      setNewGame({ title: '', description: '', price: '', genre: '' });
      alert('Game created successfully!');
    } catch (error) {
      console.error('Error saving game:', error);
    }
  };

  const handleEdit = (game) => {
    setEditingGame(game);
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = async (editedGame) => {
    try {
      await axios.put(`/api/games/${editedGame._id}`, editedGame, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      setGames(games.map(game => game._id === editedGame._id ? editedGame : game));
      setIsEditModalOpen(false);
      setEditingGame(null);
      alert('Game updated successfully!');
    } catch (error) {
      console.error('Error updating game:', error);
    }
  };

  const handleDelete = async (gameId) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        await axios.delete(`/api/games/${gameId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        setGames(games.filter(game => game._id !== gameId));
        alert('Game deleted successfully!');
      } catch (error) {
        console.error('Error deleting game:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-blue-200 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">Admin Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 bg-opacity-90 rounded-lg shadow-lg w-full max-w-2xl mx-auto border-2 border-blue-500 relative z-10 shadow-lg shadow-blue-500/50"
      >
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Users</h2>
          <ul className="bg-gray-800 shadow-lg shadow-blue-500/30 rounded-lg divide-y divide-blue-500/30">
            {users.map((user) => (
              <li key={user._id} className="p-4">
                <p className="font-semibold text-blue-300">{user.name}</p>
                <p className="text-blue-200">{user.email}</p>
                <p className="text-purple-400">Role: {user.role}</p>
              </li>
            ))}
          </ul>
        </motion.div>
        <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 bg-opacity-90 rounded-lg shadow-lg w-full h-fit max-w-2xl mx-auto border-2 border-blue-500 relative z-10 shadow-lg shadow-blue-500/50"
      >
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Create New Game</h2>
          <form onSubmit={handleSubmit} className="flex flex-col items-center text-center">
            <div className="mb-4 w-[60%]">
              <label htmlFor="title" className="block text-blue-300 text-sm font-bold mb-2">
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={newGame.title}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 text-center border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-blue-200"
                required
              />
            </div>
            <div className="mb-4 w-[60%]">
              <label htmlFor="description" className="block text-blue-300 text-sm font-bold mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={newGame.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 text-center border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-blue-200"
                required
              ></textarea>
            </div>
            <div className="mb-4 w-[60%]">
              <label htmlFor="price" className="block text-blue-300 text-sm font-bold mb-2">
                Price
              </label>
              <input
                type="number"
                id="price"
                name="price"
                value={newGame.price}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 text-center border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-blue-200"
                required
              />
            </div>
            <div className="mb-6 w-[60%]">
              <label htmlFor="genre" className="block text-blue-300 text-sm font-bold mb-2">
                Genre
              </label>
              <select
                id="genre"
                name="genre"
                value={newGame.genre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 bg-gray-700 text-center border border-blue-500 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 text-blue-200"
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
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)" }}
              className="w-32 bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300"
            >
              Create Game
            </motion.button>
          </form>
        </motion.div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 mt-16 p-8 bg-opacity-90 rounded-lg shadow-lg w-full max-w-[90vw] mx-auto border-2 border-blue-500 relative z-10 shadow-lg shadow-blue-500/50"
      >
        <h2 className="text-2xl font-semibold mb-4 text-purple-400">Games</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
            <motion.div
              key={game._id}
              variants={gameCardVariants}
              initial="hidden"
              animate="visible"
              custom={index} // Pass the index to the variants
              className="bg-gray-900 border-2 border-blue-500 rounded-lg shadow-lg shadow-blue-500/30 p-6 flex flex-col justify-between"
              style={{
                aspectRatio: '3 / 1',
                background: 'linear-gradient(45deg, #1a202c 0%, #2d3748 100%)'
              }}
            >
              <h3 className="text-xl font-semibold text-blue-300 mb-2">{game.title}</h3>
              <p className="text-blue-200 mb-2">{game.description}</p>
              <p className="text-purple-400 mb-2">Price: ${game.price}</p>
              <p className="text-blue-200 mb-4">Genre: {game.genre}</p>
              <div className="flex justify-between">
                <motion.button
                  onClick={() => handleEdit(game)}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)" }}
                  className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
                >
                  Edit
                </motion.button>
                <motion.button
                  onClick={() => handleDelete(game._id)}
                  whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)" }}
                  className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
      <EditGameModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        game={editingGame}
        gameGenres={gameGenres}
      />
    </div>
  );
};

export default AdminPage;

