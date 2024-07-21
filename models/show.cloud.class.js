class Cloud extends MovableObject {
    y = 25;
    width = 500;
    height = 250;
    BACKGROUND_IMAGE = [
        '../img/5_background/layers/4_clouds/1.png'
    ];

    static existingPositions = []; // Statische Liste, um Positionen zu speichern

    constructor() {
        super().loadImage(this.BACKGROUND_IMAGE[0]);
        this.findNonOverlappingPosition();
        this.animate();
    }

    findNonOverlappingPosition() {
        const intervalId = setInterval(() => {
            let newX = Math.random() * 1500; // Vergrößere den Bereich
            let newY = this.y;

            if (!Cloud.isCollidingWithExisting(newX, newY, this.width, this.height)) {
                this.x = newX;
                this.y = newY;
                Cloud.existingPositions.push({ x: this.x, y: this.y, width: this.width, height: this.height });
                clearInterval(intervalId);
            }
        }, 50); // Überprüft alle 50 Millisekunden

        setTimeout(() => {
            clearInterval(intervalId);
        }, 3000); // Stoppt den Interval nach 3 Sekunden
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
