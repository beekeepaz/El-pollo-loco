class Chicken extends MovableObject {
    y = 348;
    height = 88;
    width = 128;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
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
     * Starts multiple animations and game control intervals.
     */
    animate() {
        this.setStoppableInterval(this.animationMove, 100);
        this.setStoppableInterval(this.automaticMove, 1000 / 60);
        this.setStoppableInterval(this.stopGame, 100);
    }

    /**
     * Plays the appropriate animation based on the current state.
     */
    animationMove() {
        if (this.currentDead) {
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    /**
     * Moves the object to the left.
     */
    automaticMove() {
        this.moveLeft();
    }

    /**
     * Sets the current state of the chicken to dead.
     */
    isDeadChicken() {
        this.currentDead = true;
    }

    /**
     * Sets a position for the chicken, ensuring it does not overlap with other chickens.
     * If no suitable position is found within 2 seconds, the interval is cleared.
     */
    setPosition() {
        const intervalId = setInterval(() => {
            this.mathRandom();
            let positionFound = Chicken.existingChickens.every(chicken => !this.isTooClose(chicken));
            positionFound ? (Chicken.existingChickens.push(this), clearInterval(intervalId))
                : null;
        }, 1000 / 120);
        this.stopIntervalAfterTimeout(intervalId, 2000);
    }

    /**
     *Stops an interval after a specified timeout.
     * @param {number} intervalId - The ID of the interval to clear.
     * @param {number} timeout - The timeout duration in milliseconds before stopping the interval.
     */
    stopIntervalAfterTimeout(intervalId, timeout) {
        setTimeout(() => clearInterval(intervalId), timeout);
    }

    /**
     * Checks if this object is too close to another object.
     * @param {object} other - The other object to compare against.
     * @returns {boolean} - True if the distance between this object and the other object is less than the minimum distance, otherwise false.
     */
    isTooClose(other) {
        const minDistance = 228;
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < minDistance;
    }

    /**
     * Sets a random x position for the object.
     * The x position is set between 719 and 1438.
     */
    mathRandom() {
        this.x = 719 + Math.random() * 719;
    }
}
