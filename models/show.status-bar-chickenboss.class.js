class statusBarEndboss extends DrawableObject {
    IMAGES = [
        `img/7_statusbars/2_statusbar_endboss/orange/orange0.png`,
        `img/7_statusbars/2_statusbar_endboss/orange/orange20.png`,
        `img/7_statusbars/2_statusbar_endboss/orange/orange40.png`,
        `img/7_statusbars/2_statusbar_endboss/orange/orange60.png`,
        `img/7_statusbars/2_statusbar_endboss/orange/orange80.png`,
        `img/7_statusbars/2_statusbar_endboss/orange/orange100.png`
    ];
    percentage = 100;

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 490;
        this.y = 28;
        this.width = 200;
        this.height = 60;
        this.setPercentage(100);
    }

    /**
     * Sets the percentage and updates the image based on the current percentage.
     * @param {number} percentage - The new percentage value to set.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.cacheImage[path];
    }

    /**
     * Determines the index of the image based on the percentage.
     * @returns {number} The index of the image in the IMAGES array.
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
