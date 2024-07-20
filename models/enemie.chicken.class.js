class Chicken extends MovableObject {
    y = 348;
    height = 88;
    width = 128;
    IMAGES_WALKING = [
        '../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        '../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        '../img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    currentDead = false;
    static existingChickens = []; // Array to store the positions of existing chickens

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.findNonOverlappingPosition();
        this.animate();
    }

    isDeadChicken() {
        this.currentDead = true;
    }

    findNonOverlappingPosition() {
        const intervalId = setInterval(() => {
            this.mathRandom();
            let positionFound = true;
            for (let chicken of Chicken.existingChickens) {
                if (this.isTooClose(chicken)) {
                    positionFound = false;
                    break;
                }
            }
            if (positionFound) {
                Chicken.existingChickens.push(this);
                clearInterval(intervalId);
            }
        }, 50); // Überprüft alle 50 Millisekunden

        setTimeout(() => {
            clearInterval(intervalId);
        }, 3000); // Stoppt den Interval nach 3 Sekunden
    }

    isTooClose(other) {
        const minDistance = 228;
        const dx = this.x - other.x;
        const dy = this.y - other.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        return distance < minDistance;
    }

    mathRandom() {
        this.x = 719 + Math.random() * 719;
    }

    animate() {
        setInterval(() => {
            this.moveLeft();
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
