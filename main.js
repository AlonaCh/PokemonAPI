const content = document.querySelector(".cards");
const searchValue = document.querySelector("#pokemonSearch");


let pokemonData = [] // connect array with cards

const fetchData = async () => {
    await // until 
  fetch("https://pokeapi.co/api/v2/pokemon?limit=121&offset=0")
    .then((response) => response.json())
    .then((data) => 
       // one more fetch is inside the fetch
       {
        const fetches = data.results.map((result) => {// go through each item
          // chaining promises
            return fetch(result.url).then((response) => response.json()).then(data => {
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
    <span>Height: ${pokemon.height} m</span>
    <span>Weight: ${pokemon.weight} kg</span>
    </p>
    </div>
    </div>`;
  }).join('')
  console.log(searchString);
  content.innerHTML = cardsP
}
;
  
fetchData();
//2.connect input and search from pokeDex array by using the .filter() method 

searchValue.addEventListener("keyup", (e) => {
  const searchString = e.target.value.toLowerCase();
  pokemonCards(searchString);
});



