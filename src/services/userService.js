const bcrypt = require('bcrypt');

const User = require('../models/UserModel');
const authService = require('./authService');

module.exports = {
  async create(name, username, password) {
    const user = await User.findOne({username});

    if(!!user) return { success: false, message: 'already registered user'};

    const hash = await bcrypt.hash(password, 10);

    await User.create({
      name,
      username,
      password: hash,
    });

    const { result } = await authService.create(username, password);

    return {
      success: true,
      message: 'user successfully created',
      result,
    };
  },

  async index() {
    const users = await User.find();

    return {
      success: true,
      message: 'Users successfully recovered',
      result: users,
    };
  },

  async show(id) {
    const user = await User.findById(id);

    return {
      success: true,
      message: 'User recovered successfully',
      result: user,
    };
  },

  async update(id, name, username) {
    await User.findByIdAndUpdate(id, {
      name,
      username,
    });

    return { success: true, message: 'User changed successfully'};
  },

  async delete(id) {
    await User.findByIdAndDelete(id);

    return { success: true, message: 'User deleted successfully'};
  },
};
