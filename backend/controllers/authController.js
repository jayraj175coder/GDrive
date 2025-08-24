const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        
        // Check if user already exists
        let user = await User.findOne({ $or: [{ email }, { username }] });
        if (user) {
            return res.status(400).json({ 
                success: false,
                message: 'User with this email or username already exists' 
            });
        }

        // Create new user - password will be hashed by the pre-save hook
        user = new User({ username, email, password });
        await user.save();

        // Create and return JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '5d' },
            (err, token) => {
                if (err) {
                    console.error('JWT Error:', err);
                    return res.status(500).json({ 
                        success: false, 
                        message: 'Error generating token' 
                    });
                }
                res.json({ 
                    success: true,
                    token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            }
        );
    } catch (err) {
        console.error('Registration Error:', err);
        // Handle validation errors
        if (err.name === 'ValidationError') {
            const messages = Object.values(err.errors).map(val => val.message);
            return res.status(400).json({ 
                success: false, 
                message: 'Validation error',
                errors: messages 
            });
        }
        res.status(500).json({ 
            success: false, 
            message: 'Server error during registration' 
        });
    }
};

// Login user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email }).select('+password');
        if (!user) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        // Validate password using the model method
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        // Create and return JWT
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET || 'your_jwt_secret',
            { expiresIn: '5d' },
            (err, token) => {
                if (err) {
                    console.error('JWT Error:', err);
                    return res.status(500).json({ 
                        success: false, 
                        message: 'Error generating token' 
                    });
                }
                res.json({ 
                    success: true,
                    token,
                    user: {
                        id: user._id,
                        username: user.username,
                        email: user.email
                    }
                });
            }
        );
    } catch (err) {
        console.error('Login Error:', err);
        res.status(500).json({ 
            success: false, 
            message: 'Server error during login' 
        });
    }
};

// Get current user
const getCurrentUser = async (req, res) => {
  try {
    // The user is already attached to the request by the auth middleware
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports = {
    register,
    login,
    getCurrentUser
};