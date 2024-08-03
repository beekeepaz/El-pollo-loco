class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 20;
    x = 2876;
    acceleration = 0.1;
    speed = 0.4;

    IMAGES_WALKING = [
        `img/4_enemie_boss_chicken/1_walk/G1.png`,
        `img/4_enemie_boss_chicken/1_walk/G2.png`,
        `img/4_enemie_boss_chicken/1_walk/G3.png`,
        `img/4_enemie_boss_chicken/1_walk/G4.png`
    ];

    IMAGES_ALERT = [
        `img/4_enemie_boss_chicken/2_alert/G5.png`,
        `img/4_enemie_boss_chicken/2_alert/G6.png`,
        `img/4_enemie_boss_chicken/2_alert/G7.png`,
        `img/4_enemie_boss_chicken/2_alert/G8.png`,
        `img/4_enemie_boss_chicken/2_alert/G9.png`,
        `img/4_enemie_boss_chicken/2_alert/G10.png`,
        `img/4_enemie_boss_chicken/2_alert/G11.png`,
        `img/4_enemie_boss_chicken/2_alert/G12.png`
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    world;
    movementStarted = false;
    attackAnimationStarted = false;
    intervalIDs = [];

    constructor(world) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.world = world;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
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
     * Checks if the game is over and calls the gameOver function after 1 second if the player is dead.
     */
    gameOver() {
        if (this.isDead()) {
            setTimeout(() => {
                gameOver();
            }, 1000);
        }
    }

    /**
     * Starts multiple intervals to handle animations and game state.
     */
    animate() {
        this.setStoppableInterval(this.animationMove, 100);
        this.setStoppableInterval(this.automaticMove, 100);
        this.setStoppableInterval(this.gameOver, 100);
        this.setStoppableInterval(this.stopGame, 100);
    }

    /**
     * Updates the animation of the object.
     */
    animationMove() {
        this.updateAnimation();
    }

    /**
     * Starts an interval that moves the object to the left at a frame rate of 60 frames per second.
     * @returns {number} The interval ID for the created interval.
     */
    moveInterval() {
        return setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }

    /**
     * Delays the start of movement by 3 seconds. After the delay, it sets the `movementStarted` flag to true
     * and begins the movement interval.
     */
    moveAfterTime() {
        setTimeout(() => {
            this.movementStarted = true;
            this.moveInterval();
        }, 3000);
    }

    /**
     * Triggers movement and attack animation if conditions are met.
     */
    automaticMove() {
        this.isMoving() && !this.movementStarted ? (
            !this.attackAnimationStarted ? (
                this.attackAnimationStarted = true,
                this.moveAfterTime()
            ) : null
        ) : null;
    }

    /**
     * Checks if the character is moving based on its x position.
     * @returns {boolean} - True if the character's x position is 2200 or greater, otherwise false.
     */
    isMoving() {
        return this.world.character.x >= 2200;
    }

    /**
     * Updates the animation based on the current state.
     */
    updateAnimation() {
        const state = this.getCurrentState();
        const images = this.getImagesForState(state);
        this.playAnimation(images);
    }

    /**
     * Determines the current state based on various conditions.
     * @returns {string} The current state.
     */
    getCurrentState() {
        return this.isDead() ? 'dead' :
            this.isHurt() ? 'hurt' :
                (this.attackAnimationStarted && !this.movementStarted) || this.speed === 2.4 ? 'bossAttack' :
                    this.isMoving() ? 'moving' :
                        'moving';
    }

    /**
     * Gets the images corresponding to the given state.
     * @param {string} state - The current state.
     * @returns {Array} The array of images for the state.
     */
    getImagesForState(state) {
        const stateToImagesMap = {
            dead: this.IMAGES_DEAD,
            hurt: this.IMAGES_HURT,
            moving: this.IMAGES_WALKING,
            bossAttack: this.IMAGES_ATTACK,
        };

        return stateToImagesMap[state];
    }
}
