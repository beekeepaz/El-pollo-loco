class CloudSecond extends MovableObject {
    y = 25;
    width = 500;
    height = 250;
    BACKGROUND_IMAGE = [
        'img/5_background/layers/4_clouds/2.png'
    ];

    static existingPositions = [];

    constructor() {
        super().loadImage(this.BACKGROUND_IMAGE[0]);
        this.setPosition();
        this.animate();
    }

    /**
     * Sets a new position for the object ensuring it doesn't collide with existing objects.
     */
    setPosition() {
        const intervalId = setInterval(() => {
            let newX = 1200 + Math.random() * 2400;
            let newY = this.y;

            let positionFound = !CloudSecond.isCollidingWithExisting(newX, newY, this.width, this.height);
            if (positionFound) {
                this.x = newX;
                this.y = newY;
                Cloud.existingPositions.push({ x: this.x, y: this.y, width: this.width, height: this.height });
                clearInterval(intervalId);
            }
        }, 1000 / 120);

        this.stopIntervalAfterTimeout(intervalId, 2000);
    }

    /**
     * Stops the interval after a specified timeout.
     * @param {number} intervalId - The ID of the interval to be cleared.
     * @param {number} timeout - The time in milliseconds after which the interval should be cleared.
     */
    stopIntervalAfterTimeout(intervalId, timeout) {
        setTimeout(() => clearInterval(intervalId), timeout);
    }

    /**
     * Checks if a new position collides with any existing positions.
     * @param {number} newX - The x-coordinate of the new position.
     * @param {number} newY - The y-coordinate of the new position.
     * @param {number} newWidth - The width of the new position.
     * @param {number} newHeight - The height of the new position.
     * @returns {boolean} - Returns true if there is a collision, false otherwise.
     */
    static isCollidingWithExisting(newX, newY, newWidth, newHeight) {
        return CloudSecond.existingPositions.some(pos =>
            newX < pos.x + pos.width &&
            newX + newWidth > pos.x &&
            newY < pos.y + pos.height &&
            newY + newHeight > pos.y
        );
    }

    /**
     * Handles the animation logic for the object.
     * Currently, it only moves the object left.
     */
    animate() {
        this.moveLeft();
    }
}
