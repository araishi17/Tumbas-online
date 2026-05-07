const User = require('../models/User');
const Profile = require('../models/Profile');
const Shop = require('../models/Shop');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
exports.register = async (req, res) => {
  try {
    const { email, password, username, fullName, phoneNumber } = req.body;

    // Validate input
    if (!email || !password || !username || !fullName) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields',
      });
    }

    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User already exists',
      });
    }

    // Create user
    user = await User.create({
      email,
      password,
      username,
      fullName,
      phoneNumber,
    });

    // Create profile
    await Profile.create({
      userId: user._id,
    });

    const token = generateToken(user._id, user.role);

    res.status(201).json({
      success: true,
      message: 'User registered successfully',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and password',
      });
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials',
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
        fullName: user.fullName,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const profile = await Profile.findOne({ userId: req.user.id });

    res.status(200).json({
      success: true,
      user,
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update user profile
// @route   PUT /api/auth/profile
// @access  Private
exports.updateProfile = async (req, res) => {
  try {
    const { fullName, phoneNumber, profilePicture } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        fullName,
        phoneNumber,
        profilePicture,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update KTP data
// @route   PUT /api/auth/profile/ktp
// @access  Private
exports.updateKTP = async (req, res) => {
  try {
    const { ktpNumber, ktpImage, birthDate, gender } = req.body;

    if (!ktpNumber || !ktpImage) {
      return res.status(400).json({
        success: false,
        message: 'KTP number and image are required',
      });
    }

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      {
        ktpNumber,
        ktpImage,
        birthDate,
        gender,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'KTP data updated successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Update address
// @route   PUT /api/auth/profile/address
// @access  Private
exports.updateAddress = async (req, res) => {
  try {
    const { street, city, province, postalCode } = req.body;

    if (!street || !city || !province || !postalCode) {
      return res.status(400).json({
        success: false,
        message: 'All address fields are required',
      });
    }

    const profile = await Profile.findOneAndUpdate(
      { userId: req.user.id },
      {
        address: {
          street,
          city,
          province,
          postalCode,
        },
      },
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      success: true,
      message: 'Address updated successfully',
      profile,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Upgrade user to seller
// @route   POST /api/auth/upgrade-to-seller
// @access  Private
exports.upgradeToSeller = async (req, res) => {
  try {
    const { shopName, category, phoneNumber, address } = req.body;

    if (!shopName || !category || !phoneNumber) {
      return res.status(400).json({
        success: false,
        message: 'Shop name, category, and phone number are required',
      });
    }

    // Update user role
    const user = await User.findByIdAndUpdate(
      req.user.id,
      { role: 'seller' },
      { new: true }
    );

    // Create shop
    const shop = await Shop.create({
      userId: req.user.id,
      shopName,
      category,
      phoneNumber,
      address,
    });

    res.status(200).json({
      success: true,
      message: 'User upgraded to seller successfully',
      user,
      shop,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// @desc    Change password
// @route   PUT /api/auth/change-password
// @access  Private
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required',
      });
    }

    const user = await User.findById(req.user.id).select('+password');

    // Check current password
    const isMatch = await user.matchPassword(currentPassword);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect',
      });
    }

    user.password = newPassword;
    await user.save();

    res.status(200).json({
      success: true,
      message: 'Password changed successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
