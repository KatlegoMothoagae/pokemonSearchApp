let validPokemon;
let searchPokemonName;
let pokemonData;
let input = document.getElementById("search-input");
let statElements = [
    document.getElementById("hp"),
    document.getElementById("attack"),
    document.getElementById("defense"),
    document.getElementById("sp-attack"),
    document.getElementById("sp-defense"),
    document.getElementById("speed")]
// fetch data for a pokemon
// console.log(validPokemon);

async function showPokemon(){

    findPokemonByName(input.value);
    setTimeout(function () {
        if(pokemonData === undefined){
            alert("boooo")
            return;
        }
        let name = document.getElementById("pokemon-name");
        let id = document.getElementById("pokemon-id");
        let weight = document.getElementById("weight");
        let height = document.getElementById("height");

        name.textContent = pokemonData.name.toUpperCase();
        id.textContent = pokemonData.id;

        weight.textContent = "Weight: " +pokemonData.weight;
        height.textContent = "Height: " + pokemonData.height;

        setImage(pokemonData)
        setStats(pokemonData);
        setTypes(pokemonData);
        // console.log(nameAndId.innerText);
    }, 1000)
}

// fetch data from the pokeapi
fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon")
    .then(response => response.json())
    .then((pokemon) => {validPokemon = pokemon})

function findPokemonByName(name){
    name = name.toLowerCase();
    for(let i = 0; i < validPokemon.results.length; i++) {
        if(name === (validPokemon.results[i].name) || Number(name) === Number(validPokemon.results[i].id)){
            fetch(validPokemon.results[i].url)
                .then((response => response.json()))
                .then(pokemonDataJson => {pokemonData = pokemonDataJson})
        }else {
            pokemonData = undefined;
        }
    }
    return pokemonData;
}

function setStats(data){
    for(let i = 0; i < 6; i++){
        let indexStr = i+"";
        statElements[i].innerText = data.stats[indexStr].base_stat
    }
}

function setTypes(data){
    let types = data.types;
    let typeContainer = document.getElementById("type-container");

    for(let key in types){
        let child = document.createElement("div");
        child.className = "type";
        child.id = data.types[key].type.name;
        // console.log(child.id);
        setType(child, data.types[key].type.name);
        typeContainer.appendChild(child);
    }
}

function setImage(data){
    let imgContainer = document.getElementById("pokemonImg");
    let img = document.createElement("img");
    img.src = data.sprites.front_default;
    imgContainer.appendChild(img);
}

function setType(element, type){
    let typeAndColor = {
        "flying": "#8899ff",
        "fire": "#ff6f52",
        "poison": "#9995d0",
        "dragon": "#9e93f1",
        "bug": "#aabb23",
        "ice": "#66ccfe",
        "ground": "#dfba52",
        "rock": "#baaa66",
        "water": "#42a1ff",
        "electric": "#fecc33",
        "steel": "#abaabb",
        "grass": "#78cc55"
    }

    element.textContent = type;
    element.style.backgroundColor = typeAndColor[type];
}