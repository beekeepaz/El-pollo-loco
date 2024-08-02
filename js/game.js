let canvas;
let world;
let keyboard = new Keyboard();
let startscreen;
let endscreen;
let soundon;
let soundoff;
let sound = false;
window.soundEnabled = false;
window.stopButtonClicked = false;

function setScreens() {
    toggleExitButton();
    endscreen = document.getElementById(`gameover_screen`);
    soundon = document.getElementById(`toggleSoundon`);
    soundoff = document.getElementById(`toggleSoundoff`);
    // let oversrceen = document.getElementById(`show_field`);
    // oversrceen.classList.remove(`d-none`);
    endscreen.classList.add('d-none');
    soundon.classList.add('d-none');
    soundoff.classList.remove(`d-none`);
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
        setTimeout(() => {
            reLoad();
        }, 3000);
    }
}

function endThisGame() {
    window.stopButtonClicked = true;
    exit();
}

function init() {
    toggleInitButton();
    closeMenu();
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

function toggleInitButton() {
    let buttonstart = document.getElementById(`start`);
    let buttonend = document.getElementById(`end`);
    buttonstart.classList.add(`d-none`);
    buttonend.classList.remove(`d-none`);
}

function toggleExitButton() {
    let buttonstart = document.getElementById(`start`);
    let buttonend = document.getElementById(`end`);
    buttonstart.classList.remove(`d-none`);
    buttonend.classList.add(`d-none`);
}

function exit() {
    toggleExitButton();
    if (world) {
        world = null;
        canvas.classList.remove('d-block');
        startscreen.classList.remove('d-none');
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        fullscreen(document.documentElement);
    } else {
        exitFullscreen();
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

window.addEventListener("click", (b) => {
    let toggleSoundoff = document.getElementById('toggleSoundoff');
    let toggleSoundon = document.getElementById('toggleSoundon');
    if (b.target === toggleSoundoff || b.target === toggleSoundon) {
        sound = !sound;
        sound ? soundEnabled = true : soundEnabled = false;
    }
    if (sound === false) {
        soundon.classList.add(`d-none`);
        soundoff.classList.remove(`d-none`);
    } else if (sound === true) {
        soundon.classList.remove(`d-none`);
        soundoff.classList.add(`d-none`);
    }
});

window.addEventListener("touchstart", (b) => {
    let leftButton = document.getElementById('left');
    let rightButton = document.getElementById('right');
    let throwleft = document.getElementById('throw_bottle_left');
    let throwright = document.getElementById('throw_bottle_right');
    let space = document.getElementById('space');
    if (b.target === leftButton) {
        keyboard.LEFT = true;
        leftButton.style.opacity = "1";
    }
    if (b.target === rightButton) {
        keyboard.RIGHT = true;
        rightButton.style.opacity = "1";
    }
    if (b.target === throwleft) {
        keyboard.D = true;
        throwleft.style.opacity = "1";
    }
    if (b.target === throwright) {
        keyboard.D = true;
        throwright.style.opacity = "1";
    }
    if (b.target === space) {
        keyboard.SPACE = true;
        space.style.opacity = "1";
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
        leftButton.style.opacity = "0.5";
    }
    if (b.target === rightButton) {
        keyboard.RIGHT = false;
        rightButton.style.opacity = "0.5";
    }
    if (b.target === throwleft) {
        keyboard.D = false;
        throwleft.style.opacity = "0.5";
    }
    if (b.target === throwright) {
        keyboard.D = false;
        throwright.style.opacity = "0.5";
    }
    if (b.target === space) {
        keyboard.SPACE = false;
        space.style.opacity = "0.5";
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
