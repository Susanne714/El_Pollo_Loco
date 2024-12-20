class Level {
    enemies = [];
    clouds;
    backgroundObjects;
    bottles = [];
    coins = [];
    endBoss;
    level_end_x = 4300;

    /**
     * Creates an instance of the level.
     * Initializes the level with various objects such as enemies, clouds, background objects, bottles, coins, and the end boss.
     * @param {Array} enemies - The enemies in the level.
     * @param {Array} clouds - The clouds in the level.
     * @param {Array} backgroundObjects - The background objects in the level.
     * @param {Array} bottles - The collectible bottles in the level.
     * @param {Array} coins - The collectible coins in the level.
     * @param {Object} endBoss - The end boss of the level.
     */
    constructor(enemies, clouds, backgroundObjects, bottles, coins, endBoss) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
        this.endBoss = endBoss;

    }
}