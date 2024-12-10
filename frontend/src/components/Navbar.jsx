import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Navbar = ({ userRole }) => {
    return (
        <motion.nav
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className="bg-gradient-to-r from-bluebright to-purpleroyal bg-opacity-60 p-6"
        >
            <div className="container mx-auto flex justify-between items-center">
                <motion.div
                    whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="inline-block px-4 py-4 rounded-lg"
                >
                    <Link to="/" className="text-xl font-bold text-white whitespace-nowrap">
                        Joystick Junkyard
                    </Link>
                </motion.div>
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex space-x-4 ml-auto">
                        <motion.div
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-3 rounded-lg"
                        >
                            <Link to="/" className="text-lg font-bold text-white">
                                Home
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-3 rounded-lg"
                        >
                            <Link to="/profile" className="text-lg font-bold text-white">
                                Profile
                            </Link>
                        </motion.div>
                        <motion.div
                            whileHover={{ scale: 1.05, boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.5)" }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="p-3 rounded-lg"
                        >
                            {userRole === 'admin' && (
                                <Link to="/admin" className="text-lg font-bold text-white">
                                    Admin
                                </Link>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;