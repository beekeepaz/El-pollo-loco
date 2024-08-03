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

    lastStand() {
        (this.lastidle !== 1 && this.lastlongidle !== 2)
            ? (this.laststand = 0, this.laststandTimout = setTimeout(() => {
                this.lastidle = 9;
                this.lastlongidle = 9;
            }, 1000))
            : null;

        return (this.laststand === 0) ? true : undefined;
    }

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

    resetIdle() {
        clearTimeout(this.laststandTimout);
        clearTimeout(this.idleTimeout);
        clearTimeout(this.longIdleTimeout);
        this.resetIdleVariables();
    }

    resetIdleVariables() {
        this.laststand = 1;
        this.lastidle = 2;
        this.lastlongidle = 0;
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 20);
    }

    isAboveGround() {
        return (this instanceof ThrowableObject) ? true :
            (this instanceof ChickenYellow) ? this.y < 352 :
                (this instanceof Endboss) ? this.y < 60 :
                    this.y < 148;
    }

    isOnGround() {
        if (this instanceof Character) {
            return this.y = 148;
        }
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.cacheImage[path];
        this.currentImage++;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    isBossAttack() {
        this.x == 15;
    }

    jump() {
        return this.speedY = 30;
    }

    jumpAt() {
        return this.speedY = 30;

    }

    jumpChicken() {
        return this.speedY = this.getRandomJumpSpeed();
    }

    getRandomJumpSpeed() {
        return Math.floor(Math.random() * (16 - 8 + 1)) + 8;
    }

    jumpBoss() {
        return this.speedY = 2;
    }

    isJumping() {
        return this.speedY != 0 && this.isAboveGround();
    }

    isCollidingAbove(enemy) {
        if (this.isJumping() && !this.isHurt()) {
            return this.x + this.width > enemy.x &&
                this.y + (this.height + 16) > enemy.y &&
                this.x < enemy.x &&
                this.y < enemy.y + enemy.height;
        }
    }

    isColliding(mo) {
        return this instanceof Character
            ? this.characterColliding(mo)
            : this.allColliding(mo);
    }


    characterColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + 100 + (this.height - 100) > mo.y &&
            this.x < mo.x + mo.width &&
            this.y + 100 < mo.y + mo.height;
    }

    allColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }


    collectCoin() {
        this.salsacoins += 1;
        if (this.salsacoins > 100) {
            this.salsacoins = 100;
        } else {
            this.lastCollectCoin = new Date().getTime();
        }
    }

    collectBottle() {
        this.salsabottle += 1;
        if (this.salsabottle > 100) {
            this.salsabottle = 100;
        } else {
            this.lastCollectBottle = new Date().getTime();
        }
    }

    hitBoss() {
        this.energy -= 20;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    isHurt() {
        let timepass = new Date().getTime() - this.lastHit;
        timepass = timepass / 1000;
        return timepass < 1;
    }

    isDead() {
        return this.energy == 0;
    }

    checkDeadInstanz(mo) {
        if (mo instanceof Chicken) {
            mo.isDeadChicken();
        } else if (mo instanceof ChickenYellow) {
            mo.isDeadChickenSmart();
        }
    }

    checkThrowInstanz(mo) {
        if (mo instanceof ThrowableObject) {
            mo.checkSplash();
        }
    }

    checkBossInstanz(mo) {
        if (mo instanceof Endboss) {
            mo.hitBoss();
        }
    }
}
