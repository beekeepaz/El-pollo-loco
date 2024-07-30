class ThrowableObject extends MovableObject {
    IMAGES_ROTATE = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    IMAGES_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    currentSplash = false;
    world;
    intervalIDs = [];
    throwIntervalID;

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
    }

    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
    }

    stopGame() {
        if (window.stopButtonClicked) {
            this.intervalIDs.forEach(clearInterval);
            this.intervalIDs = [];
        }
    }

    animate() {
        this.setStoppableInterval(this.animateMove, 100);
        this.setStoppableInterval(this.stopGame, 100);
    }

    checkSplash() {
        this.currentSplash = true;
    }

    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throwIntervalID = setInterval(this.throwThisObject.bind(this), 1000 / 60);

        setTimeout(() => {
            clearInterval(this.throwIntervalID);
        }, 2000);
    }

    throwThisObject() {
        if (this.world.direction === 'right') {
            this.x += 10;
        } else if (this.world.direction === 'left') {
            this.x -= 10;
        }
    }

    animateMove() {
        if (this.currentSplash) {
            this.playAnimation(this.IMAGES_SPLASH);
        } else {
            this.playAnimation(this.IMAGES_ROTATE);
        }
    }
}
