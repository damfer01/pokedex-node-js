const { Schema, model } = require('mongoose');

const CatchSchema = new Schema({
  codUser: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },

  codPokemon: {
    type: Number,
    required: true,
  },
});

module.exports = model('Catch', CatchSchema );
