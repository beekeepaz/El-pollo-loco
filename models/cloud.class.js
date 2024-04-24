class Cloud extends MovableObject {
    y = 25;
    width = 500;
    height = 250;
    speed = 0.2;

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 300;
        this.animate();
    }

    animate() {
        this.moveLeft();                        
    }

    moveLeft() {
        setInterval(() => {
            this.x -= this.speed;
        }, 1000 / 60);
    }
}