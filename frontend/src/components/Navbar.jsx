import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useState } from 'react';

const Navbar = ({ userRole, setIsAuthenticated, setUserRole }) => {
    const navigate = useNavigate();
    const [watchedGames, setWatchedGames] = useState([]);

    const handleLogout = () => {
        // Clear the token and user role from localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        localStorage.removeItem('role');
        
        // Update the authentication state
        setIsAuthenticated(false);
        setUserRole(null);
        
        // Redirect to the login page
        navigate('/login');
    };

    return (
        <motion.nav
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="bg-gray-900 p-6 border-b-2 border-blue-500 shadow-lg shadow-blue-500/50 relative overflow-hidden"
        >
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-purple-500 glow-animation"></div>
            <div className="container mx-auto flex justify-between items-center">
                <motion.div
                    whileHover={{ scale: 1.05, textShadow: "0 0 8px #4299e1" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-block px-4 py-2 rounded-lg"
                >
                    <Link to="/" className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 whitespace-nowrap">
                        Joystick Junkyard
                    </Link>
                </motion.div>
                <div className="flex space-x-6 items-center">
                    {['Home', 'Profile', userRole === 'admin' ? 'Admin' : null].filter(Boolean).map((item) => (
                        <motion.div
                            key={item}
                            whileHover={{ scale: 1.05, textShadow: "0 0 8px #4299e1" }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-2"
                        >
                            <Link to={item === 'Home' ? '/' : `/${item.toLowerCase()}`} className="text-lg font-bold text-blue-400 hover:text-purple-400 transition-colors duration-300">
                                {item}
                            </Link>
                        </motion.div>
                    ))}
                    <motion.button
                        onClick={handleLogout}
                        whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(239, 68, 68, 0.5)" }}
                        className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 transition-colors duration-300"
                    >
                        Logout
                    </motion.button>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;

