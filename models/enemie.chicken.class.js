class Chicken extends MovableObject {
    y = 348;
    height = 88;
    width = 128;
    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];
    IMAGES_DEAD = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];
    currentDead = false;
    static existingChickens = [];
    intervalIDs = [];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
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
        this.moveLeft();
    }

    isDeadChicken() {
        this.currentDead = true;
    }

    setPosition() {
        const intervalId = setInterval(() => {
            this.mathRandom();
            let positionFound = Chicken.existingChickens.every(chicken => !this.isTooClose(chicken));
            positionFound ? (Chicken.existingChickens.push(this), clearInterval(intervalId)) 
                          : null;
        }, 10);
        this.stopIntervalAfterTimeout(intervalId, 2000);
    }

    stopIntervalAfterTimeout(intervalId, timeout) {
        setTimeout(() => clearInterval(intervalId), timeout);
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
}
