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
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.type = details.types;
      }).catch(function (e) {
        hideLoadingMessage();
        console.error(e);
      });
    }
    function showDetails(pokemon) {
      loadDetails(pokemon).then(function (){
        showModal(pokemon)
      });
    };
      let modalContainer = document.querySelector('#modal-container');
      let dialogPromiseReject;
      function showModal (pokemon) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = pokemon.name;

        let contentElement = document.createElement('p')
        contentElement.innerText = 'Height: ' + pokemon.height + 'dm '

        let imageElement =  document.createElement('img');
        imageElement.setAttribute('src', pokemon.imageUrl);
        imageElement.setAttribute('alt', pokemon.name);

        modal.appendChild(closeButtonElement);
        modal.appendChild(imageElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
      }

      function hideModal() {
        modalContainer.classList.remove('is-visible');
        if (dialogPromiseReject) {
          dialogPromiseReject();
          dialogPromiseReject = null;
        }
      }
      window.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
          hideModal();
        }
      })
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
  }
) ();

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
  });
});
