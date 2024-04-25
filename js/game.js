let canvas;
let world;
let keyboard = new Keyboard();

function init() {
    canvas = document.getElementById(`canvas`);
    world = new World(canvas, keyboard);

    console.log('My Charckter is', world.character);

    // character.src = `../img/2_character_pepe/2_walk/W-21.png`;

    // setTimeout(function() {
    //     ctx.drawImage(character, 20, 20, 50, 150);
    // }, 2000);
}

window.addEventListener("keydown", (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if(e.keyCode == 38) {
        keyboard.UP = true;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    console.log(e);
    console.log(keyboard);
});

window.addEventListener("keyup", (e) => {
    if(e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if(e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if(e.keyCode == 38) {
        keyboard.UP = false;
    }

    if(e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if(e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    console.log(e);
    console.log(keyboard);
});