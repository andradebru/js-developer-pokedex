const pokemonList = document.getElementById('pokemonList');

function convertPokemonToLi(pokemon) {
  return `
  <li class="pokemon ${pokemon.type}" >
    <span class="number">#${pokemon.id}</span>
    <span class="name">${pokemon.name}</span>

    <div class="detail">
      <ol class="types ${pokemon.type}">
        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
      </ol>

      <img
        src="${pokemon.pic}"
        alt="${pokemon.name}"
      />
    </div>
  </li>
  `
}

pokeApi.getPokemons().then((pokemons = []) => {
  pokemonList.innerHTML += pokemons.map(convertPokemonToLi).join('');
});
