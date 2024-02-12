const UserService = require('../services/userService');

module.exports = {
  async create( req, res ) {
    try {
      const {
        name,
        username,
        password,
      } = req.body;

      const response = await UserService.create(name, username, password);

      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: 'Failed to create user'});
    }
  },

  async index( req, res ) {
    try {
      const response = await UserService.index();

      return res.json( response );
    } catch ( err ) {
      return res.json({ success: false, message: 'Failed to retrieve users'});
    }
  },

  async show( req, res ) {
    try {
      const {
        id,
      } = req.params;

      const response = await UserService.show(id);

      return res.json( response );
    } catch ( err ) {
      return res.json({ success: false, message: 'Failed to retrieve user'});
    }
  },

  async update( req, res ) {
    try {
      const {
        id,
      } = req.params;

      const {
        name,
        username,
      } = req.body;

      const response = await UserService.update(id, name, username);

      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.json({ success: false, message: 'Failed to change user'});
    }
  },

  async delete( req, res ) {
    try {
      const {
        id,
      } = req.params;

      const response = await UserService.delete(id);

      return res.json( response );
    } catch ( err ) {
      return res.json({ success: false, message: 'Failed to delete user'});
    }
  },
};
