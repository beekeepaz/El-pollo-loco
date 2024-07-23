class Coins extends MovableObject {
    y = 352;
    height = 68;
    width = 72;
    IMAGES_WALKING = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];
    intervalIDs = [];

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.mathRandom();
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
        this.stopGame();
    }

    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
        console.log(id);
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
        this.setStoppableInterval(this.animationMove, 700);
    }

    mathRandom() {
        this.x = 600 + Math.random() * 900;
        this.y = 100 + Math.random() * 100;
    }

    animationMove() {
        this.playAnimation(this.IMAGES_WALKING);
    }
}
