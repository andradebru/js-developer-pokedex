const pokeApi = {};

function PokeApiDetailsToPokemon(pokeDetails) {
    const pokemon = new Pokemon()
    pokemon.name = pokeDetails.name;
    pokemon.id = pokeDetails.id;

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

pokeApi.getPokemons = (offset = 0, limit = 5) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`

    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetails))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonsDetails) => pokemonsDetails)
        .catch((error) => console.log(error))
        .finally(() => console.log('requisicao concluida'));
}