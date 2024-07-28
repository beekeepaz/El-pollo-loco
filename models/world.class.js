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
    }

    spliceEnemie(e) {
        setTimeout(() => {
            this.level.enemies.splice(e, 1);
        }, 1000);
    }

    collidingAboveSet(enemy, index) {
        if (this.character.isCollidingAbove(enemy)) {
            enemy.checkDeadInstanz(enemy);
            this.spliceEnemie(index);
            this.character.jumpAt();
            return true;
        }
        return false;
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
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100, this.direction);
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
            return true;
        }
        return false;
    }

    collidingBossBottle(throwbottle) {
        if (throwbottle.isColliding(this.bigboss)) {
            throwbottle.checkBossInstanz(this.bigboss);
            this.statusBarEndboss.setPercentage(this.bigboss.energy);
            throwbottle.checkThrowInstanz(throwbottle);
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
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.heigth);

        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundsObjects);
        this.addObjectsToMap(this.level.clouds);

        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.statusBarCoin);
        this.addToMap(this.statusBarSalsa);

        if (this.character.x >= 2200) {
            this.addToMap(this.statusBarEndboss);
        }

        this.ctx.translate(this.camera_x, 0);

        this.addObjectsToMap(this.level.salsabottle);
        this.addObjectsToMap(this.level.coins);

        this.ctx.translate(-this.camera_x, 0);

        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.bigboss);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.ThrowableObject);

        this.ctx.translate(-this.camera_x, 0);


        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            if (o.otherDirection) {
                this.flipImage(o);
            }
            o.draw(this.ctx);
            // o.drawFrame(this.ctx);

            if (o.otherDirection) {
                this.flipImageBack(o);
            }
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        // mo.drawFrame(this.ctx);

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