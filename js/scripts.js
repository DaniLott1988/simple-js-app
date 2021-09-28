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
    loadDetails(pokemon).then(function() {
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
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.weight = details.weight;
        item.types = [];
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
  function showModal(item) {
    let modalBody = $('.modal-body');
    let modalTitle = $('.modal-title');
    //clear the content after use to be ready for the next
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $('<h1>' + item.name + '</h1>');
    let imageElementF = $('<img class="modal-img" style="width:50%">');
    imageElementF.attr('scr', item.imageUrlFront);
    let imageElementB = $('<img class="modal-img" style="width:50%">');
    imageElementF.attr('scr', item.imageUrlBack);
    let heightElement = $('<p>' + 'Height: ' + item.height + ' dm' + '</p>');
    let weightElement = $('<p>' + 'Weight: ' + item.weight + ' kg' + '</p>');
    let typesElement = $('<p>' + 'Types: ' + item.types +  '</p>');
    let abilitiesElement = $('<p>' + 'Abilities: ' + item.abilities + '</p>');

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

$(document).ready(function() {
        $('#form1').on('keyup', function() {
          let value = $(this).val().toLowerCase();
          $('.pokemon-list *').filter(function() {
            $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
          });
        });
      });

pokemonRepository.loadList().then(function() {
  pokemonRepository.getAll().forEach(function(pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

let backbutton= document.getElementById('bck-to-top');
window.onscroll = function() {
 scrollFunction();
};
function scrollFunction() {
 if (
   document.body.scrollTop > 200 ||
   document.documentElement.scrollTop > 200
 ) {
  backbutton.style.display = 'block';
 } else {
  backbutton.style.display = 'none';
 }
}
// When the user clicks on the button, go to the top of the page
backbutton.addEventListener('click', backToTop);

function backToTop() {
 document.body.scrollTop = 0;
 document.documentElement.scrollTop = 0;
}
