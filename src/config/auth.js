const jwt = require('jsonwebtoken');

module.exports = {
  async generateToken( id ) {
    return jwt.sign({id}, '1a45818e77bc815a455f3737992d37bb', {
      expiresIn: '1h',
    });
  },

  async authenticate( req, res, next ) {
    try {
      const authHeader = req.headers.authorization;

      if( !authHeader ) return res.status(401).json({ success: false, message: 'no tokens reported'});

      const parts = authHeader.split(' ');

      if( !parts.length === 2 ) return res.json({ success: false, message: 'token error'});

      const [ scheme, token ] = parts;

      if( !/^Bearer$/i.test( scheme )) return res.json({ success: false, message: 'token format is invalid'});

      jwt.verify( token, '1a45818e77bc815a455f3737992d37bb', ( error, decoded ) => {
        if( error ) return res.json({ success: false, message: 'invalid token'});

        req.user_id = decoded.id;

        return next();
      });
    } catch ( err ) {
      return next(err);
    }
  },
};
