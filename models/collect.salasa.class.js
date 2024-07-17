class SalsaBottle extends MovableObject {
    y = 352;
    height = 68;
    width = 72;
    IMAGES_WALKING = [
        '../img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        '../img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    static existingPositions = []; // Array to hold the positions of all SalsaBottles

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.setPosition();
        this.animate();
    }

    setPosition() {
        do {
            this.x = 600 + Math.random() * 900;
        } while (this.isOverlapping());
        SalsaBottle.existingPositions.push(this.x); // Save the position once it's validated
    }

    isOverlapping() {
        for (let pos of SalsaBottle.existingPositions) {
            if (Math.abs(this.x - pos) < this.width) {
                return true;
            }
        }
        return false;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 1000);
    }
}
