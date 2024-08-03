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

    setWorld() {
        this.character.world = this;
    }

    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
    }

    stopGame() {
        setInterval(() => {
            if (window.stopButtonClicked) {
                this.intervalIDs.forEach(clearInterval);
                this.intervalIDs = [];
            }
        }, 100);
    }

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

    spliceEnemie(e) {
        setTimeout(() => {
            this.level.enemies.splice(e, 1);
        }, 500);
    }

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

    attackedSound() {
        if (window.soundEnabled === true) {
            this.attack_sound.play();
        }
    }

    attackedBossSound() {
        if (window.soundEnabled === true) {
            this.attack_boss_sound.play();
        }
    }

    collectedCoinSound() {
        if (window.soundEnabled === true) {
            this.coin_sound.play();
        }
    }

    collectedBottleSound() {
        if (window.soundEnabled === true) {
            this.bottle_sound.play();
        }
    }

    gameSound() {
        if (window.soundEnabled === true) {
            this.game_sound.play();
        }
    }

    checkCollisionsAbove() {
        this.level.enemies.forEach((enemy, index) => {
            if (this.collidingAboveSet(enemy, index)) {
                return;
            }
        });
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.throwObjekt()) {
            this.direction = this.character.otherDirection ? 'left' : 'right';
            let bottle = new ThrowableObject(this.character.x, this.character.y + 100, this.direction);
            this.ThrowableObject.push(bottle);
            let thrownbottles = this.currentcollectbottle - this.ThrowableObject.length;
            this.updateStatusBarSalsa(thrownbottles);
        }
    }

    checkThrowCollision() {
        this.ThrowableObject.forEach((throwbottle) => {
            this.checkCollisionWithEnemies(throwbottle);
            this.collidingBossBottle(throwbottle);
        });
    }

    checkCollisionWithEnemies(throwbottle) {
        this.level.enemies.forEach((enemy, index) => {
            this.collidingBottle(throwbottle, enemy, index);
        });
    }

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

    collidingBossBottle(throwbottle) {
        if (throwbottle.isColliding(this.bigboss)) {
            throwbottle.checkBossInstanz(this.bigboss);
            this.statusBarEndboss.setPercentage(this.bigboss.energy);
            throwbottle.checkThrowInstanz(throwbottle);
            this.attackedBossSound();
        }
    }

    checkStatusBarEndboss() {
        if (this.character.x >= 2200) {
            this.setBar = true;
        }
    }

    updateStatusBarSalsa(bottles) {
        let percentage = Math.min((bottles / this.maxBottles) * 100, 100);
        this.statusBarSalsa.setPercentage(percentage);
    }

    throwObjekt() {
        return this.ThrowableObject.length + 1 < this.character.salsabottle;
    }

    checkCollisions() {
        this.level.enemies.forEach((enemy) => {
            if (this.character.isColliding(enemy) && !this.character.isJumping() || this.character.isColliding(this.bigboss)) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

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

    updateCoins() {
        let collectedCoins = this.character.salsacoins;
        let maxCoins = 6;
        let percentage = Math.min((collectedCoins / maxCoins) * 100, 100);
        this.statusBarCoin.setPercentage(percentage);
    }

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

    updateBottle() {
        let collectedBottles = this.character.salsabottle;
        this.currentcollectbottle = collectedBottles;
        let thrownbottles = this.currentcollectbottle - this.ThrowableObject.length;
        this.updateStatusBarSalsa(thrownbottles);
    }

    draw() {
        this.clearCanvas();
        this.drawBackground();
        this.drawStatusBars();
        this.drawLevelObjects();
        this.drawCharactersAndEnemies();
        this.requestNextFrame();
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    translateCanvas() {
        this.ctx.translate(this.camera_x, 0);
    }

    resetTranslation() {
        this.ctx.translate(-this.camera_x, 0);
    }

    drawBackground() {
        this.translateCanvas();
        this.addObjectsToMap(this.level.backgroundsObjects);
        this.addObjectsToMap(this.level.clouds);
        this.resetTranslation();
    }

    drawStatusBars() {
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarSalsa);

        if (this.setBar) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    drawLevelObjects() {
        this.translateCanvas();
        this.addObjectsToMap(this.level.salsabottle);
        this.addObjectsToMap(this.level.coins);
        this.resetTranslation();
    }

    drawCharactersAndEnemies() {
        this.translateCanvas();
        this.addToMap(this.bigboss);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.ThrowableObject);
        this.resetTranslation();
    }

    requestNextFrame() {
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            o.draw(this.ctx);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}