class StatusBarCoin extends DrawableObject {
    IMAGES = [
        `img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png`,
        `img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png`,
        `img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png`,
        `img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png`,
        `img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png`,
        `img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png`
    ];

    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 60;
        this.y = 28;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    /**
     * Sets the percentage and updates the image based on that percentage.
     * @param {number} percentage - The percentage to set, which influences the image to be displayed.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.cacheImage[path];
    }

    /**
     * Determines the index of the image to be displayed based on the current percentage.
     * @returns {number} The index of the image corresponding to the current percentage.
     */
    resolveImageIndex() {
        return this.percentage === 100 ? 5 :
            this.percentage > 80 ? 4 :
                this.percentage > 60 ? 3 :
                    this.percentage > 40 ? 2 :
                        this.percentage > 20 ? 1 :
                            0;
    }
}
