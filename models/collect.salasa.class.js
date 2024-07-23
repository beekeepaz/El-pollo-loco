class SalsaBottle extends MovableObject {
    y = 352;
    height = 68;
    width = 72;
    IMAGES_WALKING = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    static existingPositions = []; // Array to hold the positions of all SalsaBottles
    intervalIDs = [];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.setPosition();
        this.animate();
        // this.stopGame();
    }

    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
        console.log(id);
    }

    stopGame() {
        // if (this.keyboard.W) {
        //     this.intervalIDs.forEach(clearInterval);
        // }
        let end = document.getElementById('end');
        console.log(end);
    }

    animate() {
        this.setStoppableInterval(this.animationMove, 1000);
    }

    setPosition() {
        let attempt = 0;
        let intervalID = setInterval(() => {
            this.x = 600 + Math.random() * 900;
            if (!this.isOverlapping() || attempt >= 300) { // Stop after 3000ms (300 attempts * 10ms)
                clearInterval(intervalID);
                if (!this.isOverlapping()) {
                    SalsaBottle.existingPositions.push(this.x); // Save the position once it's validated
                } else {
                    console.error('Unable to find a non-overlapping position');
                }
            }
            attempt++;
        }, 10);

        // Stop the interval after 3000ms
        setTimeout(() => {
            clearInterval(intervalID);
        }, 3000);
    }

    isOverlapping() {
        for (let pos of SalsaBottle.existingPositions) {
            if (Math.abs(this.x - pos) < this.width) {
                return true;
            }
        }
        return false;
    }

    animationMove() {
        this.playAnimation(this.IMAGES_WALKING);
    }
}
