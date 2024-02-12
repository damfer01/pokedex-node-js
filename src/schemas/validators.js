const {
    body,
  } = require("express-validator");
  
  const required = 'Campo obrigatório';
  const minLength = 'Senha deve conter ao menos 6 caracteres';
  const passwords = 'Senhas não coincidem';
  
  module.exports = {
    loginValidator: [
      body('username', required).not().isEmpty(),
      body('password', required).not().isEmpty(),
    ],
  
    registerValidator: [
      body('name', required).not().isEmpty(),
      body('username', required).not().isEmpty(),
      body('password', minLength).isLength({
        min: 6
      }),
      body('confirmPassword', minLength).isLength({
        min: 6
      }),
      body('confirmPassword', passwords).custom((value, { req }) => value === req.body.password),
    ],
  };