const{Schema , model, SchemaType } = require('mongoose');

const PokemonSchema = new Schema({
   codUser: {
    type:Schema.Types.ObjectId,
    ref:'User'
   },
   
   codPokemon:{
    type: Number,
        required:true,
   },
});

module.exports = model('User' , PokemonSchema);