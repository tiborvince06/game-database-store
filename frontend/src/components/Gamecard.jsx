import { motion } from 'framer-motion';

const GameCard = ({ game }) => {
    // Construct the image URL based on the game title
    const formatTitleForImage = (title) => {
        return title
            .toLowerCase() // Convert to lowercase
            .replace(/[:\s]+/g, '-') // Replace spaces and colons with hyphens
            .replace(/--+/g, '-') // Replace multiple hyphens with a single hyphen
            .replace(/'/g, ''); // Remove apostrophes if any
    };

    const imageUrl = `/images/${formatTitleForImage(game.title)}.jpg`;

    return (
        <motion.div
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(66, 153, 225, 0.5)" }}
            className="bg-gray-900 border-2 border-blue-500 rounded-lg shadow-lg shadow-blue-500/30 p-6 flex flex-col justify-between"
            style={{ 
                aspectRatio: '1 / 1',
                background: 'linear-gradient(45deg, #1a202c 0%, #2d3748 100%)'
            }}
        >
            <div>
                {/* Add the image element here */}
                <img 
                    src={imageUrl} 
                    alt={game.title} 
                    className="w-full h-48 object-cover rounded-md mb-4" 
                />
                <h3 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-bold mb-4">{game.title}</h3>
                <p className="text-blue-200 mb-2 line-clamp-3">{game.description}</p>
            </div>
            <div>
                <p className="text-lg text-purple-400 font-semibold mb-2">Price: ${game.price}</p>
                <p className="text-lg text-blue-300 mb-4">Genre: {game.genre}</p>
            </div>
        </motion.div>
    );
};

export default GameCard;