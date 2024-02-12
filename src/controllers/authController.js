const authService = require('../services/authService');
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

  async login( req, res ) {
    try {
      const {
        username,
        password,
      } = req.body;

      const response = await authService.create( username, password );

      return res.json( response );
    } catch ( err ) {
      return res.json({ success: false, message: 'failed to login'});
    }
  },
};
