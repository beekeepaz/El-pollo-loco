class World {
    character = new Character();
    bigboss = new Endboss();
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
    maxBottles = 7;
    currentcollectbottle = 0;

    constructor(canvas) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkCollectUp();
            this.checkCollectUpS();
            this.checkThrowObjects();
            this.checkThrowCollision();
            this.checkCollisionsAbove();
            // this.checkCollisionEndboss();
        }, 200);
    }

    checkCollisionsAbove() {
        for (let e = 0; e < this.level.enemies.length; e++) {
            let enemy = this.level.enemies[e];
            if (this.character.isCollidingAbove(enemy)) {
                enemy.checkDeadInstanz(enemy);
                setTimeout(() => {
                    this.level.enemies.splice(e, 1);
                }, 1000);
                this.character.jumpAt();
                break;
            }
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.throwObjekt()) {
            let bottle = new ThrowableObject(this.character.x + 100, this.character.y + 100);
            this.ThrowableObject.push(bottle);
            let thrownbottles = this.currentcollectbottle - this.ThrowableObject.length;
            this.updateStatusBarSalsa(thrownbottles);
        }
    }

    checkThrowCollision() {
        for (let t = 0; t < this.ThrowableObject.length; t++) {
            let throwbottle = this.ThrowableObject[t];
            for (let e = 0; e < this.level.enemies.length; e++) {
                let enemy = this.level.enemies[e];
                if (throwbottle.isColliding(enemy)) {
                    enemy.checkDeadInstanz(enemy);
                    throwbottle.checkThrowInstanz(throwbottle);
                    // setTimeout(() => {
                    //     this.ThrowableObject.splice(t, 1);
                    // }, 200);
                    setTimeout(() => {
                        this.level.enemies.splice(e, 1);
                    }, 1000);
                    break;
                }
            }
            if (throwbottle.isColliding(this.bigboss)) {
                throwbottle.checkBossInstanz(this.bigboss);
                this.statusBarEndboss.setPercentage(this.bigboss.energy);
                throwbottle.checkThrowInstanz(throwbottle);
                // setTimeout(() => {
                //     this.ThrowableObject.splice(t, 1);
                // }, 200);
            }
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
            if (this.character.isColliding(enemy) && !this.character.isJumping()) {
                this.character.hit();
                this.statusBar.setPercentage(this.character.energy);
            }
        });
    }

    // checkCollisionEndboss() {
    //     for (let t = 0; t < this.ThrowableObject.length; t++) {
    //         let throwbottle = this.ThrowableObject[t];
    //         if (this.bigboss.isColliding(throwbottle)) {
    //             throwbottle.checkThrowInstanz(throwbottle);
    //             setTimeout(() => {
    //                 this.ThrowableObject.splice(t, 1);
    //             }, 500);
    //             this.bigboss.hit();
    //             this.statusBarEndboss.setPercentage(this.bigboss.energy);
    //             break;
    //         }
    //     };
    // }

    checkCollectUp() {
        let updated = false;
        for (let c = 0; c < this.level.coins.length; c++) {
            let coins = this.level.coins[c];
            if (this.character.isColliding(coins)) {
                this.character.collect();
                this.level.coins.splice(c, 1);
                updated = true;
                break;
            }
        }
        if (updated) {
            let collectedCoins = this.character.salsacoins;
            let maxCoins = 6;
            let percentage = Math.min((collectedCoins / maxCoins) * 100, 100);
            this.statusBarCoin.setPercentage(percentage);
        }
    }

    checkCollectUpS() {
        let updated = false;
        for (let i = 0; i < this.level.salsabottle.length; i++) {
            let salsabottle = this.level.salsabottle[i];
            if (this.character.isColliding(salsabottle)) {
                this.character.collectS();
                this.level.salsabottle.splice(i, 1);
                updated = true;
                break;
            }
        }
        if (updated) {
            let collectedBottles = this.character.salsabottle;
            this.currentcollectbottle = collectedBottles;
            let thrownbottles = this.currentcollectbottle - this.ThrowableObject.length;
            this.updateStatusBarSalsa(thrownbottles);
        }
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

        this.addToMap(this.bigboss);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.salsabottle);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.ThrowableObject);

        this.ctx.translate(-this.camera_x, 0);

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

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