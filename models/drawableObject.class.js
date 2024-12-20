class DrawableObject {
    img;
    imageCache = [];
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    /**
     * Loads an image from the given path and sets it as the object's image.
     * @param {string} path - The file path of the image to load.
     * @returns {void}
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Draws the image of the object onto the canvas at the specified position and size.
     * @param {CanvasRenderingContext2D} ctx - The canvas context where the image will be drawn.
     * @returns {void}
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Loads an array of images into the image cache for later use.
     * @param {string[]} arr - An array of image file paths to load.
     * @returns {void}
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    drawFrame(ctx) {
        if (this instanceof Character || this instanceof Chicken || this instanceof Endboss || this instanceof ThrowableObject || this instanceof SmallChicken) {
            ctx.beginPath();
            ctx.lineWidth = '3';
            ctx.strokeStyle = 'transparent';
            ctx.rect(
                this.x + this.offset.left,
                this.y + this.offset.top,
                this.width - this.offset.left - this.offset.right,
                this.height - this.offset.top - this.offset.bottom
            );
            ctx.stroke();
        }
    }


}