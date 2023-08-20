const pokeApi = {};

function PokeApiDetailsToPokemon(pokeDetails) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetails.name;
    pokemon.id = pokeDetails.order;

    const types = pokeDetails.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.pic = pokeDetails.sprites.other.dream_world.front_default;
    
    return pokemon;
}

pokeApi.getPokemonDetails = (pokemon) => 
    fetch(pokemon.url)
    .then((response) => response.json())
    .then(PokeApiDetailsToPokemon);

pokeApi.getPokemons = (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?${offset}&${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.log(error))
        .finally(() => console.log('requisicao concluida'));
}