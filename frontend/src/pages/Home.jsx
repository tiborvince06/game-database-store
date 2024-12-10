import { useState, useEffect } from 'react';
import axios from 'axios';
import GameCard from '../components/Gamecard';
import Navbar from '../components/Navbar';

const Home = () => {
  const [games, setGames] = useState([]);
  

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


  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 p-16">
        <h1 className="text-5xl tracking-widest font-bold mb-8 justify-self-center bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-500">Joystick Junkyard</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard key={game._id} game={game}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;