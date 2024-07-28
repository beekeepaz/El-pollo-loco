class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 20;
    x = 2876;
    acceleration = 0.1;
    speed = 0.4;

    IMAGES_WALKING = [
        `../img/4_enemie_boss_chicken/1_walk/G1.png`,
        `../img/4_enemie_boss_chicken/1_walk/G2.png`,
        `../img/4_enemie_boss_chicken/1_walk/G3.png`,
        `../img/4_enemie_boss_chicken/1_walk/G4.png`
    ];

    IMAGES_ALERT = [
        `../img/4_enemie_boss_chicken/2_alert/G5.png`,
        `../img/4_enemie_boss_chicken/2_alert/G6.png`,
        `../img/4_enemie_boss_chicken/2_alert/G7.png`,
        `../img/4_enemie_boss_chicken/2_alert/G8.png`,
        `../img/4_enemie_boss_chicken/2_alert/G9.png`,
        `../img/4_enemie_boss_chicken/2_alert/G10.png`,
        `../img/4_enemie_boss_chicken/2_alert/G11.png`,
        `../img/4_enemie_boss_chicken/2_alert/G12.png`
    ];

    IMAGES_ATTACK = [
        '../img/4_enemie_boss_chicken/3_attack/G13.png',
        '../img/4_enemie_boss_chicken/3_attack/G14.png',
        '../img/4_enemie_boss_chicken/3_attack/G15.png',
        '../img/4_enemie_boss_chicken/3_attack/G16.png',
        '../img/4_enemie_boss_chicken/3_attack/G17.png',
        '../img/4_enemie_boss_chicken/3_attack/G18.png',
        '../img/4_enemie_boss_chicken/3_attack/G19.png',
        '../img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    IMAGES_HURT = [
        '../img/4_enemie_boss_chicken/4_hurt/G21.png',
        '../img/4_enemie_boss_chicken/4_hurt/G22.png',
        '../img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    IMAGES_DEAD = [
        '../img/4_enemie_boss_chicken/5_dead/G24.png',
        '../img/4_enemie_boss_chicken/5_dead/G25.png',
        '../img/4_enemie_boss_chicken/5_dead/G26.png'
    ];
    world;
    movementStarted = false;
    attackAnimationStarted = false;
    intervalIDs = [];

    constructor(world) {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.world = world;
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.applyGravity();
        this.animate();
        this.stopGame();
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

    gameOver() {
        if (this.isDead()) {
            setTimeout(() => {
                gameOver();
            }, 1000);
        }
    }

    animate() {
        this.setStoppableInterval(this.animationMove, 100);
        this.setStoppableInterval(this.automaticMove, 100);
        this.setStoppableInterval(this.gameOver, 100);
    }

    animationMove() {
        this.updateAnimation();
    }

    automaticMove() {
        if (this.isMoving() && !this.movementStarted) {
            if (!this.attackAnimationStarted) {
                this.attackAnimationStarted = true;
                setTimeout(() => {
                    this.movementStarted = true;
                    setInterval(() => {
                        this.moveLeft();
                    }, 1000 / 60);
                }, 3000);
            }
        }
    }

    isMoving() {
        return this.world.character.x >= 2200;
    }

    updateAnimation() {
        const state = this.getCurrentState();
        const images = this.getImagesForState(state);
        this.playAnimation(images);
    }

    getCurrentState() {
        if (this.isDead()) {
            return 'dead';
        } else if (this.isHurt()) {
            return 'hurt';
        } else if (this.attackAnimationStarted && !this.movementStarted || this.speed === 2.4) {
            return 'bossAttack';
        } else if (this.isMoving()) {
            return 'moving';
        } else {
            return 'moving';
        }
    }

    getImagesForState(state) {
        const stateToImagesMap = {
            dead: this.IMAGES_DEAD,
            hurt: this.IMAGES_HURT,
            moving: this.IMAGES_WALKING,
            bossAttack: this.IMAGES_ATTACK,
        };

        return stateToImagesMap[state];
    }
}
