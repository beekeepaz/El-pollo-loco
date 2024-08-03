class Character extends MovableObject {
    y = 80;
    height = 280;
    speed = 4;
    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];
    IMAGES_JUMPING = [
        `img/2_character_pepe/3_jump/J-31.png`,
        `img/2_character_pepe/3_jump/J-32.png`,
        `img/2_character_pepe/3_jump/J-33.png`,
        `img/2_character_pepe/3_jump/J-34.png`,
        `img/2_character_pepe/3_jump/J-35.png`,
        `img/2_character_pepe/3_jump/J-36.png`,
        `img/2_character_pepe/3_jump/J-37.png`,
        `img/2_character_pepe/3_jump/J-38.png`,
        `img/2_character_pepe/3_jump/J-39.png`
    ];
    IMAGES_DEAD = [
        `img/2_character_pepe/5_dead/D-51.png`,
        `img/2_character_pepe/5_dead/D-52.png`,
        `img/2_character_pepe/5_dead/D-53.png`,
        `img/2_character_pepe/5_dead/D-54.png`,
        `img/2_character_pepe/5_dead/D-55.png`,
        `img/2_character_pepe/5_dead/D-56.png`,
        `img/2_character_pepe/5_dead/D-57.png`
    ];
    IMAGES_HURT = [
        `img/2_character_pepe/4_hurt/H-41.png`,
        `img/2_character_pepe/4_hurt/H-42.png`,
        `img/2_character_pepe/4_hurt/H-43.png`
    ];
    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];
    IMAGES_LONGIDLE = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];
    world;
    intervalIDs = [];
    walking_sound = new Audio("audio/run.mp3");
    jumping_sound = new Audio("audio/jump.mp3");
    snoring_sound = new Audio("audio/snore.mp3");
    hurt_sound = new Audio("audio/hurt.mp3");

    constructor() {
        super().loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONGIDLE);
        this.animate();
        this.animateImages();
    }

    /**
    * Sets an interval that can be stopped later.
    * @param {Function} fn - The function to be executed repeatedly.
    * @param {number} time - The time interval (in milliseconds) between executions.
     */
    setStoppableInterval(fn, time) {
        let id = setInterval(fn.bind(this), time);
        this.intervalIDs.push(id);
    }

    /**
     * Stops all running intervals if the stop button was clicked.
     */
    stopGame() {
        if (window.stopButtonClicked) {
            this.intervalIDs.forEach(clearInterval);
            this.intervalIDs = [];
        }
    }

    /**
     * Checks if the game is over and calls the gameOver function after 1 second if the player is dead.
     */
    gameOver() {
        if (this.isDead()) {
            setTimeout(() => {
                gameOver();
            }, 1000);
        }
    }

    /**
     * Sets up intervals for animating the game, including movement, gravity, game over checks, and stopping the game.
     */
    animate() {
        this.setStoppableInterval(this.animateMove, 1000 / 60);
        this.setStoppableInterval(this.applyGravityChar, 1000 / 25);
        this.setStoppableInterval(this.gameOver, 100);
        this.setStoppableInterval(this.stopGame, 100);
    }

    /**
     * Sets up intervals for animating images and playing sounds.
     */
    animateImages() {
        this.setStoppableInterval(this.moveAnimation, 100);
        this.setStoppableInterval(this.lastStandAnimation, 200);
        this.setStoppableInterval(this.lastIdleAnimation, 200);
        this.setStoppableInterval(this.lastLongIdleAnimation, 200);
        this.setStoppableInterval(this.soundHit, 100);
    }

    /**
     * Plays a sound when the object is hurt, if sound is enabled.
     */
    soundHit() {
        if (window.soundEnabled === true && this.isHurt()) {
            this.hurt_sound.play();
        }
    }

    /**
     * Handles character movement animation by pausing walking sound and processing key inputs.
     */
    animateMove() {
        this.walking_sound.pause();
        this.keyRight();
        this.keyLeft();
        this.keyJump();
        this.charPosition();
    }

    /**
     * Applies gravity to the character, adjusting its vertical position and speed.
     */
    applyGravityChar() {
        (this.isAboveGround() || this.speedY > 0) ? (this.y -= this.speedY, this.speedY -= this.acceleration) : this.speedY = 0;
    }

    /**
     * Controls the animation of the character based on its state.
     */
    moveAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.IMAGES_DEAD);
            this.resetIdle();
        } else if (this.isHurt()) {
            this.playAnimation(this.IMAGES_HURT);
            this.resetIdle();
        } else if (this.isAboveGround()) {
            this.playAnimation(this.IMAGES_JUMPING);
            this.resetIdle();
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.IMAGES_WALKING);
            this.resetIdle();
        }
    }

    /**
     * Handles the last stand animation if the character is standing still and walking animation is set.
     */
    lastStandAnimation() {
        if (this.lastStand() && this.setWalkingAnimation()) {
            this.setGroundImage();
        };
    }

    /**
     * Plays the idle animation if the character is in an idle state and walking animation is set.
     */
    lastIdleAnimation() {
        if (this.lastIdle() && this.setWalkingAnimation()) {
            this.playAnimation(this.IMAGES_IDLE);
        }
    }

    /**
     * Plays the long idle animation if the character is in a long idle state and walking animation is set.
     */
    lastLongIdleAnimation() {
        if (this.lastLongIdle() && this.setWalkingAnimation()) {
            this.playAnimation(this.IMAGES_LONGIDLE);
        };
    }

    /**
     * Sets the ground image by loading the image specified for jumping.
     */
    setGroundImage() {
        this.loadImage(this.IMAGES_JUMPING[8]);
    }

    /**
     * Checks if the walking animation should be set.
     * @returns {boolean} True if the character is not above ground, not moving left or right, and not dead or hurt.
     */
    setWalkingAnimation() {
        return !this.isAboveGround() &&
            !this.world.keyboard.LEFT &&
            !this.world.keyboard.RIGHT &&
            !this.isDead() &&
            !this.isHurt();
    }

    /**
     * Moves the character to the right if the right arrow key is pressed and the character is within the level bounds.
     * Plays the walking sound if the character is on the ground and sound is enabled.
     */
    keyRight() {
        if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
            this.moveRight();
            this.otherDirection = false;
            if (window.soundEnabled === true && !this.isAboveGround()) {
                this.walking_sound.play();
            }
        }
    }

    /**
     * Moves the character to the left if the left arrow key is pressed and the character is within the level bounds.
     * Plays the walking sound if the character is on the ground and sound is enabled.
     */
    keyLeft() {
        if (this.world.keyboard.LEFT && this.x > 0) {
            this.moveLeft();
            this.otherDirection = true;
            if (window.soundEnabled === true && !this.isAboveGround()) {
                this.walking_sound.play();
            }
        }
    }

    /**
     * Makes the character jump if the space key is pressed and the character is on the ground.
     * Plays the jumping sound if sound is enabled.
     */
    keyJump() {
        if (this.world.keyboard.SPACE && !this.isAboveGround()) {
            this.jump();
            if (window.soundEnabled === true) {
                this.jumping_sound.play();
            }
        }
    }

    /**
     * Updates the camera position to follow the character.
     */
    charPosition() {
        this.world.camera_x = -this.x + 100;
    }
}
