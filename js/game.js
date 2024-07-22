let canvas;
let world;
let keyboard = new Keyboard();
let startscreen;

function init() {
    setTimeout(function() {
        canvas = document.getElementById(`canvas`);
        startscreen = document.getElementById(`start_screen`);
        startscreen.classList.add('d-none');
        canvas.classList.add('d-block');
        world = new World(canvas, keyboard);
    }, 1000); // 2000 Millisekunden = 2 Sekunden
}

function exit() {
    if (world) {
        world = null; // Das World-Objekt entfernen
        canvas.classList.remove('d-block');
        startscreen.classList.remove('d-none');
    }
}

function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

window.addEventListener("keydown", (e) => {
    // console.log(e.keyCode);
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

    if(e.keyCode == 68) {
        keyboard.D = true;
    }

    if(e.keyCode == 87) {
        keyboard.W = true;
    }
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

    if(e.keyCode == 68) {
        keyboard.D = false;
    }

    if(e.keyCode == 87) {
        keyboard.W = false;
    }
});