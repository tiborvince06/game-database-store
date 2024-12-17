import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Joystick, Sword, Swords, Gamepad, Gamepad2 } from "lucide-react";

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [floatingIcons, setFloatingIcons] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const generateFloatingIcons = () => {
      const positions = Array.from({ length: 80 }, (_, i) => ({
        x: Math.random() * 100, // Random x position
        y: Math.random() * 100, // Random y position
      }));

      return positions.map((pos, i) => ({
        icon: [Joystick, Sword, Swords, Gamepad, Gamepad2][i % 5],
        initialX: pos.x,
        initialY: pos.y,
        duration: 5 + (i * 0.01), // Decrease duration for faster movement
        delay: -1 * (i * 0.5), // Decrease delay for faster appearance
      }));
    };

    setFloatingIcons(generateFloatingIcons());
  }, []); // Empty dependency array means this runs once on mount

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/auth/register', { name, email, password });
      toast.success('Registration successful! Please log in.', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setTimeout(() => navigate('/login'), 5000);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.response && error.response.status === 409) {
        toast.error('Email already in use. Please use a different email.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.error('Registration failed. Please try again.', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {floatingIcons.map((item, index) => (
          <motion.div
            key={index}
            className="absolute opacity-50 pointer-events-none"
            initial={{ x: `${item.initialX}vw`, y: `${item.initialY}vh` }}
            animate={{
              x: [`${item.initialX}vw`, `${(item.initialX + 50) % 100}vw`],
              y: [`${item.initialY}vh`, `${(item.initialY + 50) % 100}vh`],
            }}
            transition={{
              duration: item.duration,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              delay: item.delay,
            }}
          >
            <item.icon className="w-8 h-8 text-blue-300" />
          </motion.div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 opacity-20"></div>
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{
            backgroundPosition: ["0% 0%", "100% 100%"],
          }}
          transition={{
            duration: 20,
 ease: "linear",
            repeat: Infinity,
            repeatType: "reverse",
          }}
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')",
            backgroundSize: "60px 60px",
          }}
        />
      </div>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-96 border-2 border-purple-500 z-10"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-blue-300 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-blue-300 text-sm font-bold mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-blue-300 text-sm font-bold mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 border border-purple-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
              required
            />
          </div>
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(159, 122, 234, 0.5)" }}
            className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-colors duration-300"
          >
            Register
          </motion.button>
        </form>
        <div className="mt-4 text-center">
          <Link to="/login" className="text-purple-400 hover:text-blue-400 transition-colors duration-300">
            Already have an account? Login here
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;