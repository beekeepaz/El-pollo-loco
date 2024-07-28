class ChickenYellow extends MovableObject {
    y = 352;
    height = 68;
    width = 72;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        '../img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];
    currentDead = false;

    static existingPositions = []; 
    intervalIDs = [];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.animate();
        this.findNonOverlappingPosition();
        this.applyGravity();
        this.stopGame();
    }

    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
    }

    stopGame() {
        setInterval(() => {
            if (window.stopButtonClicked) {
                this.intervalIDs.forEach(clearInterval);
                this.intervalIDs = [];
            }
        }, 100);
    }

    animate() {
        this.setStoppableInterval(this.animationMove, 100);
        this.setStoppableInterval(this.automaticMove, 1000 / 60);
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
            let newX = 1600 + Math.random() * 900;
            let newY = this.y;

            if (!ChickenYellow.isCollidingWithExisting(newX, newY, this.width, this.height)) {
                this.x = newX;
                this.y = newY;
                ChickenYellow.existingPositions.push({ x: this.x, y: this.y, width: this.width, height: this.height });
                clearInterval(intervalId);
            }
        }, 10);

        setTimeout(() => {
            clearInterval(intervalId);
        }, 2000); 
    }

    static isCollidingWithExisting(newX, newY, newWidth, newHeight) {
        return ChickenYellow.existingPositions.some(pos =>
            newX < pos.x + pos.width &&
            newX + newWidth > pos.x &&
            newY < pos.y + pos.height &&
            newY + newHeight > pos.y
        );
    }
}
