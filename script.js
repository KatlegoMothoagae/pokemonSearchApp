let validPokemon;
let searchPokemonName;
fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
    .then(response => response.json())
    .then((pokemon) => {validPokemon = pokemon})
console.log(validPokemon);

function showPokemon(){
    console.log(validPokemon.results[0].name);
    console.log(validPokemon.results[0].url);
    for(let i = 0; i < validPokemon.results.length; i++) {

    }
}