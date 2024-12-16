import { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/Gamecard';
import Navbar from '../components/Navbar';
import GameDetailModal from '../components/GameDetailModal';

const Home = () => {
  const [games, setGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
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

    fetchGames();
  }, []);

  const handleGameClick = (game) => {
    setSelectedGame(game);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedGame(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <div className="flex-1 p-8 md:p-16">
        <h1 className="text-5xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 tracking-wider">
          Joystick Junkyard
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 hover:cursor-pointer">
          {games.map((game) => (
            <div key={game.id} onClick={() => handleGameClick(game)}>
              <GameCard game={game} />
            </div>
          ))}
        </div>
      </div>

      <GameDetailModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        game={selectedGame}
      />
    </div>
  );
};

export default Home;