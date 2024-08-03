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

    /**
     * Finds a non-overlapping position for the cloud by generating random coordinates
     * and checking for collisions with existing positions.
     */
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

    /**
     * Stops an interval after a specified timeout period.
     * @param {number} intervalId - The ID of the interval to be cleared.
     * @param {number} timeout - The timeout period in milliseconds before clearing the interval.
     */
    stopIntervalAfterTimeout(intervalId, timeout) {
        setTimeout(() => clearInterval(intervalId), timeout);
    }

    /**
     * Checks if the new position collides with any existing positions.
     * @param {number} newX - The x-coordinate of the new position.
     * @param {number} newY - The y-coordinate of the new position.
     * @param {number} newWidth - The width of the new object.
     * @param {number} newHeight - The height of the new object.
     * @returns {boolean} - True if there is a collision, false otherwise.
     */
    static isCollidingWithExisting(newX, newY, newWidth, newHeight) {
        return Cloud.existingPositions.some(pos =>
            newX < pos.x + pos.width &&
            newX + newWidth > pos.x &&
            newY < pos.y + pos.height &&
            newY + newHeight > pos.y
        );
    }

    /**
     * Executes the animation logic by moving the object left.
     */
    animate() {
        this.moveLeft();
    }
}
