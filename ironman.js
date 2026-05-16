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
  "DK_GIANT",
  "BOWSER_GIGA",
  "SONIC_SUPER",
]

const off_characters = [ // List of off-by-default characters
  "LANKY",
  "ROY",
  "DRL",
  "PEPPY",
  "SLIPPY",
  "MARIO_METAL",
  "LUIGI_METAL",
  "DK_GIANT",
  "BOWSER_GIGA",
  "SONIC_SUPER",
  "MAD_PIANO",
  "DKING",
  "EBI",
]

const presets = new Map()

presets.set("all", all_characters.slice())

presets.set("none", [])

presets.set("default", [
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
])

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
])

presets.set("bonus", [
  "LANKY",
  "ROY",
  "DRL",
  "PEPPY",
  "SLIPPY",
])

presets.set("boss", [
  "PEPPY",
  "SLIPPY",
  "DKING",
  "EBI",
  "MARIO_METAL",
  "LUIGI_METAL",
  "MAD_PIANO",
  "DK_GIANT",
  "BOWSER_GIGA",
  "SONIC_SUPER",
])

presets.set("bros", [
  "MARIO",
  "LUIGI",
  "DRM",
  "DRL",
  "MARIO_METAL",
  "LUIGI_METAL",
])

presets.set("starfox", [
  "FOX",
  "WOLF",
  "PEPPY",
  "SLIPPY",
  "FALCO",
])

presets.set("antagonists", [
  "GANONDORF",
  "DSAMUS",
  "WARIO",
  "BOWSER",
  "WOLF",
  "MEWTWO",
  "DDD",
  "MAD_PIANO",
])

var character_elements = []   // Elements for all characters
var character_list = null     // Container for character selection

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

function addCharacter(list, char, toggleRandom) {
  list.insertAdjacentHTML("beforeend",
    `<div class="character-container">
      <input type="image" 
      class="character" 
      src="images/characters/${char}.png" 
      draggable="false" 
      onclick="toggleCharacter(this, ${toggleRandom})">
    </div>`
  )
}

function addPreset(preset, name) {
  this.insertAdjacentHTML("beforebegin",
    `<input type="button"
      class="button"
      value="${name.toUpperCase()}"
      onclick="applyPreset('${name}')"></input>`
  )
}

function savePreset() {
  presets.set("load", characters.slice())
  console.log("Save LOAD preset:", presets.get("load"))
}

function applyPreset(preset) {
  var preset_characters = presets.get(preset).slice()
  var char_index = characters.indexOf(char_name)
  console.log("Loaded preset:", preset, preset_characters)

  // Turn off all characters
  for (var i=0; i<character_elements.length; i++) {
    character_elements[i].style.filter=`${deactivate}`
  }

  // Re-activate if character is in preset
  for (var i=0; i<all_characters.length; i++) {
    var char_name = all_characters[character_elements.indexOf(character_elements[i])]
    if (preset_characters.includes(char_name))
      character_elements[i].style.filter=``
  }

  characters = preset_characters
}

function toggleCharacter(char, affects_list) {
  var div = char.parentNode

  // Apply darkening to toggled characters
  if (div.style.filter == `${deactivate}`)
    div.style=''
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

function randomizeCharacters(player) {
  // var current_characters = characters.slice()
  // console.log(current_characters, characters)
  shuffleArray(characters)

  var list = document.querySelector(`#random-${player}`)

  // Remove and then re-add characters
  while (list.lastChild) {
    list.removeChild(list.lastChild);
  }

  for (var i=0; i<characters.length; i++) {
    addCharacter(list, characters[i], false) 
  }
};

// Do stuff on DOM load
document.addEventListener("DOMContentLoaded", function() {
  character_list = document.querySelector(".character-list")

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
  presets.set("load", [])

  // Add "?" in empty results slots
  addCharacter(document.querySelector(`#random-p1`), "NONE", false)
  addCharacter(document.querySelector("#random-p2"), "NONE", false)
});