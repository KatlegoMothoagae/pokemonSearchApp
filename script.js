let validPokemon;
let searchPokemonName;
let pokemonData = [];
let input = document.getElementById("search-input");
let statElements = [
    document.getElementById("hp"),
    document.getElementById("attack"),
    document.getElementById("defense"),
    document.getElementById("special-attack"),
    document.getElementById("special-defense"),
    document.getElementById("speed")]

async function showPokemon(){
    clearScreen()
    findPokemonByName(input.value);

    setTimeout(function () {
        let name = document.getElementById("pokemon-name");
        let id = document.getElementById("pokemon-id");
        let weight = document.getElementById("weight");
        let height = document.getElementById("height");
        if(pokemonData.length === 0){
            return;
        }
        name.textContent = pokemonData.name.toUpperCase();
        id.textContent = pokemonData.id;

        weight.textContent = "Weight: " +pokemonData.weight;
        height.textContent = "Height: " + pokemonData.height;

        setImage(pokemonData)
        setStats(pokemonData);
        setTypes(pokemonData);
    }, 1000)
}

// fetch data from the pokeapi


function findPokemonByName(name){
    try {
        name = name.toLowerCase();
        fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${name}`)
            .then(response => {
                if (!response.ok) {
                    alert("Pokémon not found");
                    clearScreen();
                    //throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((pokemon) => {pokemonData = pokemon}).catch((err) =>
        console.log(err));
    }catch(err){
        console.log("WABALABA");
        alert("Could not find pokemon data!!!!!");
    }
    // name = name.toLowerCase();
    // for(let i = 0; i < validPokemon.results.length; i++) {
    //     if(name === (validPokemon.results[i].name) || Number(name) === Number(validPokemon.results[i].id)){
    //         fetch(validPokemon.results[i].url)
    //             .then((response => response.json()))
    //             .then(pokemonDataJson => {pokemonData = pokemonDataJson})
    //     }else {
    //         pokemonData = undefined;
    //     }
    // }
    // return pokemonData;
}

function setStats(data){
    for(let i = 0; i < 6; i++){
        let indexStr = i+"";
        statElements[i].innerText = data.stats[indexStr].base_stat
    }
}

function setTypes(data){
    let types = data.types;
    let typeContainer = document.getElementById("types");

    for(let key in types){
        let child = document.createElement("div");
        child.className = "type";
        child.id = data.types[key].type.name;
        setType(child, data.types[key].type.name);
        typeContainer.appendChild(child);
    }
}

function setImage(data){
    let imgContainer = document.getElementById("pokemonImg");
    let img = document.createElement("img");
    img.src = data.sprites.front_default;
    img.id = "sprite";
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

function clearScreen(){
    let typeContainer = document.getElementById("types");
    removeAllChildren(typeContainer);
    let imgContainer = document.getElementById("pokemonImg");
    removeAllChildren(imgContainer);
}

function removeAllChildren(element){
    while (element.lastElementChild) {
        element.removeChild(element.lastElementChild);
    }
}