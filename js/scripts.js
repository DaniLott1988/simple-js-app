let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';

    function add(pokemon) {
      if (
        typeof pokemon === "object" &&
        "name" in pokemon
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
      let pokeList = document.querySelector(".pokemon-list");
      let listPokemon = document.createElement("li");
      let button = document.createElement("button");
      button.innerText = pokemon.name;
      button.classList.add("button-class");
      listPokemon.appendChild(button);
      pokeList.appendChild(listPokemon);
      addEventListener(button, pokemon);
      button.addEventListener("click", function(event) {
        showDetails(pokemon);
      });
    }
    function addEventListener(button, pokemon) {
      button.addEventListener('click', function () {
        showDetails(pokemon.name);
      });
    };
    function showDetails(pokemon) {
      console.log(pokemon);
    };
    function loadList() {
      function showLoadingMessage() {
        ('I\'ll bring your Pokemon right back!').load;
      };
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
        function hideLoadingMessage() {
          ('I\'ll bring your Pokemon right back!').hide;
        };
      }).catch(function (e) {
        console.error(e);
        function hideLoadingMessage() {
          ('I\'ll bring your Pokemon right back!').hide;
        };
      })
    };
    function loadDetails(item) {
      function showLoadingMessage() {
        ('I\'ll bring your Pokemon right back!').load;
      };
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
        function hideLoadingMessage() {
          ('I\'ll bring your Pokemon right back!').hide;
        };
      }).catch(function (e) {
        console.error(e);
        function hideLoadingMessage() {
          ('I\'ll bring your Pokemon right back!').hide;
        };
      });
    };
    function showDetails(item) {
      pokemonRepository.loadDetails(item).then(function () {
        console.log(item);
      });
    };
    return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails
    };
  }
) ();
function loadDetails(item) {
  let url = item.detailsUrl;
  let container = document.getElementById('imageContainer');
  let docFrag = document.createDocumentFragment();
  item.detailsUrl.forEach(function(urlImg, index, pokemonRepository) {
    var img = document.createElement('img');
    img.src = urlImg;
    docFrag.appendChild(img);
    container.appendChild(docFrag);
  }
)};

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
