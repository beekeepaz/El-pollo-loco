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
    static existingChickens = [];
    intervalIDs = [];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);
        this.findNonOverlappingPosition();
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
        this.moveLeft();
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
        }, 10); 

        setTimeout(() => {
            clearInterval(intervalId);
        }, 3000); 
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
