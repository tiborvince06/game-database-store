import axios from 'axios';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const GameCard = ({ game }) => {

    const handleLike = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`/api/games/${game._id}/like`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
            });
    
            if (response.status === 200) {
                setIsLiked(!isLiked);
                onLike(game._id);
            } else {
                console.error('Unexpected response:', response);
            }
        } catch (error) {
            console.error('Error liking game:', error.response ? error.response.data : error.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-purpleroyal border-bluebright border-4 rounded-lg shadow-md p-4"
            style={{ aspectRatio: '1 / 1' }}
        >
            <h3 className="text-3xl text-white font-bold mb-8 justify-self-center">{game.title}</h3>
            <p className="text-xl text-white mb-2">{game.description}</p>
            <p className="text-xl text-white font-semibold mb-2">Price: ${game.price}</p>
            <p className="text-xl text-white mb-4">Genre: {game.genre}</p>
        </motion.div>
    );
};

export default GameCard;





