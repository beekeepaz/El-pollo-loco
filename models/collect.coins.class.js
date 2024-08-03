class Coins extends MovableObject {
    y = 352;
    height = 68;
    width = 72;
    IMAGES_WALKING = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    intervalIDs = [];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.mathRandom();
        this.loadImages(this.IMAGES_WALKING);
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
     * Sets up intervals for animations and stopping the game.
     */
    animate() {
        this.setStoppableInterval(this.animationMove, 700);
        this.setStoppableInterval(this.stopGame, 100);
    }

    /**
     * Randomly positions an object within specified ranges.
     */
    mathRandom() {
        this.x = 600 + Math.random() * 900;
        this.y = 100 + Math.random() * 100;
    }

    /**
     * Plays the walking animation.
     */
    animationMove() {
        this.playAnimation(this.IMAGES_WALKING);
    }
}
