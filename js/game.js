let canvas;
let world;
let keyboard = new Keyboard();
let startscreen;
let endscreen;
let sound = false;
window.soundEnabled = false;
window.stopButtonClicked = false;

function setScreens() {
    endscreen = document.getElementById(`gameover_screen`);
    endscreen.classList.add('d-none');
}

function gameOver() {
    window.stopButtonClicked = true;
    gameOverScreen();
}

function gameOverScreen() {
    if (world) {
        world = null;
        endscreen = document.getElementById(`gameover_screen`);
        canvas.classList.remove('d-block');
        endscreen.classList.remove('d-none');
    }
}

function endThisGame() {
    window.stopButtonClicked = true;
    exit();
}

function init() {
    window.stopButtonClicked = false;
    initLevel();
    setTimeout(() => {
        canvas = document.getElementById(`canvas`);
        startscreen = document.getElementById(`start_screen`);
        endscreen = document.getElementById(`gameover_screen`);
        endscreen.classList.add('d-none');
        startscreen.classList.add('d-none');
        canvas.classList.add('d-block');
        world = new World(canvas, keyboard);
    }, 1000);
}

function exit() {
    if (world) {
        world = null;
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

window.addEventListener("touchstart", (b) => {
    let leftButton = document.getElementById('left');
    let rightButton = document.getElementById('right');
    let throwleft = document.getElementById('throw_bottle_left');
    let throwright = document.getElementById('throw_bottle_right');
    let space = document.getElementById('space');
    let toggleSound = document.getElementById('toggleSound');
    if (b.target === leftButton) {
        keyboard.LEFT = true;
    }
    if (b.target === rightButton) {
        keyboard.RIGHT = true;
    }
    if (b.target === throwleft) {
        keyboard.D = true;
    }
    if (b.target === throwright) {
        keyboard.D = true;
    }
    if (b.target === space) {
        keyboard.SPACE = true;
    }
    if (b.target === toggleSound) {
        sound = !sound;
        sound ? soundEnabled = true : soundEnabled = false;
    }
});

window.addEventListener("touchend", (b) => {
    let leftButton = document.getElementById('left');
    let rightButton = document.getElementById('right');
    let throwleft = document.getElementById('throw_bottle_left');
    let throwright = document.getElementById('throw_bottle_right');
    let space = document.getElementById('space');
    if (b.target === leftButton) {
        keyboard.LEFT = false;
    }
    if (b.target === rightButton) {
        keyboard.RIGHT = false;
    }
    if (b.target === throwleft) {
        keyboard.D = false;
    }
    if (b.target === throwright) {
        keyboard.D = false;
    }
    if (b.target === space) {
        keyboard.SPACE = false;
    }
});

window.addEventListener("touchcancel", (b) => {
    let leftButton = document.getElementById('left');
    let rightButton = document.getElementById('right');
    let throwleft = document.getElementById('throw_bottle_left');
    let throwright = document.getElementById('throw_bottle_right');
    let space = document.getElementById('space');
    if (b.target === leftButton) {
        keyboard.LEFT = false;
    }
    if (b.target === rightButton) {
        keyboard.RIGHT = false; c
    }
    if (b.target === throwleft) {
        keyboard.D = false;
    }
    if (b.target === throwright) {
        keyboard.D = false;
    }
    if (b.target === space) {
        keyboard.SPACE = false;
    }
});

window.addEventListener("keydown", (e) => {
    // console.log(e.keyCode);
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }

    if (e.keyCode == 87) {
        keyboard.W = true;
    }
});

window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }

    if (e.keyCode == 87) {
        keyboard.W = false;
    }
});