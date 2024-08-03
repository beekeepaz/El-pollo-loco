class ThrowableObject extends MovableObject {
    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    currentSplash = false;
    world;
    intervalIDs = [];
    throwIntervalID;

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.world = world;
        this.x = x;
        this.y = y;
        this.height = 100;
        this.throw();
        this.animate();
    }

    /**
    * Sets an interval that can be stopped later.
    * @param {Function} fn - The function to be executed repeatedly.
    * @param {number} time - The time interval (in milliseconds) between executions.
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
    }

    /**
     * Stops all running intervals if the stop button was clicked.
     */
    stopGame() {
        if (window.stopButtonClicked) {
            this.intervalIDs.forEach(clearInterval);
            this.intervalIDs = [];
        }
    }

    /**
     * Starts the animation by setting up intervals for moving and stopping the game.
     */
    animate() {
        this.setStoppableInterval(this.animateMove, 100);
        this.setStoppableInterval(this.stopGame, 100);
    }

    /**
     * Sets the current splash status to true.
     */
    checkSplash() {
        this.currentSplash = true;
    }

    /**
     * Initiates the throwing action for the object.
     * Sets the vertical speed of the object, applies gravity, and starts an interval to repeatedly throw the object.
     * Stops the throwing action after 2 seconds.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throwIntervalID = setInterval(this.throwThisObject.bind(this), 1000 / 60);

        setTimeout(() => {
            clearInterval(this.throwIntervalID);
        }, 2000);
    }

    /**
     * Moves the object horizontally based on the world's direction.
     * Adjusts the position of the object by 10 units to the right or left, depending on the direction of the world.
     */
    throwThisObject() {
        if (this.world.direction === 'right') {
            this.x += 10;
        } else if (this.world.direction === 'left') {
            this.x -= 10;
        }
    }

    /**
     * Animates the object based on its current state.
     * Plays the splash animation if `currentSplash` is true; otherwise, plays the rotate animation.
     */
    animateMove() {
        if (this.currentSplash) {
            this.playAnimation(this.IMAGES_SPLASH);
        } else {
            this.playAnimation(this.IMAGES_ROTATE);
        }
    }
}
