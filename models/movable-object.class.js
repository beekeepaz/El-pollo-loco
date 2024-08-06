class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    otherDirections = false;
    speedY = 0;
    acceleration = 2.2;
    energy = 100;
    energyBoss = 100;
    salsacoins = 1;
    salsabottle = 1;
    lastHit = 0;
    lastCollectCoin = 0;
    lastCollectBottle = 0;
    laststand = 1;
    lastidle = 2;
    lastlongidle = 0;
    laststandTimout;
    idleTimeout;
    longIdleTimeout;

    /**
     * Determines if the last stand condition is met and sets a timeout to update state.
     * @returns {boolean|undefined} - Returns true if the last stand condition is met, otherwise undefined.
     */
    lastStand() {
        (this.lastidle !== 1 && this.lastlongidle !== 2)
            ? (this.laststand = 0, this.laststandTimout = setTimeout(() => {
                this.lastidle = 9;
                this.lastlongidle = 9;
            }, 1000))
            : null;

        return (this.laststand === 0) ? true : undefined;
    }

    /**
     * Checks if the last idle condition is met and sets a timeout to update state.
     * @returns {boolean|undefined} - Returns true if the last idle condition is met, otherwise undefined.
     */
    lastIdle() {
        (this.lastidle === 9 && this.lastlongidle === 9)
            ? this.idleTimeout = setTimeout(() => {
                this.laststand = 9;
                this.lastidle = 1;
                this.lastlongidle = 9;
            }, 1000)
            : null;

        return (this.lastidle === 1) ? true : undefined;
    }

    /**
     * Checks if the last long idle condition is met and updates state if so.
     * @returns {boolean|undefined} - Returns true if the last long idle condition is met, otherwise undefined.
     */
    lastLongIdle() {
        (this.lastidle === 9 && this.lastlongidle === 9)
            ? this.longIdleTimeout = setTimeout(() => {
                this.laststand = 9;
                this.lastidle = 9;
                this.lastlongidle = 2;
            }, 4000)
            : null;

        return (this.lastlongidle === 2) ? true : undefined;
    }

    /**
     * Resets idle state by clearing all related timeouts and resetting variables.
     */
    resetIdle() {
        clearTimeout(this.laststandTimout);
        clearTimeout(this.idleTimeout);
        clearTimeout(this.longIdleTimeout);
        this.resetIdleVariables();
    }

    /**
     * Resets idle-related variables to their initial values.
     */
    resetIdleVariables() {
        this.laststand = 1;
        this.lastidle = 2;
        this.lastlongidle = 0;
    }

    /**
     * Applies gravity to adjust the object's position and speed.
     * Continuously decreases the object's vertical speed and updates its position.
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 20);
    }

    /**
     * Determines if the object is above ground based on its type and position.
     * @returns {boolean} True if the object is above ground; otherwise, false.
     */
    isAboveGround() {
        return (this instanceof ThrowableObject) ? true :
            (this instanceof ChickenYellow) ? this.y < 352 :
                (this instanceof Endboss) ? this.y < 60 :
                    this.y < 148;
    }

    /**
     * Plays the animation by cycling through the provided images.
     * @param {string[]} images - An array of image paths for the animation.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.cacheImage[path];
        this.currentImage++;
    }

    /**
     * Moves the object to the right by increasing its `x` position.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left by decreasing its `x` position.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Checks if the object is in a boss attack state based on its `x` position.
     */
    isBossAttack() {
        this.x == 15;
    }

    /**
     * Sets the vertical speed for jumping.
     * @returns {number} The new vertical speed (30) for the jump.
     */
    jump() {
        return this.speedY = 30;
    }

    /**
     * Sets the vertical speed for jumping.
     * @returns {number} The vertical speed set for the jump (30).
     */
    jumpAt() {
        return this.speedY = 30;
    }

    /**
     * Sets the vertical speed for the chicken's jump using a random value.
     * @returns {number} The vertical speed set for the jump, determined by `getRandomJumpSpeed()`.
     */
    jumpChicken() {
        return this.speedY = this.getRandomJumpSpeed();
    }

    /**
     * Generates a random vertical speed for jumping, between 8 and 16 inclusive.
     * @returns {number} A random integer between 8 and 16.
     */
    getRandomJumpSpeed() {
        return Math.floor(Math.random() * (16 - 8 + 1)) + 8;
    }

    /**
     * Sets a fixed vertical speed for the boss's jump.
     * @returns {number} The fixed jump speed of 2.
     */
    jumpBoss() {
        return this.speedY = 2;
    }

    /**
     * Checks if the object is currently jumping.
     * @returns {boolean} `true` if the vertical speed is not zero and the object is above ground; otherwise, `false`.
     */
    isJumping() {
        return this.speedY != 0 && this.isAboveGround();
    }

    /**
     * Checks if the object is colliding with another object from above.
     * @param {object} enemy - The enemy object to check collision against.
     * @returns {boolean} `true` if the object is colliding with the enemy from above; otherwise, `false`.
     */
    isCollidingAbove(enemy) {
        if (this.isFalling()) {
            return this.x + this.width > enemy.x &&
                this.y + this.height > enemy.y &&
                this.x < enemy.x &&
                this.y < enemy.y + enemy.height;
        }
    }

    /**
     * Checks if the object is falling.
     * @returns {boolean} True if the object is falling, otherwise false.
     */
    isFalling() {
        return this.speedY < 0 && !this.isOnGround();
    }

    /**
     * Checks if the object is on the ground.
     * @returns {boolean} True if on the ground, false otherwise.
     */
    isOnGround() {
        return this.y >= this.groundLevel();
    }

    /**
     * Returns the ground level based on the instance type.
     * @returns {number} The ground level value.
     */
    groundLevel() {
        return (this instanceof ThrowableObject) ? 0 :
            (this instanceof ChickenYellow) ? 352 :
                (this instanceof Endboss) ? 60 :
                    (this instanceof Character) ? 148 :
                        0;
    }

    /**
     * Checks if there is a collision between the current object and another object.
     * @param {object} mo - The object to check collision against. This can be any game entity.
     * @returns {boolean} `true` if there is a collision; otherwise, `false`.
     */
    isColliding(mo) {
        return this instanceof Character
            ? this.characterColliding(mo)
            : this.allColliding(mo);
    }

    /**
     * Checks for collision between this character and another object.
     * @param {object} mo - The object to check for collision with.
     * @returns {boolean} - True if colliding, false otherwise. 
     */
    characterColliding(mo) {
        if (!this.isFalling()) {
            return this.x + this.width > mo.x &&
                this.y + 100 + (this.height - 100) > mo.y &&
                this.x < mo.x + mo.width &&
                this.y + 100 < mo.y + mo.height;
        }
    }

    /**
     * Checks for collision between this object and another object.
     * @param {object} mo - The object to check for collision with.
     * @returns {boolean} - True if colliding, false otherwise.
     */
    allColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    /**
     * Increments the number of collected coins and updates the last collection timestamp.
     */
    collectCoin() {
        this.salsacoins += 1;
        if (this.salsacoins > 100) {
            this.salsacoins = 100;
        } else {
            this.lastCollectCoin = new Date().getTime();
        }
    }

    /**
     * Increments the number of collected bottles and updates the last collection timestamp.
     */
    collectBottle() {
        this.salsabottle += 1;
        if (this.salsabottle > 100) {
            this.salsabottle = 100;
        } else {
            this.lastCollectBottle = new Date().getTime();
        }
    }

    /**
     * Reduces the boss's energy by 20 points and updates the last hit timestamp.
     */
    hitBoss() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Reduces the character's energy by 5 points and updates the last hit timestamp.
     */
    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    /**
     * Checks if the character is currently hurt based on the time elapsed since the last hit.
     * @returns {boolean} - Returns true if less than 1 second has passed since the character was last hit.
     */
    isHurt() {
        let timepass = new Date().getTime() - this.lastHit;
        timepass = timepass / 1000;
        return timepass < 1;
    }

    /**
     * Checks if the character is dead based on its energy level.
     * @returns {boolean} - Returns true if the character's energy is 0. 
     */
    isDead() {
        return this.energy == 0;
    }

    /**
     * Checks the type of the provided object and calls the appropriate method 
     * to mark it as dead.
     * @param {object} mo - The object to check. This can be an instance of Chicken or ChickenYellow.
     */
    checkDeadInstanz(mo) {
        if (mo instanceof Chicken) {
            mo.isDeadChicken();
        } else if (mo instanceof ChickenYellow) {
            mo.isDeadChickenSmart();
        }
    }

    /**
     * Checks if the provided object is an instance of ThrowableObject 
     * and calls the appropriate method to check for a splash.
     * @param {object} mo - The object to check. This should be an instance of ThrowableObject.
     */
    checkThrowInstanz(mo) {
        if (mo instanceof ThrowableObject) {
            mo.checkSplash();
        }
    }

    /**
     * Checks if the provided object is an instance of Endboss 
     * and calls the appropriate method to handle a boss hit.
     * @param {object} mo - The object to check. This should be an instance of Endboss.
     */
    checkBossInstanz(mo) {
        if (mo instanceof Endboss) {
            mo.hitBoss();
        }
    }
}
