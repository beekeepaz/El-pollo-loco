class World {
    character = new Character();
    bigboss = new Endboss(this);
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBar = new StatusBar();
    statusBarCoin = new StatusBarCoin();
    statusBarSalsa = new StatusBarSalsa();
    statusBarEndboss = new statusBarEndboss();
    ThrowableObject = [];
    maxBottles = 13;
    currentcollectbottle = 0;
    lastThrowTime = 0;
    throwCooldown = 2000;
    intervalIDs = [];
    direction;
    setBar = false;
    attack_sound = new Audio("audio/chicken.mp3");
    attack_boss_sound = new Audio("audio/hit-endboss.mp3");
    game_sound = new Audio("audio/Beginning.mp3");
    coin_sound = new Audio("audio/coins.mp3");
    bottle_sound = new Audio("audio/bottle.mp3");

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
        this.stopGame();
    }

    /**
     * Sets the world for the character.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
    * Sets an interval that can be stopped later.
    * @param {Function} fn - The function to be executed repeatedly.
    * @param {number} time - The time interval (in milliseconds) between executions.
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
    }

    /**
     * Stops all running intervals if the stop button was clicked.
     */
    stopGame() {
        setInterval(() => {
            if (window.stopButtonClicked) {
                this.intervalIDs.forEach(clearInterval);
                this.intervalIDs = [];
                this.game_sound.pause();
            }
        }, 100);
    }

    /**
     * Runs multiple intervals to check different game states and actions.
     */
    run() {
        this.setStoppableInterval(this.checkCollisions, 200);
        this.setStoppableInterval(this.checkCollectCoins, 200);
        this.setStoppableInterval(this.checkCollectBottles, 200);
        this.setStoppableInterval(this.checkThrowObjects, 200);
        this.setStoppableInterval(this.checkThrowCollision, 200);
        this.setStoppableInterval(this.checkCollisionsAbove, 200);
        this.setStoppableInterval(this.checkStatusBarEndboss, 200);
        this.setStoppableInterval(this.gameSound, 200);
    }

    /**
     * Removes an enemy from the level's enemies array.
     * @param {number} e - The index of the enemy to remove.
     */
    spliceEnemie(e) {
        setTimeout(() => {
            this.level.enemies.splice(e, 1);
        }, 500);
    }

    /**
     * Checks if the character is colliding above an enemy and handles the collision.
     * @param {object} enemy - The enemy object to check collision with.
     * @param {number} index - The index of the enemy in the enemies array.
     * @returns {boolean} - Returns true if there was a collision, false otherwise.
     */
    collidingAboveSet(enemy, index) {
        if (this.character.isCollidingAbove(enemy)) {
            enemy.checkDeadInstanz(enemy);
            this.spliceEnemie(index);
            this.character.jumpAt();
            this.attackedSound();
            return true;
        }
        return false;
    }

    /**
     * Plays the attack sound if sound is enabled.
     */
    attackedSound() {
        if (window.soundEnabled === true) {
            this.attack_sound.play();
        }
    }

    /**
     * Plays the attack sound if sound is enabled.
     */
    attackedBossSound() {
        if (window.soundEnabled === true) {
            this.attack_boss_sound.play();
        }
    }

    /**
     * Plays the attack sound if sound is enabled.
     */
    collectedCoinSound() {
        if (window.soundEnabled === true) {
            this.coin_sound.play();
        }
    }

    /**
     * Plays the attack sound if sound is enabled.
     */
    collectedBottleSound() {
        if (window.soundEnabled === true) {
            this.bottle_sound.play();
        }
    }

    /**
     * Plays the attack sound if sound is enabled.
     */
    gameSound() {
        if (window.soundEnabled === true) {
            this.game_sound.play();
        } else {
            this.game_sound.pause();
        }
    }

    /**
     * Checks for collisions with enemies above the character and handles them.
     */
    checkCollisionsAbove() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.collidingAboveSet(enemy, index)) {
                return;
            }
        });
    }

    /**
     * Checks if the throw key is pressed and handles the throwing of objects.
     */
    checkThrowObjects() {
        const now = Date.now();
        if (this.keyboard.D && this.throwObjekt() && now - this.lastThrowTime >= this.throwCooldown) {
            this.direction = this.character.otherDirection ? 'left' : 'right';
            let bottle = new ThrowableObject(this.character.x, this.character.y + 100, this.direction);
            this.ThrowableObject.push(bottle);
            let thrownbottles = this.currentcollectbottle - this.ThrowableObject.length;
            this.updateStatusBarSalsa(thrownbottles);
            this.lastThrowTime = now;
        }
    }

    /**
     * Checks for collisions between thrown objects and enemies or bosses.
     */
    checkThrowCollision() {
        this.ThrowableObject.forEach((throwbottle) => {
            this.checkCollisionWithEnemies(throwbottle);
            this.collidingBossBottle(throwbottle);
        });
    }

    /**
     * Checks for collisions between a thrown object and enemies.
     * @param {object} throwbottle - The thrown object to check for collisions.
     */
    checkCollisionWithEnemies(throwbottle) {
        this.level.enemies.forEach((enemy, index) => {
            this.collidingBottle(throwbottle, enemy, index);
        });
    }

    /**
     * Checks for collisions between a thrown bottle and an enemy, handles the collision, and updates the game state.
     * @param {object} throwbottle - The thrown bottle object to check for collisions.
     * @param {object} enemy - The enemy object to check for collisions.
     * @param {number} e - The index of the enemy in the enemies array.
     * @returns {boolean} - Returns true if there was a collision, false otherwise.
     */
    collidingBottle(throwbottle, enemy, e) {
        if (throwbottle.isColliding(enemy)) {
            enemy.checkDeadInstanz(enemy);
            throwbottle.checkThrowInstanz(throwbottle);
            this.spliceEnemie(e);
            this.attackedSound();
            return true;
        }
        return false;
    }

    /**
     * Checks for collisions between a thrown bottle and the boss, handles the collision, and updates the game state.
     * @param {object} throwbottle - The thrown bottle object to check for collisions.
     */
    collidingBossBottle(throwbottle) {
        if (throwbottle.isColliding(this.bigboss)) {
            throwbottle.checkBossInstanz(this.bigboss);
            this.statusBarEndboss.setPercentage(this.bigboss.energy);
            throwbottle.checkThrowInstanz(throwbottle);
            this.attackedBossSound();
        }
    }

    /**
     * Checks if the character has reached the specified position to set the status bar for the end boss.
     */
    checkStatusBarEndboss() {
        if (this.character.x >= 2200) {
            this.setBar = true;
        }
    }

    /**
     * Updates the salsa status bar based on the number of collected bottles.
     * @param {number} bottles - The number of collected bottles.
     */
    updateStatusBarSalsa(bottles) {
        let percentage = Math.min((bottles / this.maxBottles) * 100, 100);
        this.statusBarSalsa.setPercentage(percentage);
    }

    /**
     * Checks if the number of throwable objects is less than the number of collected bottles.
     * @returns {boolean} - Returns `true` if the number of throwable objects is less than the number of collected bottles, otherwise `false`.
     */
    throwObjekt() {
        return this.ThrowableObject.length + 1 < this.character.salsabottle;
    }

    /**
     * Checks for collisions between the character and enemies or the boss.
     * If a collision is detected and the character is not jumping, or if the character collides with the boss,
     * the character takes damage and the status bar is updated.
     */
    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isJumping() || this.character.isColliding(this.bigboss)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    /**
     * Checks for collisions between the character and coins. If a collision is detected,
     * the coin is collected, removed from the level, and a sound is played. 
     * If any coins were collected, the coin count is updated.
     */
    checkCollectCoins() {
        let updated = false;
        this.level.coins.forEach((coins, index) => {
            if (this.character.isColliding(coins)) {
                this.character.collectCoin();
                this.level.coins.splice(index, 1);
                this.collectedCoinSound();
                updated = true;
            }
        });
        if (updated) {
            this.updateCoins();
        }
    }

    /**
     * Updates the coin status bar based on the number of collected coins.
     */
    updateCoins() {
        let collectedCoins = this.character.salsacoins;
        let maxCoins = 6;
        let percentage = Math.min((collectedCoins / maxCoins) * 100, 100);
        this.statusBarCoin.setPercentage(percentage);
    }

    /**
     * Checks for collisions between the character and collectible bottles.
     * If a collision is detected, it updates the bottle count and the status bar.
     */
    checkCollectBottles() {
        let updated = false;
        this.level.salsabottle.forEach((salsabottle, index) => {
            if (this.character.isColliding(salsabottle)) {
                this.character.collectBottle();
                this.level.salsabottle.splice(index, 1);
                this.collectedBottleSound();
                updated = true;
            }
        });

        if (updated) {
            this.updateBottle();
        }
    }

    /**
     * Updates the status bar for the collected bottles.
     */
    updateBottle() {
        let collectedBottles = this.character.salsabottle;
        this.currentcollectbottle = collectedBottles;
        let thrownbottles = this.currentcollectbottle - this.ThrowableObject.length;
        this.updateStatusBarSalsa(thrownbottles);
    }

    /**
     * Draws the game scene by clearing the canvas and rendering all components.
     */
    draw() {
        this.clearCanvas();
        this.drawBackground();
        this.drawStatusBars();
        this.drawLevelObjects();
        this.drawCharactersAndEnemies();
        this.requestNextFrame();
    }

    /**
     * Clears the entire canvas by removing all previous drawings.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Translates the canvas context horizontally by the current camera position.
     */
    translateCanvas() {
        this.ctx.translate(this.camera_x, 0);
    }

    /**
     * Resets the canvas translation by moving the canvas back to its original position.
     */
    resetTranslation() {
        this.ctx.translate(-this.camera_x, 0);
    }

    /**
     * Draws the background by applying canvas translation, adding background objects and clouds, and then resetting the translation.
     */
    drawBackground() {
        this.translateCanvas();
        this.addObjectsToMap(this.level.backgroundsObjects);
        this.addObjectsToMap(this.level.clouds);
        this.resetTranslation();
    }

    /**
     * Draws the status bars on the canvas.
     * Adds the main status bar, coin status bar, salsa status bar, and optionally the endboss status bar to the map.
     */
    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarSalsa);

        if (this.setBar) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    /**
     * Draws the level objects on the canvas.
     * Adds salsa bottles and coins to the map with the current canvas translation.
     */
    drawLevelObjects() {
        this.translateCanvas();
        this.addObjectsToMap(this.level.salsabottle);
        this.addObjectsToMap(this.level.coins);
        this.resetTranslation();
    }

    /**
     * Draws the characters and enemies on the canvas.
     * Adds the big boss, the main character, all enemies, and throwable objects to the map with the current canvas translation.
     */
    drawCharactersAndEnemies() {
        this.translateCanvas();
        this.addToMap(this.bigboss);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.ThrowableObject);
        this.resetTranslation();
    }

    /**
     * Requests the next animation frame to continuously draw the game.
     * Utilizes the browser's `requestAnimationFrame` method to ensure smooth animation updates.
     */
    requestNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Draws an array of objects onto the canvas.
     * @param {Object[]} objects - The array of objects to be drawn on the canvas.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            o.draw(this.ctx);
        });
    }

    /**
     * Draws an object on the canvas and handles its direction.
     * @param {Object} mo - The object to be drawn on the canvas.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Flips the image of an object horizontally.
     * @param {Object} mo - The object whose image will be flipped.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Flips the image of an object back to its original orientation.
     * @param {Object} mo - The object whose image will be flipped back.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}