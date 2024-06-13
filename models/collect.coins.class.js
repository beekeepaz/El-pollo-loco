class Coins extends MovableObject {
    y = 352;
    height = 68;
    width = 72;
    IMAGES_WALKING = [
        '../img/8_coin/coin_1.png',
        '../img/8_coin/coin_2.png'
    ];

    constructor() {
        super().loadImage('../img/8_coin/coin_1.png');
        this.mathRandom();
        this.loadImages(this.IMAGES_WALKING);
        this.animate();
    }

    mathRandom() {
        this.x = 600 + Math.random() * 900;
        this.y = 100 + Math.random() * 100;
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.IMAGES_WALKING);
        }, 700);
    }
}
