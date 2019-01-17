//var _ = require('lodash');
var $ = require('jquery');
var url = 'http://pokeapi.salestock.net/api/v2/pokemon/';
var defaultSrc = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
var updateBtn = $("#update-pkmn");

function GetBallIcon () {
  var rand = Math.floor((Math.random() * 10) + 1);
  if (rand == 10) {
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png';
  } else if (rand >= 8) {
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/ultra-ball.png';
  } else if (rand >= 5) {
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/great-ball.png';
  } else {
    return 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/poke-ball.png';
  }
}

function UpdateDisplay(text, src) {
  $("#pkmn-name").html(text);
  $("#pkmn-sprite").attr("src", src);
}

function UpdateLoading(id) {
  UpdateDisplay('Loading ID #' + id + '...', GetBallIcon());
  updateBtn.prop("disabled", true);
}

function UpdateLoaded(str, src) {
  UpdateDisplay(str, src);
  updateBtn.prop("disabled", false);
}

function UpdatePkmn() {
  // Display Loading message and disable button
  var pokemonId = $("#pkmn-id").val();
  UpdateLoading(pokemonId);

  // Get name from service
  var name = '';
  var sprite = GetBallIcon();
  var request = new XMLHttpRequest();
  request.open('GET', url + pokemonId, true);
  request.onload = function () {
    var data = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      name = data.name;
      sprite = data.sprites.front_default;
      // Capitalize first letter
      name = name.toLowerCase().replace(/\b[a-z]/g, function(letter) {
        return letter.toUpperCase();
      });
    } else {
      name = 'None Found';
    }

    // Display name and re-enable button
    msg = '#' + pokemonId + ': ' + name;
    UpdateLoaded(msg, sprite);
  };

  request.send();
}

updateBtn.click(UpdatePkmn);