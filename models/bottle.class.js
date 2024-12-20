class Bottle extends CollectableObject {
    height = 100;
    width = 100;
    offset = { top: 30, right: 30, bottom: 30, left: 30 }

    /**
     * Creates a new bottle at the specified position.
     * @param {number} x - The x-coordinate of the bottle.
     * @param {number} y - The y-coordinate of the bottle.
     */
    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png')
        this.x = x;
        this.y = y;
    }
}