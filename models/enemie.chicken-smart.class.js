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

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.mathRandom();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
    }

    isDeadChickenSmart() {
        this.currentDead = true;
    }

    mathRandom() {
        this.x = 500 + Math.random() * 900;
        this.speed = 0.2 + Math.random() * 0.10;
    }

    animate() {
        setInterval(() => {
            if (!this.currentDead) {
                this.moveLeft();
                if (!this.isAboveGround()) {
                    this.jumpChicken();
                }
            }
        }, 1000 / 60);

        setInterval(() => {
            if (this.currentDead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }
        }, 100);
    }
}