const content = document.querySelector(".cards");
const searchValue = document.querySelector("#pokemonSearch");
const generationAmountBtn = document.querySelectorAll(".btn");
const generationValue = document.querySelector("#generationValue");

let pokemonData = [] // connect array with cards
const generations = [];
const fetchData = async () => {
    await // until 
  fetch("https://pokeapi.co/api/v2/pokemon?limit=121&offset=0")
    .then((response) => response.json())
    .then((data) => 
       // one more fetch is inside the fetch
       {
        const fetches = data.results.map((result) => {// go through each result
          // chaining promises
            return fetch(result.url)
            .then((response) => response.json())
            .then(data => {
              console.log(result.url);
              console.log(data);
                return {
                    id: data.id,
                    name: data.name,
                    img: data.sprites.other['official-artwork'].front_default,
                    types: data.types,
                    height: data.height,
                    weight: data.weight,
                };
                });
        });
Promise.all(fetches).then((response) => { // it waits all until conditions (fetches) are done
    pokemonData = response;
    pokemonCards('');
    });
    });
};
// fetch is string only
// JSON is the object we gonna read
// response = we call this variable as we want
// .json = built-in method
//1. pokemon.types is an array, we need to map it again. Pokemon.types - array that contains objects.
const pokemonCards = (searchString) => { // parameter is needed here
    //to go through each of the pokemon
  const cardsP = pokemonData.filter((pokemon) => {
    return pokemon.name.toLowerCase().includes(searchString);
})
.map((pokemon) => {
  const pokemonTypes = pokemon.types.map((item) => {
    return `<span> ${item.type.name}  </span>`
    ;
  });
    return  `<div class="card">
    <p class="id">#${pokemon.id}</p>
    <img src="${pokemon.img}" alt="${pokemon.name}"/>
   
      <h3 class="cardName">${pokemon.name}</h3>
      <div>
     <span class="typeName">${pokemonTypes.join('')}</span>
    <p class="dimensions">
    <span>Height: ${(pokemon.height / 10).toFixed(1)} m</span>
    <span>Weight: ${(pokemon.weight / 10).toFixed(1)} kg</span>
    </p>
    </div>
    </div>`;
  }).join('')
  console.log(searchString);
  content.innerHTML = cardsP
};
fetchData();
//2.connect input and search from pokeDex array by using the .filter() method 
searchValue.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  pokemonCards(searchString);
});
// Display the amount of Pokemons in the generation.
// add new url for generations
const generation = async (generation) => {
  await // until  
fetch(`https:pokeapi.co/api/v2/generation/${generation}/`)
  .then((response) => response.json())
  .then((data) => 
     {
      let numbPokemonsGen = data.pokemon_species.length;
      generationValue.innerHTML = `The amount is: ${numbPokemonsGen}`;

      const fetches = data.pokemon_species.map((result) => {
        // chaining promises
          return fetch(`https:pokeapi.co/api/v2/pokemon/${result.name}/`).then((response) => response.json()).then(data => {
              return {
                id: data.id,
                name: data.name,
                img: data.sprites.other['official-artwork'].front_default,
                types: data.types,
                height: data.height,
                weight: data.weight,
                };
              });
      });
      Promise.all(fetches).then((response) => { // it waits all conditions (fetches) are done
        pokemonData = response;
        pokemonCards('');
        });
        });
    };
      const amountInGeneration = () => {
        generationAmountBtn.forEach((button) =>
        button.addEventListener('click', () => {
          let gen = button.getAttribute("data-generation");
          generation(gen);
        })
      )};
      amountInGeneration();
    