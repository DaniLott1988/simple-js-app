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
      if (item = '{name:"", type:"", height:}') {
        pokemonList.push(item);
      } else {
        return false;
      }
    };
    function getAll() {
      return pokemonList;
    }
    return {
    getAll: getAll,
    add: add,
    };
  }
) ();

let item = '{name:"Caterpie", type:"Bug", height:0.3}'

pokemonRepository.getAll().forEach(function (pokemon) {
    let pokemonNa = pokemon.name
    let pokemonHe = pokemon.height
    let text1 = '(Height: ';
    let text2 = ' - Woa! You found a big one!'
//start of the conditional with if, a condition must be met in order to obtain the result A
    if (pokemonHe >= 1.9) {
      document.write(
        '<p>' + pokemonNa + ' ' + text1 + pokemonHe + ')' + text2 + '</p>'
    );
//if the conditional "if" is not met, it will result in the else condition being fulfilled in this case
    } else {
      document.write(
        '<p>' + pokemonNa + ' ' + text1 + pokemonHe + ')' + '</p>'
      );
    }
  }
)
