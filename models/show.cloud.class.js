class Cloud extends MovableObject {
    y = 25;
    width = 500;
    height = 250;
    BACKGROUND_IMAGE = [
        'img/5_background/layers/4_clouds/1.png'
    ];

    static existingPositions = [];

    constructor() {
        super().loadImage(this.BACKGROUND_IMAGE[0]);
        this.findNonOverlappingPosition();
        this.animate();
    }

    findNonOverlappingPosition() {
        const intervalId = setInterval(() => {
            let newX = Math.random() * 1500;
            let newY = this.y;

            if (!Cloud.isCollidingWithExisting(newX, newY, this.width, this.height)) {
                this.x = newX;
                this.y = newY;
                Cloud.existingPositions.push({ x: this.x, y: this.y, width: this.width, height: this.height });
                clearInterval(intervalId);
            }
        }, 10);

        this.stopIntervalAfterTimeout(intervalId, 2000);
    }

    stopIntervalAfterTimeout(intervalId, timeout) {
        setTimeout(() => clearInterval(intervalId), timeout);
    }

    static isCollidingWithExisting(newX, newY, newWidth, newHeight) {
        return Cloud.existingPositions.some(pos =>
            newX < pos.x + pos.width &&
            newX + newWidth > pos.x &&
            newY < pos.y + pos.height &&
            newY + newHeight > pos.y
        );
    }

    animate() {
        this.moveLeft();
    }
}
