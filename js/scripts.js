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

for (let i = 0; i < pokemonList.length; i++) {
  let pokemonNa = pokemonList[i].name;
  let pokemonHe = pokemonList[i].height;
  if (pokemonHe >= 1.9) {
    document.write(
      '<p>' + pokemonNa + ' ' + '(Height: ' + pokemonHe + ')' + "Woa! You found a big one!" + '</p>'
    );
  } else {
    document.write(
      '<p>' + pokemonNa + ' ' + '(Height: ' + pokemonHe + ')' + '</p>'
    );
  }
}
