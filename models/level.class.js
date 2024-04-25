class Level {
    enemies;
    clouds;
    backgroundsObjects;
    level_end_x = 2000;

    constructor(enemies, clouds, backgroundsObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundsObjects = backgroundsObjects;
    }
}