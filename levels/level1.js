let level1;

/**
 * Initializes the first level of the game with various game objects like enemies, clouds, background objects,
 * bottles, coins, and the end boss.
 */
function initLevel() {

    /**
     * The first level in the game, containing all objects that populate the level.
     * @type {Level}
     */
    level1 = new Level(

        /**
         * An array of enemy objects (Chickens and Small Chickens).
         * @type {Array<Enemy>}
         */
        [
            new Chicken(400),
            new Chicken(600),
            new Chicken(900),
            new Chicken(1100),
            new Chicken(1300),
            new Chicken(1400),
            new Chicken(1600),
            new Chicken(1800),
            new Chicken(2000),
            new Chicken(2300),
            new Chicken(2500),
            new Chicken(2800),
            new Chicken(3100),
            new Chicken(3300),
            new Chicken(3600),
            new SmallChicken(800),
            new SmallChicken(1200),
            new SmallChicken(1500),
            new SmallChicken(2100),
            new SmallChicken(2700),
            new SmallChicken(2900),
            new SmallChicken(2900),
            new SmallChicken(3000),
            new SmallChicken(3200),
            new SmallChicken(3600),
        ],

        /**
         * An array of cloud objects.
         * @type {Array<Cloud>}
         */
        [
            new Cloud(0),
            new Cloud(500),
            new Cloud(1000),
            new Cloud(1500),
            new Cloud(2000),
            new Cloud(2500),
            new Cloud(3000),
            new Cloud(3500),
            new Cloud(4000),
            new Cloud(4500),
            new Cloud(5000),
        ],

        /**
        * An array of background objects (layered images).
        * @type {Array<BackgroundOject>}
        */
        [
            new BackgroundOject('img/5_background/layers/air.png', -719),
            new BackgroundOject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundOject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundOject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundOject('img/5_background/layers/air.png', 0),
            new BackgroundOject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundOject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundOject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundOject('img/5_background/layers/air.png', 719),
            new BackgroundOject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundOject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundOject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundOject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundOject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundOject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundOject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundOject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundOject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundOject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundOject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

            new BackgroundOject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundOject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundOject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundOject('img/5_background/layers/1_first_layer/1.png', 719 * 4),

            new BackgroundOject('img/5_background/layers/air.png', 719 * 5),
            new BackgroundOject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
            new BackgroundOject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
            new BackgroundOject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

            new BackgroundOject('img/5_background/layers/air.png', 719 * 6),
            new BackgroundOject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
            new BackgroundOject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
            new BackgroundOject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
        ],

        /**
         * An array of bottle objects scattered across the level.
         * @type {Array<Bottle>}
         */
        [
            new Bottle(300, 320),
            new Bottle(460, 320),
            new Bottle(500, 320),
            new Bottle(900, 320),
            new Bottle(1000, 320),
            new Bottle(1030, 320),
            new Bottle(1600, 320),
            new Bottle(2000, 320),
            new Bottle(2100, 320),
            new Bottle(2200, 320),
            new Bottle(2400, 320),
            new Bottle(2800, 320),
            new Bottle(2900, 320),
            new Bottle(3400, 320),
            new Bottle(3600, 320),
            new Bottle(3800, 320),
        ],

        /**
         * An array of coin objects scattered across the level.
         * @type {Array<Coin>}
         */
        [
            new Coin(400, 100),
            new Coin(600, 235),
            new Coin(725, 135),
            new Coin(825, 170),
            new Coin(1200, 100),
            new Coin(1300, 150),
            new Coin(1800, 100),
            new Coin(2020, 135),
            new Coin(2300, 170),
            new Coin(2450, 100),
            new Coin(2800, 235),
            new Coin(3000, 100),
        ],

        /**
         * The end boss of the level.
         * @type {Endboss}
         */
        new Endboss()
    )
};