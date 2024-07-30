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
        this.findNonOverlappingPosition();
        this.animate();
        this.applyGravity();
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
        this.setStoppableInterval(this.animationMove, 100);
        this.setStoppableInterval(this.automaticMove, 1000 / 60);
        this.setStoppableInterval(this.stopGame, 100);
    }

    animationMove() {
        if (this.currentDead) {
            this.playAnimation(this.IMAGES_DEAD);
        } else {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }

    automaticMove() {
        if (!this.currentDead) {
            this.moveLeft();
            if (!this.isAboveGround()) {
                this.jumpChicken();
            }
        }
    }

    isDeadChickenSmart() {
        this.currentDead = true;
    }


    findNonOverlappingPosition() {
        const intervalId = setInterval(() => {
            this.mathRandom();
            let positionFound = true;
            for (let chicken of ChickenYellow.existingChickens) {
                if (this.isTooClose(chicken)) {
                    positionFound = false;
                    break;
                }
            }
            if (positionFound) {
                ChickenYellow.existingChickens.push(this);
                clearInterval(intervalId);
            }
        }, 10);

        setTimeout(() => {
            clearInterval(intervalId);
        }, 2000);
    }

    isTooClose(other) {
        const minDistance = 228;
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < minDistance;
    }

    mathRandom() {
        this.x = 1600 + Math.random() * 900;
    }
   
}
