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

    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
    }

    stopGame() {
        if (window.stopButtonClicked) {
            this.intervalIDs.forEach(clearInterval);
            this.intervalIDs = [];
        }
    }

    animate() {
        this.setStoppableInterval(this.animationMove, 1000);
        this.setStoppableInterval(this.stopGame, 100);
    }

    setPosition() {
        let attempt = 0;
        let intervalID = setInterval(() => {
            this.x = 600 + Math.random() * 900;
            if (!this.isOverlapping() || attempt >= 300) {
                clearInterval(intervalID);
                if (!this.isOverlapping()) {
                    SalsaBottle.existingPositions.push(this.x);
                } else {
                    console.error('Unable to find a non-overlapping position');
                }
            }
            attempt++;
        }, 400);

        setTimeout(() => {
            clearInterval(intervalID);
        }, 2000);
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
