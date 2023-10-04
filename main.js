const content = document.querySelector(".cards");

let pokemonData = [1, 2, 3, 4, 5] // connect array with cards

const fetchData = async () => {
    await // until 
  fetch("https://pokeapi.co/api/v2/pokemon?limit=121&offset=0")
    .then((response) => response.json())
    .then(data => 
       // one more fetch is inside the fetch
       {
        const fetches = data.results.map(item => {// go through each item
            return fetch(item.url).then(response => response.json()).then(data =>{
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
    pokemonCards();
    });
    });
};
// fetch is string only
// JSON is the object we gonna read
// response = we call this variable as we can
// .json = built-in method
const pokemonCards = () => {
    //to go through each of the pokemon
  const cardsP = pokemonData.map(pokemon => {
    return  `<div class="card">
    <img src="${pokemon.img}" alt="pokemon" class="image" />
    <div class="cardName">
      <h3>${pokemon.name}</h3>
    </div>
    </div>`
  }).join('')
  
  content.innerHTML = cardsP
};
fetchData();
// we call fetchData, get the response and call pokemonCards and send the data to our card

//1. pokemon.types is an array, you need to map it again
//2.connect input and search from pokeDex array by using the .filter() method