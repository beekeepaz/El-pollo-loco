class MovableObject extends DrawableObject {
    speed = 0.2;
    otherDirection = false;
    speedY = 0;
    acceleration = 2.2;
    energy = 100;
    salsacoins = 0;
    lastHit = 0;

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 1000 / 20);
    }

    isAboveGround() {
        if(this instanceof ThrowableObject) {
            return true;
        } else if (this instanceof ChickenYellow)
            return this.y < 352;
        else {
            return this.y < 148;
        } 
    }

    isOnGround() {
        if(this instanceof Character) {
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

    isColliding(mo) {
        return this.x + this.width > mo.x &&
            this.y + this.height > mo.y &&
            this.x < mo.x &&
            this.y < mo.y + mo.height;
    }

    collect() {
        this.salsacoins += 5;
        if (this.salsacoins > 100) {
            this.salsacoins = 100;
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

    // isColliding(obj) {
    //     return (this.x + this.width) >= obj.x && this.x <= (obj.x + obj.width) &&
    //         (this.y + this.offsetY + this.height) >= obj.y &&
    //         (this.y + this.offsetY) <= (obj.y + obj.height) &&
    //         obj.onCollisionCourse; /

    // }

}
