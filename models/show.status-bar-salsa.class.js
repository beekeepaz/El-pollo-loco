class StatusBarSalsa extends DrawableObject {
    IMAGES = [
        `img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png`,
        `img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png`,
        `img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png`,
        `img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png`,
        `img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png`,
        `img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png`
    ];

    constructor() {
        super();
        this.loadImages(this.IMAGES);
        this.x = 90;
        this.y = 56;
        this.width = 200;
        this.height = 60;
        this.setPercentage(0);
    }

    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.IMAGES[this.resolveImageIndex()];
        this.img = this.cacheImage[path];
    }

    resolveImageIndex() {
        return this.percentage === 100 ? 5 :
            this.percentage > 80 ? 4 :
                this.percentage > 60 ? 3 :
                    this.percentage > 40 ? 2 :
                        this.percentage > 20 ? 1 :
                            0;
    }
}