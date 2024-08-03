class SalsaBottle extends MovableObject {
    y = 352;
    height = 68;
    width = 72;
    IMAGES_WALKING = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    static existingPositions = [];
    intervalIDs = [];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
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
     * Sets up animation intervals.
     */
    animate() {
        this.setStoppableInterval(this.animationMove, 1000);
        this.setStoppableInterval(this.stopGame, 100);
    }

    /**
     * Attempts to set the position at regular intervals and stops after a timeout.
     */
    setPosition() {
        let attempt = 0;
        let intervalID = setInterval(() => this.trySetPosition(intervalID, attempt++), 400);
        this.stopIntervalAfterTimeout(intervalID, 2000);
    }

    /**
     * Tries to set a position, stopping if successful or after a certain number of attempts.
     * @param {number} intervalID - The ID of the interval to clear if successful.
     * @param {number} attempt - The current attempt number.
     */
    trySetPosition(intervalID, attempt) {
        this.mathRandom();
        (!this.isOverlapping() || attempt >= 300) ? clearInterval(intervalID) : null;
        this.handlePosition(attempt);
    }

    /**
     * Handles the position setting based on overlap and attempt count.
     * @param {number} attempt - The current attempt number to determine if the position setting should be retried or if an error should be logged.
     */
    handlePosition(attempt) {
        !this.isOverlapping() && attempt < 300 ?
            SalsaBottle.existingPositions.push(this.x) :
            (attempt >= 300 ? console.error('Unable to find a non-overlapping position') : null);
    }

    /**
     * Stops the interval after a specified timeout.
     * @param {number} intervalID - The ID of the interval to be cleared.
     * @param {number} timeout - The time in milliseconds after which the interval will be cleared.
     */
    stopIntervalAfterTimeout(intervalID, timeout) {
        setTimeout(() => {
            clearInterval(intervalID);
        }, timeout);
    }

    /**
     * Generates a random position for the `x` coordinate.
     * The `x` coordinate is set to a value between 600 and 1500.
     */
    mathRandom() {
        this.x = 600 + Math.random() * 900;
    }

    /**
     * Checks if the current position overlaps with any existing positions. 
     * @returns {boolean} - Returns `true` if the current position overlaps with any
     * existing positions, otherwise `false`.
     */
    isOverlapping() {
        let isOverlapping = false;
        SalsaBottle.existingPositions.forEach(pos => {
            isOverlapping = Math.abs(this.x - pos) < this.width ? true : isOverlapping;
        });
        return isOverlapping;
    }

    /**
     * Plays the walking animation for the character.
     */
    animationMove() {
        this.playAnimation(this.IMAGES_WALKING);
    }
}
