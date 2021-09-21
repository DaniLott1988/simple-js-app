let pokemonRepository = (function () {
    let pokemonList = [
      {
        name:"Bulbasaur",
        type:[
          'grass',
          'poison'
        ],
        height:0.7
      },
      {
        name:"Ivysaur",
        type:[
          'grass',
          'poison'
        ],
        height:1.0
      },
      {
        name:"Venusaur",
        type:[
          'grass',
          'poison'
        ],
        height:2.0
      },
      {
        name:"Charmander",
        type:"fire",
        height:0.6
      },
      {
        name:"Charmeleon",
        type:"fire",
        height:1.1
      },
      {
        name:"Charizard",
        type:[
          'fire',
          'flying'
        ],
        height:1.7
      },
      {
        name:"Squirtle",
        type:"water",
        height:0.5
      },
      {
        name:"Wartortle",
        type:"water",
        height:1
      },
      {
        name:"Blastoise",
        type:"water",
        height:1.6
      }
    ];

    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon &&
        "type" in pokemon &&
        "height" in pokemon
      ) {
        pokemonList.push(pokemon);
      } else {
        console.log("Hey, that's not a Pokemon!");
      }
    };

    function getAll() {
      return pokemonList;
    }

    function addListItem(pokemon) {
      let pokemonNa = pokemon.name
      let pokeList = document.querySelector(".pokemon-list");
      let listPokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemonNa;
      button.classList.add("button-class");
      listPokemon.appendChild(button);
      pokeList.appendChild(listPokemon);
    }

    return {
    getAll: getAll,
    add: add,
    addListItem: addListItem
    };
  }
) ();

console.log(pokemonRepository.getAll());
pokemonRepository.add({name:"Pikachu",type:"electric",height:0.3});

pokemonRepository.getAll().forEach(
  function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  }
);
