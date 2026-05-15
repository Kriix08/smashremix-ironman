// JS file for SSB Ironman setup and functionality
// Coded by Krix08 for https://kriix08.github.io/smashremix-ironman
// This code (probably) sucks. Would not advise learning from it :)

var characters = []
const all_characters = [ // List of available characters
  "MARIO",
  "LUIGI",
  "DK",
  "LINK",
  "SAMUS",
  "FALCON",
  "NESS",
  "YOSHI",
  "KIRBY",
  "FOX",
  "PIKACHU",
  "JIGGLYPUFF",
  "GANONDORF",
  "LINK_YOUNG",
  "FALCO",
  "DRM",
  "DSAMUS",
  "WARIO",
  "LUCAS",
  "BOWSER",
  "WOLF",
  "CONKER",
  "MEWTWO",
  "MARTH",
  "SONIC",
  "SHEIK",
  "MARINA",
  "DDD",
  "GOEMON",
  "BANJO",
  "PEACH",
  "CRASH",
  "LANKY",
  "ROY",
  "DRL",
  "PEPPY",
  "SLIPPY",
  "DKING",
  "EBI",
  "MARIO_METAL",
  "LUIGI_METAL",
  "MAD_PIANO",
  "BOWSER_GIANT",
  "SONIC_SUPER",
]

const off_characters = [ // List of off-by-default characters
  "PEPPY",
  "SLIPPY",
  "MARIO_METAL",
  "LUIGI_METAL",
  "BOWSER_GIANT",
  "SONIC_SUPER",
  "MAD_PIANO",
  "DKING",
  "EBI",
]

const presets = new Map()

presets.set("all", all_characters.slice())

presets.set("none", [])

presets.set("vanilla", [
  "MARIO",
  "LUIGI",
  "DK",
  "LINK",
  "SAMUS",
  "FALCON",
  "NESS",
  "YOSHI",
  "KIRBY",
  "FOX",
  "PIKACHU",
  "JIGGLYPUFF",
])

presets.set("remix", [
  "GANONDORF",
  "LINK_YOUNG",
  "FALCO",
  "DRM",
  "DSAMUS",
  "WARIO",
  "LUCAS",
  "BOWSER",
  "WOLF",
  "CONKER",
  "MEWTWO",
  "MARTH",
  "SONIC",
  "SHEIK",
  "MARINA",
  "DDD",
  "GOEMON",
  "BANJO",
  "PEACH",
  "CRASH",
  "LANKY",
  "ROY",
  "DRL",
])

presets.set("bonus", [
  "PEPPY",
  "SLIPPY",
  "MARIO_METAL",
  "LUIGI_METAL",
])

presets.set("bros", [
  "MARIO",
  "LUIGI",
  "DRM",
  "DRL",
  "MARIO_METAL",
  "LUIGI_METAL",
])

var character_elements = []   // Elements for all characters
var character_list = null     // Container for character selection
var randomized_list = null    // Container for randomized characters

const deactivate = "grayscale(75%) brightness(50%) hue-rotate(-30deg)"

function isInArray(element) {
  return this.indexOf(element) === -1
}

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var rand = Math.floor(Math.random() * (i + 1));
    var temp = array[rand]
    array[rand] = array[i]
    array[i] = temp
  }

  console.log("shuffle")
  return array
}

characters = all_characters.filter(isInArray, off_characters);
console.log(characters)

function addCharacter(list, char, toggleRandom) {
  list.insertAdjacentHTML("beforeend",
    `<div class="character-container">
      <input type="image" 
      class="character" 
      src="images/characters/${char}.png" 
      onclick="toggleCharacter(this, ${toggleRandom})">
    </div>`
  )
};

function addPreset(preset, name) {
  this.insertAdjacentHTML("beforebegin",
    `<input type="button" 
      class="button" 
      value="${name.toUpperCase()}" 
      onclick="applyPreset('${name}')">
    </input>`
  )
}

function applyPreset(preset) {
  // Remove all characters from selection list
  for (var i = character_elements.length - 1; i >= 0; i--) {
    character_elements[i].remove()
  }

  characters = presets.get(preset)

  // Add all characters to selection list
  for (var i=0; i<all_characters.length; i++) {
    addCharacter(character_list, all_characters[i], true) 
    character_elements.push(character_list.lastElementChild)

  //   // Deactivate if not included in preset
  //   if (!characters.includes(all_characters[i]))
  //     character_list.lastElementChild.style.filter=`${deactivate}`
  }
}

function toggleCharacter(char, affects_list) {
  var div = char.parentNode

  // Apply darkening to toggled characters
  if (div.style.filter == `${deactivate}`)
    div.style.filter='none'
	else
    div.style.filter=`${deactivate}`

  if (!affects_list) return

  var char_name = all_characters[character_elements.indexOf(div)]
  var char_index = characters.indexOf(char_name)

  // Index is -1 if toggled character isn't enabled already
  console.log(char_index)
  if (char_index < 0)
    characters.push(char_name)
  else
    characters.splice(char_index, 1)
  
  console.log(`${char_name} Toggled (IDX: ${char_index})`, characters)
};

function randomizeCharacters() {
  // var current_characters = characters.slice()
  // console.log(current_characters, characters)
  shuffleArray(characters)

  // Remove and then re-add characters
  while (randomized_list.lastChild) {
    randomized_list.removeChild(randomized_list.lastChild);
  }

  for (var i=0; i<characters.length; i++) {
    addCharacter(randomized_list, characters[i], false) 
  }
};

// Do stuff on DOM load
document.addEventListener("DOMContentLoaded", function() {
  character_list = document.querySelector(".character-list")
  randomized_list = document.querySelector(".randomized-list")

  // Add all characters to selection list
  for (var i=0; i<all_characters.length; i++) {
    addCharacter(character_list, all_characters[i], true) 
    character_elements.push(character_list.lastElementChild)

    // Deactivate if not included in default roster
    if (!characters.includes(all_characters[i]))
      character_list.lastElementChild.style.filter=`${deactivate}`
  }
  console.log("Characters added", character_elements)

  // Add all presets after "Presets:" text 
  var preset_list = document.querySelector("#presets-list")
  presets.forEach(addPreset, preset_list)

  // Add "?" in empty results slot
  addCharacter(randomized_list, "NONE", false)
});