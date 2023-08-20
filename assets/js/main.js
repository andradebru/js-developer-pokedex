const pokemonList = document.getElementById('pokemonList');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const limit = 12;
let offset = 0;

function loadPokemons(offset, limit) {
  pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
    const newHtml = pokemons.map((pokemon) => `
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
      `).join('')
    pokemonList.innerHTML += newHtml;
  });
};

loadPokemons(offset, limit);

loadMoreBtn.addEventListener('click', () => {
  offset += limit;
  loadPokemons(offset, limit);
})