const content = document.querySelector(".cards");
const searchValue = document.querySelector("#pokemonSearch");
console.log(searchValue.value);
/*
const filteredCharacters = hpCharacters.filter(character => {
    return (
      character.name.includes(searchString)
    );
  }); */
let pokemonData = [] // connect array with cards

const fetchData = async () => {
    await // until 
  fetch("https://pokeapi.co/api/v2/pokemon?limit=121&offset=0")
    .then((response) => response.json())
    .then((data) => 
       // one more fetch is inside the fetch
       {
        const fetches = data.results.map((item) => {// go through each item
          // chaining promises
            return fetch(item.url).then((response) => response.json()).then(data => {
                return {
                    id: data.id,
                    name: data.name,
                    img: data.sprites.other['official-artwork'].front_default,
                    types: data.types,
                };
                });
        });
Promise.all(fetches).then((response) => { // it waits all conditions (fetches) are done
    pokemonData = response;
    console.log(response);
    pokemonCards('');
    });
    });
};
// fetch is string only
// JSON is the object we gonna read
// response = we call this variable as we can
// .json = built-in method

//1. pokemon.types is an array, you need to map it again. Pokemon.types - array that contains objects.
const pokemonCards = (searchString) => { // parameter is needed here
    //to go through each of the pokemon
  const cardsP = pokemonData.filter((pokemon) => {return pokemon.name.toLowerCase().includes(searchString);
})
.map((pokemon) => {
    return  `<div class="card">
    <p class="id">#${pokemon.id}</p>
    <img src="${pokemon.img}" alt="${pokemon.name}"/>
    <div class="cardName">
      <h3>${pokemon.name}</h3>
      <div>
    <p>${pokemon.types.map((type) => getType(type)).join('')}</p>
    </div>
    </div>
    </div>`;
  }).join('')
  console.log(searchString);
  content.innerHTML = cardsP
  
};
  const getType = (type) => {
return `<p>${type.type.name}</p>`;
  }
fetchData();
//2.connect input and search from pokeDex array by using the .filter() method 

searchValue.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  pokemonCards(searchString);
});
