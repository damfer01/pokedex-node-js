const axios = require('axios');
const pokeApi = require('../apis/pokeApi');

module.exports = {
  async index(page, perPage) {
    // response.data.result
    const { data: { results }} = await pokeApi.get('/pokemon', {
      params: {
        limit: perPage,
        offset: perPage * ( page - 1 ),
      },
    });

    let allPokemon = [];

    await axios.all( results.map( async ({ url }) => {
      const id = url.split('/pokemon/')[1].replace('/', '');

      const { result } = await this.show(id);

      allPokemon.push( result );
    }));

    allPokemon = allPokemon.sort(( firstPokemon, secondPokemon ) => firstPokemon.id - secondPokemon.id );

    return { success: true, message: 'Success', results: allPokemon };
  },

  async show(id) {
    const pokemon = {};

    const {
      data,
    } = await pokeApi.get(`/pokemon/${id}`);

    pokemon.id = data.id;
    pokemon.imageUrl = data.sprites.other["official-artwork"].front_default;

    const stats = {
      hp: data.stats.find(( stat ) => stat.stat.name === 'hp'),
      speed: data.stats.find(( stat ) => stat.stat.name === 'speed'),
      attack: data.stats.find(( stat ) => stat.stat.name === 'attack'),
      defense: data.stats.find(( stat ) => stat.stat.name === 'defense'),
      specialAttack: data.stats.find(( stat ) => stat.stat.name === 'special-attack'),
      specialDefense: data.stats.find(( stat ) => stat.stat.name === 'special-defense'),
    };

    pokemon.stats = [
      {
        name: 'HP',
        value: stats.hp.base_stat,
      },
      {
        name: 'SPEED',
        value: stats.speed.base_stat,
      },
      {
        name: 'ATTACK',
        value: stats.attack.base_stat,
      },
      {
        name: 'DEFENSE',
        value: stats.defense.base_stat,
      },
      {
        name: 'SPECIAL ATTACK',
        value: stats.specialAttack.base_stat,
      },
      {
        name: 'SPECIAL DEFENSE',
        value: stats.specialDefense.base_stat,
      },
    ];

    pokemon.types = [];

    await axios.all( data.types.map( async ( type ) => await pokeApi.get(`/type/${ type.type.name }`).then(({ data }) => {
      const _type = data.names.find(( name ) => name.language.name === 'en');

      pokemon.types.push({
        slot: type.slot,
        name: _type.name,
      });
    })));

    pokemon.types = pokemon.types.sort(( firstType, secondType ) => firstType.slot - secondType.slot );

    await pokeApi.get(`/pokemon-species/${ data.name }`).then(({ data }) => {
      const name = data.names.find(( name ) => name.language.name === 'en');

      pokemon.name = name.name;
    });

    pokemon.abilities = await axios.all( data.abilities.filter(( ability ) => !ability.is_hidden ).map( async ( ability ) => await axios.get( ability.ability.url ).then( async ({ data }) => {
      const currentAbility = data.names.find(( name ) => name.language.name === 'en');

      return {
        id: ability.slot,
        name: currentAbility.name,
      };
    })));

    pokemon.hiddenAbilities = await axios.all( data.abilities.filter(( ability ) => ability.is_hidden ).map( async ( ability ) => await axios.get( ability.ability.url ).then( async ({ data }) => {
      const currentAbility = data.names.find(( name ) => name.language.name === 'en');

      return {
        id: ability.slot,
        name: currentAbility.name,
      };
    })));

    return { success: true, message: 'Success', result: pokemon};
  },
};
