class ChickenYellow extends MovableObject {
    y = 352;
    height = 68;
    width = 72;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.mathRandom();
        this.loadImages(this.IMAGES_WALKING);
        this.applyGravity();
        this.animate();
    }

    mathRandom() {
        this.x = 500 + Math.random() * 900;
        this.speed = 0.2 + Math.random() * 0.10;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
            if (!this.isAboveGround()) {
                this.jumpChicken();
            }
        }, 1000 / 60);

        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 100);
    }
}