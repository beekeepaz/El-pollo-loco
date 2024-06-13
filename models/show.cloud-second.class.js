class CloudSecond extends MovableObject {
    y = 25;
    width = 500;
    height = 250;

    constructor() {
        super().loadImage('../img/5_background/layers/4_clouds/2.png');
        this.mathRandom();
        this.animate();
    }

    mathRandom() {
        this.x = Math.random() * 1400;
    }

    animate() {
        this.moveLeft();                        
    }
}