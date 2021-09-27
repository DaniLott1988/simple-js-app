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

    function showLoadingMessage() {
      let loadingMessage = document.querySelector('#loading-message');
      window.addEventListener('load', function(){
        loadingMessage.style.visibility = 'visible';
      });
    }

    function hideLoadingMessage() {
      let loadingMessage = document.querySelector('#loading-message');
      setTimeout(function(){
        loadingMessage.style.visibility = 'hidden';
      }, 500);

    }

    function addEventListener(button, pokemon) {
      button.addEventListener('click', function (event) {
        showDetails(pokemon);
      });
    };
    function loadList() {
      showLoadingMessage();
      return fetch(apiUrl).then(function (response) {
        return response.json();
      }).then(function (json) {
        hideLoadingMessage();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      }).catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      })
    };
    function loadDetails(item) {
      showLoadingMessage();
      let url = item.detailsUrl;
      return fetch(url).then(function (response) {
        hideLoadingMessage();
        return response.json();
      }).then(function (details) {
        // Now we add the details to the item
        item.imageUrlF = details.sprites.front_default;
        item.imageUrlB = details.sprites.back_default;
        item.height = details.height;
        item.type = [];
        for (let i = 0; i < details.types.lenght; i++) {
          item.types.push(details.types[i].type.name);
        }
        item.abilities = [];
        for (let i = 0; i < details.abilities.lenght; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
      }).catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
    }

      window.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      });

      function hideModal() {
        modalContainer.classList.remove('is-visible');
        if (dialogPromiseReject) {
          dialogPromiseReject();
          dialogPromiseReject = null;
        }
      };

      function showDetails(pokemon) {
        loadDetails(pokemon).then(function (){
        function showModal (pokemon) {
          let modalBody = $(".modal-body");
          let modalTitle = $(".modal-title");
          let modalHeader = $(".modal-header");
          //clear the content after use to be ready for the next
          modalTitle.empty();
          modalBody.empty();

          let nameElement = $("<h1>" + item.name + "</h1>");
          let imageElementF = $('<img class="modal-img" style="width:50%">');
          imageElementF.attr("scr", item.imageUrlF);
          let imageElementB = $('<img class="modal-img" style="width:50%">');
          imageElementF.attr("scr", item.imageUrlB);
          let heightElement = $("<p>" + "Height: " + item.height + " dm" + "</p>");
          let weightElement = $("<p>" + "Weight: " + item.weight + " kg" + "</p>");
          let typesElement = $("<p>" + "Types: " + item.types + "</p>");
          let abilitiesElement = $("<p>" + "Abilities: " + item.abilities + "</p>");

          modalTitle.appendChild(nameElement);
          modalBody.appendChild(imageElementF);
          modalBody.appendChild(imageElementB);
          modalBody.appendChild(heightElement);
          modalBody.appendChild(weightElement);
          modalBody.appendChild(typesElement);
          modalBody.appendChild(abilitiesElement);

    return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal,
    hideModal: hideModal,
    showLoadingMessage: showLoadingMessage,
    hideLoadingMessage: hideLoadingMessage
    };
  } ();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
