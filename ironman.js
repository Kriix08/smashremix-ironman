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

presets.set("goofballs", [
  "LUIGI",
  "DK",
  "LINK",
  "SAMUS",
  "NESS",
  "GANONDORF",
  "MEWTWO",
  "MARINA",
  "PEACH",
  "LANKY",
])

presets.set("krix's picks", [
  "JIGGLYPUFF",
  "LINK",
  "SAMUS",
  "NESS",
  "LUCAS",
  "DRM",
  "DDD",
  "MEWTWO",
  "PEACH",
  "CRASH",
])

presets.set("1up's list", [
  "LUIGI",
  "DK",
  "KIRBY",
  "JIGGLYPUFF",
  "DRM",
  "WARIO",
  "CONKER",
  "DDD",
  "PEACH",
  "ROY",
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

  return array
}

const clamp = (num, min, max) => Math.min(Math.max(num, min), max)

characters = all_characters.filter(isInArray, off_characters);

function addCharacter(list, char, toggleRandom) {
  list.insertAdjacentHTML("beforeend",
    `<div class="character-container">
      <picture>
        <source srcset="images/characters/${char}.webp" type="image/webp">
        <img class="character"
        src="images/characters/${char}.png"
        draggable="false"
        alt="${char}"
        onclick="toggleCharacter(this, ${toggleRandom})">
      </picture>
    </div>`
  )
}

function addPreset(preset, name) {
  this.insertAdjacentHTML("beforebegin",
    `<input type="button"
      class="button"
      value="${name.toUpperCase()}"
      onclick="applyPreset(\`${name}\`)">`
  )
}

// Save currently selected characters into LOAD preset
function savePreset() {
  presets.set("load", characters.slice())
  console.log("Save LOAD preset:", presets.get("load"))
}

// Apply preset based on name
function applyPreset(preset) {
  var preset_characters = presets.get(preset).slice()
  var char_index = characters.indexOf(char_name)
  console.log("Loaded preset:", preset, preset_characters)

  // Turn off all chars
  for (var i=0; i<character_elements.length; i++) {
    character_elements[i].style.filter=`${deactivate}`
  }

  // Re-activate if char is in preset
  for (var i=0; i<all_characters.length; i++) {
    var char_name = all_characters[character_elements.indexOf(character_elements[i])]

    if (preset_characters.includes(char_name))
      character_elements[i].style.filter=``
  }

  // Set actual selected chars to preset chars
  characters = preset_characters
}

function incrementValue(text, increment, min, max) {
  var para = document.querySelector(`${text}`)
  var value = parseInt(para.innerText)
  var updValue = clamp(value + increment, min, max)

  para.innerText = updValue
  return updValue
}

function updatePlayerCount(increment) {
  var count = incrementValue('.selector-value', increment, 1, 4)

  for (var i=4; i>=count; i--) {
    var player = document.getElementById(`random-p${i}`)
    if (i == count) {
      player.style=''
    } else {
      player.style='display:none'
    }
  }
}

function toggleCharacter(char, affects_list) {
  var div = char.parentNode.parentNode

  // Apply darkening to toggled char
  if (div.style.filter == `${deactivate}`)
    div.style=''
  else
    div.style.filter=`${deactivate}`

  if (!affects_list) return

  var char_name = all_characters[character_elements.indexOf(div)]
  var char_index = characters.indexOf(char_name)

  // Index is -1 if char isn't enabled already
  console.log(char_index)
  if (char_index < 0)
    characters.push(char_name)
  else
    characters.splice(char_index, 1)
};

function randomizeCharacters(player) {
  shuffleArray(characters)

  var list = document.getElementById(`random-list-${player}`)

  // Remove and then re-add chars
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

  // Add all chars to selection list
  for (var i=0; i<all_characters.length; i++) {
    addCharacter(character_list, all_characters[i], true) 
    character_elements.push(character_list.lastElementChild)

    // Deactivate if not included in default roster
    if (!characters.includes(all_characters[i]))
      character_list.lastElementChild.style.filter=`${deactivate}`
  }

  // Add all presets after "Presets:" text 
  var preset_list = document.querySelector("#presets-list")
  presets.forEach(addPreset, preset_list)
  presets.set("load", [])
});