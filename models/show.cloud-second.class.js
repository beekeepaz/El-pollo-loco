class CloudSecond extends MovableObject {
    y = 25;
    width = 500;
    height = 250;
    BACKGROUND_IMAGE = [
        'img/5_background/layers/4_clouds/2.png'
    ];

    static existingPositions = []; // Statische Liste, um Positionen zu speichern

    constructor() {
        super().loadImage(this.BACKGROUND_IMAGE[0]);
        this.findNonOverlappingPosition();
        this.animate();
    }

    findNonOverlappingPosition() {
        const intervalId = setInterval(() => {
            let newX = 1200 + Math.random() * 2400; 
            let newY = this.y;

            if (!CloudSecond.isCollidingWithExisting(newX, newY, this.width, this.height)) {
                this.x = newX;
                this.y = newY;
                Cloud.existingPositions.push({ x: this.x, y: this.y, width: this.width, height: this.height });
                clearInterval(intervalId);
            }
        }, 10); 

        setTimeout(() => {
            clearInterval(intervalId);
        }, 2000); 
    }

    static isCollidingWithExisting(newX, newY, newWidth, newHeight) {
        return CloudSecond.existingPositions.some(pos => 
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
