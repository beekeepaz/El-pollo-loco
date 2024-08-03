class ChickenYellow extends MovableObject {
    y = 352;
    height = 68;
    width = 72;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    currentDead = false;
    static existingChickens = [];
    intervalIDs = [];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.setPosition();
        this.animate();
        this.applyGravity();
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
     * Sets up intervals for various animations and game functions.
     */
    animate() {
        this.setStoppableInterval(this.animationMove, 100);
        this.setStoppableInterval(this.automaticMove, 1000 / 60);
        this.setStoppableInterval(this.stopGame, 100);
    }

    /**
     * Plays the animation based on the current state.
     */
    animationMove() {
        if (this.currentDead) {
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Moves the object automatically based on its current state.
     */
    automaticMove() {
        if (!this.currentDead) {
            this.moveLeft();
            if (!this.isAboveGround()) {
                this.jumpChicken();
            }
        }
    }

    /**
     * Sets the chicken's state to dead.
     */
    isDeadChickenSmart() {
        this.currentDead = true;
    }

    /**
     * Tries to set a non-overlapping position for the object.
     */
    setPosition() {
        const intervalId = setInterval(() => {
            this.mathRandom();
            let positionFound = ChickenYellow.existingChickens.every(chicken => !this.isTooClose(chicken));
            positionFound ? (ChickenYellow.existingChickens.push(this), clearInterval(intervalId))
                : null;
        }, 10);
        this.stopIntervalAfterTimeout(intervalId, 2000);
    }

    /**
     * Stops the interval after a specified timeout.
     * @param {number} intervalId - The ID of the interval to be cleared.
     * @param {number} timeout - The time (in milliseconds) to wait before clearing the interval.
     */
    stopIntervalAfterTimeout(intervalId, timeout) {
        setTimeout(() => clearInterval(intervalId), timeout);
    }

    /**
     * Checks if the current object is too close to another object.
     * @param {Object} other - The other object to compare with, which should have `x` and `y` properties.
     * @returns {boolean} - `true` if the distance to the other object is less than the minimum distance, otherwise `false`.
     */
    isTooClose(other) {
        const minDistance = 228;
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < minDistance;
    }

    /**
     * Sets a random x-coordinate for the object within a specific range.
     */
    mathRandom() {
        this.x = 1600 + Math.random() * 900;
    }
}
