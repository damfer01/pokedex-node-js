const bcrypt = require('bcrypt');

const User = require('../models/UserModel');
const { generateToken } = require('../config/auth');

module.exports = {
  async create(username, password) {
    const user = await User.findOne({ username }).select('+password');

    if(!user) return { success: false, message: 'invalid credentials'};

    const checkPass = await bcrypt.compare( password, user.password );

    if( !checkPass ) return { success: false, message: 'invalid credentials'};

    const token = await generateToken( user._id );

    return {
      success: true,
      message: 'login successfully',
      result: {
        name: user.name,
        token,
      },
    };
  },
};
