class Character extends MovableObject {
    y = 80;
    height = 280;
    speed = 4;
    IMAGES_WALKING = [
        '../img/2_character_pepe/2_walk/W-21.png',
        '../img/2_character_pepe/2_walk/W-22.png',
        '../img/2_character_pepe/2_walk/W-23.png',
        '../img/2_character_pepe/2_walk/W-24.png',
        '../img/2_character_pepe/2_walk/W-25.png',
        '../img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        `../img/2_character_pepe/3_jump/J-31.png`,
        `../img/2_character_pepe/3_jump/J-32.png`,
        `../img/2_character_pepe/3_jump/J-33.png`,
        `../img/2_character_pepe/3_jump/J-34.png`,
        `../img/2_character_pepe/3_jump/J-35.png`,
        `../img/2_character_pepe/3_jump/J-36.png`,
        `../img/2_character_pepe/3_jump/J-37.png`,
        `../img/2_character_pepe/3_jump/J-38.png`,
        `../img/2_character_pepe/3_jump/J-39.png`
    ];
    IMAGES_DEAD = [
        `../img/2_character_pepe/5_dead/D-51.png`,
        `../img/2_character_pepe/5_dead/D-52.png`,
        `../img/2_character_pepe/5_dead/D-53.png`,
        `../img/2_character_pepe/5_dead/D-54.png`,
        `../img/2_character_pepe/5_dead/D-55.png`,
        `../img/2_character_pepe/5_dead/D-56.png`,
        `../img/2_character_pepe/5_dead/D-57.png`
    ];
    IMAGES_HURT = [
        `../img/2_character_pepe/4_hurt/H-41.png`,
        `../img/2_character_pepe/4_hurt/H-42.png`,
        `../img/2_character_pepe/4_hurt/H-43.png`
    ];
    IMAGES_IDLE = [
        '../img/2_character_pepe/1_idle/idle/I-1.png',
        '../img/2_character_pepe/1_idle/idle/I-2.png',
        '../img/2_character_pepe/1_idle/idle/I-3.png',
        '../img/2_character_pepe/1_idle/idle/I-4.png',
        '../img/2_character_pepe/1_idle/idle/I-5.png',
        '../img/2_character_pepe/1_idle/idle/I-6.png',
        '../img/2_character_pepe/1_idle/idle/I-7.png',
        '../img/2_character_pepe/1_idle/idle/I-8.png',
        '../img/2_character_pepe/1_idle/idle/I-9.png',
        '../img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONGIDLE = [
        '../img/2_character_pepe/1_idle/long_idle/I-11.png',
        '../img/2_character_pepe/1_idle/long_idle/I-12.png',
        '../img/2_character_pepe/1_idle/long_idle/I-13.png',
        '../img/2_character_pepe/1_idle/long_idle/I-14.png',
        '../img/2_character_pepe/1_idle/long_idle/I-15.png',
        '../img/2_character_pepe/1_idle/long_idle/I-16.png',
        '../img/2_character_pepe/1_idle/long_idle/I-17.png',
        '../img/2_character_pepe/1_idle/long_idle/I-18.png',
        '../img/2_character_pepe/1_idle/long_idle/I-19.png',
        '../img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    world;
    // walking_sound = new Audio("adiodatei");

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.applyGravityChar();
        this.animate();
    }

    setGroundImage() {
        this.loadImage(this.IMAGES_JUMPING[8]);
    }

    applyGravityChar() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    setWalkingAnimation() {
        return !this.isAboveGround() &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.RIGHT &&
            !this.isDead() &&
            !this.isHurt();
    }

    animate() {
        this.animateMove();
        this.animateImages();
    }

    animateMove() {
        setInterval(() => {
            // this.walking_sound.pause();
            this.keyRight();
            this.keyLeft();
            this.keyJump();
            this.charPosition();
        }, 1000 / 60);
    }

    keyRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            // this.walking_sound.play();
        }
    }

    keyLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            // this.walking_sound.play();
            this.otherDirection = true;
        }
    }

    keyJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
        }
    }

    charPosition() {
        this.world.camera_x = -this.x + 100;
    }

    animateImages() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
                this.resetIdle();
            } else if (this.isHurt() && !this.isCollidingAbove()) {
                this.playAnimation(this.IMAGES_HURT);
                this.resetIdle();
            } else if (this.isAboveGround()) {
                this.playAnimation(this.IMAGES_JUMPING);
                this.resetIdle();
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.IMAGES_WALKING);
                this.resetIdle();
            }
        }, 100);

        setInterval(() => {
            if (this.lastStand() && this.setWalkingAnimation()) {
                this.setGroundImage(); 
            };
        }, 200);

        setInterval(() => {
            if (this.lastIdle() && this.setWalkingAnimation()) {
                this.playAnimation(this.IMAGES_IDLE);
            }
        }, 200);

        setInterval(() => {
            if (this.lastLongIdle() && this.setWalkingAnimation()) {
                this.playAnimation(this.IMAGES_LONGIDLE); 
            };
        }, 200);
    }

    // gameOver() {
    //     if(this.IMAGES_DEAD = this.IMAGES_DEAD.length -1) {
    //         this.deleteChar();
    //     }
    // }
}
