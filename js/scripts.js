let pokemonRepository = (function() {
  let pokemonList = [];
  let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=151';
  function add(pokemon) {
    if (typeof pokemon === 'object' && 'name' in pokemon) {
      pokemonList.push(pokemon);
    }
  }
  function getAll() {
    return pokemonList;
  }

  function addListItem(pokemon) {
    let pokeList = document.querySelector('.pokemon-list');
    let listPokemon = document.createElement('li');
    let button = document.createElement('button');
    button.innerText = pokemon.name;
    button.classList.add('button-class');
    listPokemon.appendChild(button);
    pokeList.appendChild(listPokemon);
    addEventListener(button, pokemon);
    button.setAttribute('data-target', '#modal-container');
    button.setAttribute('data-toggle', 'modal');

    button.addEventListener('click', function() {
      showDetails(pokemon);
    });
  }

  function showLoadingMessage() {
    document.querySelector('.loading-message').classList.add('visible');
  }

  function hideLoadingMessage() {
    document.querySelector('.loading-message').classList.add('hidden');
  }

  function loadList() {
    showLoadingMessage();
    return fetch(apiUrl)
      .then(function(response) {
        return response.json();
      })
      .then(function(json) {
        hideLoadingMessage();
        json.results.forEach(function(item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url
          };
          add(pokemon);
        });
      })
      .catch(function(e) {
        hideLoadingMessage();
        /* eslint-disable no-console */
        console.error(e);
        /* eslint-enable no-console */
      });
  }

  function showDetails(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function() {
      showModal(pokemon);
    });
  }

  function loadDetails(item) {
    showLoadingMessage();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function(response) {
        hideLoadingMessage();
        return response.json();
      })
      .then(function(details) {
        // Now we add the details to the item
        item.imageUrlF = details.sprites.front_default;
        item.imageUrlB = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.type = [];
        for (let i = 0; i < details.types.lenght; i++) {
          item.types.push(details.types[i].type.name);
        }
        item.abilities = [];
        for (let i = 0; i < details.abilities.lenght; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
      })
      .catch(function(e) {
        hideLoadingMessage();
        /* eslint-disable no-console */
        console.error(e);
      /* eslint-enable no-console */
      });
  }

  /* eslint-env jquery */
  function showModal(pokemon) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    //clear the content after use to be ready for the next
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + pokemon.name + '</h1>');
    let imageElementF = $('<img class="modal-img" style="width:50%">');
    imageElementF.attr('scr', pokemon.imageUrlF);
    let imageElementB = $('<img class="modal-img" style="width:50%">');
    imageElementF.attr('scr', pokemon.imageUrlB);
    let heightElement = $('<p>' + 'Height: ' + pokemon.height + ' dm' + '</p>');
    let weightElement = $('<p>' + 'Weight: ' + pokemon.weight + ' kg' + '</p>');
    let typesElement = $('<p>' + 'Types: ' + pokemon.types + '</p>');
    let abilitiesElement = $('<p>' + 'Abilities: ' + pokemon.abilities + '</p>');

    modalTitle.append(nameElement);
    modalBody.append(imageElementF);
    modalBody.append(imageElementB);
    modalBody.append(heightElement);
    modalBody.append(weightElement);
    modalBody.append(typesElement);
    modalBody.append(abilitiesElement);
  }

  return {
    getAll: getAll,
    add: add,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showDetails: showDetails,
    showModal: showModal
  };
})();

function search() {
  let seachTask = document.querySelector('#form1');

  searchTask.addEventListener('input', function() {
    let listPokemon = document.querySelectorAll('li');
    let value = searchTask.value.toUpperCase();

    listPokemon.forEach(function(pokemon) {
      if (pokemon.innerText.toUpperCase().indexOf(value) > -1) {
        pokemon.style.display = ' ';
      } else {
        pokemon.style.display = 'none';
      }
    });
  });
}

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
