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

    static existingPositions = []; // Statische Liste, um Positionen zu speichern

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
        let newX, newY;
        do {
            newX = 1600 + Math.random() * 900;
            newY = this.y;
        } while (ChickenYellow.isCollidingWithExisting(newX, newY, this.width, this.height));
        
        this.x = newX;
        this.y = newY;
        this.speed = 0.2 + Math.random() * 0.10;
        ChickenYellow.existingPositions.push({ x: this.x, y: this.y, width: this.width, height: this.height });
    }

    static isCollidingWithExisting(newX, newY, newWidth, newHeight) {
        return ChickenYellow.existingPositions.some(pos => 
            newX < pos.x + pos.width &&
            newX + newWidth > pos.x &&
            newY < pos.y + pos.height &&
            newY + newHeight > pos.y
        );
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
