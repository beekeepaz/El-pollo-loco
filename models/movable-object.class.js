class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.2;
    energy = 100;
    salsacoins = 1;
    salsabottle = 1;
    lastHit = 0;
    lastCollect = 0;
    lastCollectS = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 20);
    }

    isAboveGround() {
        if (this instanceof ThrowableObject) {
            return true;
        } else if (this instanceof ChickenYellow)
            return this.y < 352;
        else {
            return this.y < 148;
        }
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

    jump() {
        return this.speedY = 30;
    }

    jumpAt() {
        return this.speedY = 30;

    }

    jumpChicken() {
        return this.speedY = 16;
    }

    isCollidingAbove(enemy) {
        if (!this.speedY == 0 && this.isAboveGround()) {
            return this.x + this.width > enemy.x &&
                this.y + this.height > enemy.y &&
                this.x < enemy.x &&
                this.y < enemy.y + enemy.height;
        }
    }

    isColliding(mo) {
        if (this instanceof Character) {
            return this.x + this.width > mo.x &&
                this.y + 100 + (this.height - 100) > mo.y &&
                this.x < mo.x + mo.width &&
                this.y + 100 < mo.y + mo.height;
        } else {
            return this.x + this.width > mo.x &&
                this.y + this.height > mo.y &&
                this.x < mo.x &&
                this.y < mo.y + mo.height;
        }
    }

    collect() {
        this.salsacoins += 1;
        if (this.salsacoins > 100) {
            this.salsacoins = 100;
        } else {
            this.lastCollect = new Date().getTime();
        }
    }

    collectS() {
        this.salsabottle += 1;
        if (this.salsabottle > 100) {
            this.salsabottle = 100;
        } else {
            this.lastCollectS = new Date().getTime();
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

    // isColliding(obj) {
    //     return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
    //         (this.y + this.offsetY + this.height) >= obj.y &&
    //         (this.y + this.offsetY) <= (obj.y + obj.height) &&
    //         obj.onCollisionCourse; /

    // }

}
