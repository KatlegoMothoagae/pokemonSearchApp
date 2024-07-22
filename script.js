let validPokemon;
let searchPokemonName;
let pokemonData;
let input = document.getElementById("search-input");

// fetch data for a pokemon
// console.log(validPokemon);

async function showPokemon(){

    findPokemonByName(input.value);
    setTimeout(function () {
        if(pokemonData === undefined){
            alert("boooo")
            return;
        }
        let nameAndId = document.getElementById("pokemon-name-id");
        nameAndId.innerText = pokemonData.name.toUpperCase() + "  #" +pokemonData.id;
        console.log(nameAndId.innerText);
    }, 1000)
}

// fetch data from the pokeapi
fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
    .then(response => response.json())
    .then((pokemon) => {validPokemon = pokemon})

function findPokemonByName(name){
    name = name.toLowerCase();
    for(let i = 0; i < validPokemon.results.length; i++) {
        if(name === (validPokemon.results[i].name)){
            fetch(validPokemon.results[i].url)
                .then((response => response.json()))
                .then(pokemonDataJson => {pokemonData = pokemonDataJson})
        }else {
            pokemonData = undefined;
        }
    }
    return pokemonData;
}

