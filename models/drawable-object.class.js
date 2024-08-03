class DrawableObject {
    img;
    cacheImage = {};
    x = 10;
    y = 280;
    height = 140;
    width = 100;
    currentImage = 0;

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.cacheImage[path] = img;
        });
    }
}
