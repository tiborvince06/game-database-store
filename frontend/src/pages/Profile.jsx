import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [recentActivity, setRecentActivity] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        
        const userData = response.data;
        setUser(userData);
        setRecentActivity(userData.recentActivity || []);
        setFavorites(userData.favorites || []);
        
        console.log('Fetched user data:', userData);
      } catch (error) {
        console.error('Error fetching user profile:', error);
        setError('Failed to load user profile. Please try again later.');
      }
    };
  
    fetchUserProfile();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.put('/api/profile', 
        { name: newName, email: newEmail },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      setError('Failed to update profile. Please try again.');
    }
  };

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-2xl text-red-400">{error}</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-2xl text-blue-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-2xl mx-auto border-2 border-blue-500"
      >
        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">User Profile</h1>
        <div className="flex items-center mb-6">
          <img
            src={`https://ui-avatars.com/api/?name=${user.name}&background=random`}
            alt="User Avatar"
            className="w-20 h-20 rounded-full mr-4 border-2 border-purple-500"
          />
          <div>
            {isEditing ? (
              <>
                <input
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  className="bg-gray-700 text-blue-300 p-2 rounded mb-2 w-full"
                  placeholder="New name"
                />
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="bg-gray-700 text-blue-300 p-2 rounded mb-2 w-full"
                  placeholder="New email"
                />
              </>
            ) : (
              <>
                <h2 className="text-2xl font-semibold text-blue-300">{user.name}</h2>
                <p className="text-purple-400">{user.email}</p>
              </>
            )}
            <p className="text-blue-200 mb-4">Role: <span className="text-purple-400 font-semibold">{user.role}</span></p>
          </div>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Recent Activity</h2>
          <ul className="bg-gray-700 rounded-lg divide-y divide-blue-500/30">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity, index) => (
                <li key={index} className="p-4 text-blue-200">{activity.description}</li>
              ))
            ) : (
              <li className="p-4 text-blue-200">No recent activity.</li>
            )}
          </ul>
        </div>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-purple-400 mb-2">Favorites</h2>
          <ul className="bg-gray-700 rounded-lg divide-y divide-blue-500/30">
            {favorites.length > 0 ? (
              favorites.map((game, index) => (
                <li key={index} className="p-4 text-blue-200">{game.title}</li>
              ))
            ) : (
              <li className="p-4 text-blue-200">No favorites added.</li>
            )}
          </ul>
        </div>
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(66, 153, 225, 0.5)" }}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-300"
          onClick={() => {
            if (isEditing) {
              handleUpdateProfile();
            } else {
              setNewName(user.name);
              setNewEmail(user.email);
              setIsEditing(true);
            }
          }}
        >
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Profile;

