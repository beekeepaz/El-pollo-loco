let canvas;
let world;
let keyboard = new Keyboard();
let startscreen;
let endscreen;
let soundon;
let soundoff;
let resetgame;
let sound = false;
window.soundEnabled = false;
window.stopButtonClicked = false;


/**
 * This function sets up the screens for the game.
 * It handles the visibility of the exit button, the game over screen,
 * and sound toggles.
 */
function setScreens() {
    toggleExitButton();
    setMobile();
    endscreen = document.getElementById(`gameover_screen`);
    soundon = document.getElementById(`toggleSoundon`);
    soundoff = document.getElementById(`toggleSoundoff`);
    resetgame = document.getElementById(`reset`);
    endscreen.classList.add('d-none');
    soundon.classList.add('d-none');
    soundoff.classList.remove(`d-none`);
    resetgame.classList.add('d-none');
}

/**
 * This function handles the game over state.
 * It sets a flag to indicate that the stop button has been clicked
 * and then triggers the display of the game over screen.
 */
function gameOver() {
    window.stopButtonClicked = true;
    gameOverScreen();
}

/**
 * Displays the game over screen and reloads the game after a 3-second delay.
 */
function gameOverScreen() {
    if (world) {
        world = null;
        endscreen = document.getElementById(`gameover_screen`);
        startscreen = document.getElementById(`start_screen`);
        resetgame = document.getElementById(`reset`);
        canvas.classList.remove('d-block');
        endscreen.classList.remove('d-none');
        resetgame.classList.remove('d-none');
    }
}

/**
 * Marks the game as stopped and exits the game.
 */
function endThisGame() {
    window.stopButtonClicked = true;
    exit();
}

/**
 * Initializes the game by setting up various components and states.
 */
function init() {
    toggleInitButton();
    closeMenu();
    window.stopButtonClicked = false;
    initLevel();
    initSettings();
}


/**
 * restart the game
 */
function reset() {
    resetgame = document.getElementById(`reset`);
    resetgame.classList.add('d-none');
    init();
}

/**
 * Initializes the game settings by setting up the canvas and screens,
 * and creating a new game world after a 1-second delay
 */
function initSettings() {
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

/**
 * Toggles the visibility of the start and end buttons.
 * Hides the start button and shows the end button.
 */
function toggleInitButton() {
    let buttonstart = document.getElementById(`start`);
    let buttonend = document.getElementById(`end`);
    buttonstart.classList.add(`d-none`);
    buttonend.classList.remove(`d-none`);
}

/**
 * Toggles the visibility of the start and end buttons.
 * Shows the start button and hides the end button.
 */
function toggleExitButton() {
    let buttonstart = document.getElementById(`start`);
    let buttonend = document.getElementById(`end`);
    buttonstart.classList.remove(`d-none`);
    buttonend.classList.add(`d-none`);
}

/**
 * Handles the exit process for the game.
 * It toggles the exit button visibility and resets the game state if necessary.
 */
function exit() {
    toggleExitButton();
    if (world) {
        world = null;
        canvas.classList.remove('d-block');
        startscreen.classList.remove('d-none');
    }
}

/**
 * Toggles fullscreen mode on or off.
 * Enters fullscreen mode if not already in fullscreen; otherwise, exits fullscreen.
 */
function toggleFullscreen() {
    if (!document.fullscreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement) {
        fullscreen(document.documentElement);
    } else {
        exitFullscreen();
    }
}

/**
  * Requests fullscreen mode for the specified element.
 */
function fullscreen() {
    let fullscreen = document.getElementById('fullscreen');
    enterFullscreen(fullscreen);
}

/**
 * Requests fullscreen mode for the given element.
 * Supports standard and vendor-prefixed fullscreen requests.
 * @param {Element} element - The DOM element to be displayed in fullscreen mode.
 */
function enterFullscreen(element) {
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.msRequestFullscreen) {
        element.msRequestFullscreen();
    } else if (element.webkitRequestFullscreen) {
        element.webkitRequestFullscreen();
    }
}

/**
 * Exits fullscreen mode if currently active.
 * Supports standard and vendor-prefixed fullscreen exit methods.
 */
function exitFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
    }
}

/**
 * Toggles the sound settings when the sound control buttons are clicked.
 * Updates the visibility of the sound control buttons based on the current sound state.
 */
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

/**
 * Handles touch start events to update control states and button appearance.
 * Adjusts the opacity of control buttons based on user interaction.
 */
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

/**
 * Handles touch end events to update control states and button appearance.
 * Adjusts the opacity of control buttons when touch ends.
 */
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

/**
 * Handles touch cancel events to update control states when a touch is interrupted.
 * Ensures control states are reset if the touch is canceled.
 */
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

/**
 * Handles keydown events to update control states based on pressed keys.
 * Updates the keyboard state for movement and action keys.
 */
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

/**
 * Handles keyup events to update control states when keys are released.
 * Resets the keyboard state for movement and action keys.
 */
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
