class ThrowableObject extends MovableObject {
    IMAGES_ROTATE = [
        '../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        '../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        '../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    currentSplash = false;
    world;
    intervalIDs = [];

    constructor(x, y) {
        super().loadImage('../img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.IMAGES_ROTATE);
        this.loadImages(this.IMAGES_SPLASH);
        this.world = world;
        this.x = x;
        this.y = y;
        this.height = 100;
        this.throw();
        this.animate();
        // this.stopGame();
    }

    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
        console.log(id);
    }

    stopGame() {
        // if (this.keyboard.W) {
        //     this.intervalIDs.forEach(clearInterval);
        // }
        let end = document.getElementById('end');
        console.log(end);
    }

    animate() {
        this.setStoppableInterval(this.animateMove, 100);
        this.setStoppableInterval(this.changeDirektion, 1000 / 60);
    }

    changeDirektion() {
        // this.walking_sound.pause();
        this.keyRight();
        this.keyLeft();
    }

    keyRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.otherDirection = false;
            // this.walking_sound.play();
        }
    }

    keyLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            // this.walking_sound.play();
            this.otherDirection = true;
        }
    }

    checkSplash() {
        this.currentSplash = true;
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.setStoppableInterval(this.throwThisObject, 1000 / 60);
    }

    throwThisObject() {
        this.x += 10;
    }

    animateMove() {
        if (this.currentSplash) {
            this.playAnimation(this.IMAGES_SPLASH);
        } else {
            this.playAnimation(this.IMAGES_ROTATE);
        }
    }
}