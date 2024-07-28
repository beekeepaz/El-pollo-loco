let canvas;
let world;
let keyboard = new Keyboard();
let startscreen;
let sound = false;
window.soundEnabled = false;

window.stopButtonClicked = false;

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
        console.log("left_true");
    }
    if (b.target === rightButton) {
        keyboard.RIGHT = true;
        console.log("right_true");
    }
    if (b.target === throwleft) {
        keyboard.D = true;
        console.log("Throw left_true");
    }
    if (b.target === throwright) {
        keyboard.D = true;
        console.log("Throw right_true");
    }
    if (b.target === space) {
        keyboard.SPACE = true;
        console.log("space right_true");
    }
    if (b.target === toggleSound) {
        sound = !sound; 
        sound ? soundEnabled = true : soundEnabled = false;
        console.log(`sound ${sound ? 'enabled' : 'disabled'}`);
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
        console.log("left_false");
    }
    if (b.target === rightButton) {
        keyboard.RIGHT = false;
        console.log("right_false");
    }
    if (b.target === throwleft) {
        keyboard.D = false;
        console.log("Throw left_false");
    }
    if (b.target === throwright) {
        keyboard.D = false;
        console.log("Throw right_false");
    }
    if (b.target === space) {
        keyboard.SPACE = false;
        console.log("space right_false");
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
        console.log("left_false");
    }
    if (b.target === rightButton) {
        keyboard.RIGHT = false;c 
        console.log("right_false");
    }
    if (b.target === throwleft) {
        keyboard.D = false;
        console.log("Throw left_false");
    }
    if (b.target === throwright) {
        keyboard.D = false;
        console.log("Throw right_false");
    }
    if (b.target === space) {
        keyboard.SPACE = false;
        console.log("space right_false");
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