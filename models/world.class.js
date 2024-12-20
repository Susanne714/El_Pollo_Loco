class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    statusBarCharacter = new StatusBarCharacter();
    statusBarCoins = new StatusBarCoins();
    statusBarBottles = new StatusbarBottles();
    statusBarEndboss = new StatusBarEndboss();
    throwableObjects = [];
    showStatusBarEndboss = false;
    endbossMoving = false;
    gameOver = false;

    /**
     * Creates a new World instance.
     * @param {HTMLCanvasElement} canvas - The canvas element for the game.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.intervals = [];
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.level.endBoss.world = this;
        this.draw();
        this.setWorld();
        this.run();
        this.checkCollectionCoins();
        this.checkCollectionBottles();

    }

    /**
     * Links the character to the current game world.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Starts the main game loop to handle updates and interactions.
     * Runs periodic checks for various game events.
     */
    run() {
        this.intervals.push(setInterval(() => {
            this.checkCollectionCoins();
            this.checkCollectionBottles();
            this.checkCollisionEnemy();
            this.checkCollisionEndBoss();
            this.checkDistanceEndboss();
            this.checkThrowObjects();
            this.checkIfBottleHitsBoss();
            this.checkIfBottleHitsEnemy();
            this.drawStatusBarEndboss();
            this.checkGameOver();
        }, 200));
    }

    /**
    * Stops all ongoing intervals and animations in the game world.
    * This includes clearing all registered intervals and stopping
    * animations for all enemies in the current level.
    */
    stop() {
        this.intervals.forEach((interval, index) => {
            clearInterval(interval);
        });
        this.level.enemies.forEach(enemy => {
            if (enemy.stopAnimation) {
                enemy.stopAnimation();
            }
        });
    }

    /**
    * Checks whether the game is over based on the character's or endboss's energy.
    * If the game is over, stops the game and displays the game over screen.
    */
    checkGameOver() {
        if (!this.gameOver && (this.character.energy <= 0 || this.level.endBoss.energy <= 0)) {
            this.gameOver = true;
            let gameResult = this.character.energy <= 0 ? 'lose' : 'win';

            setTimeout(() => {
                this.stop();
                this.showGameOverOverlay(gameResult);
            }, 500);
        }
    }

    /**
    * Displays the game over overlay with the appropriate result (win or lose).
    * @param {string} result - The result of the game ('win' or 'lose').
    */
    showGameOverOverlay(result) {
        world.isGameOver = true;
        this.setGameOverResult(result);
        this.pauseAllSounds();
        this.displayGameOverOverlay();
    }

    /**
    * Sets the game over image and plays the corresponding sound based on the game result.
    * @param {string} result - The result of the game ('win' or 'lose').
    */
    setGameOverResult(result) {
        const gameOverImage = document.querySelector('#gameOverImage');

        if (result === 'win') {
            soundControl.sounds.gameOverWinningSound.play();
            gameOverImage.src = 'img/9_intro_outro_screens/win/win_2.png';
        } else if (result === 'lose') {
            soundControl.sounds.gameOverLosingSound.play();
            gameOverImage.src = 'img/9_intro_outro_screens/game_over/game over!.png';
        }
    }

    /**
    * Pauses all active sounds in the game, including chicken sound, background music, and end game music.
    */
    pauseAllSounds() {
        soundControl.sounds.chickenSound.pause();
        soundControl.sounds.backgroundMusic.pause();
        soundControl.sounds.endGame.pause();
    }

    /**
    * Displays the game over overlay on the screen by setting its display style to 'flex'.
    */
    displayGameOverOverlay() {
        const gameOverOverlay = document.querySelector('.game-over-overlay');
        gameOverOverlay.style.display = 'flex';
    }

    /**
    * Checks if the conditions for throwing a bottle are met, and if so, performs the throw.
    * @function
    */
    checkThrowObjects() {
        if (this.shouldThrowBottle()) {
            this.throwBottle();
        }
    }

    /**
    * Determines whether the character is able to throw a bottle.
    * The conditions for throwing are:
    * - The "D" key is pressed.
    * - The throw is not blocked.
    * - There are throwable bottles available.
    * - The cooldown between throws has passed.
    * @function
    * @returns {boolean} True if the character can throw a bottle, false otherwise.
    */
    shouldThrowBottle() {
        return this.keyboard.D &&
            !this.keyboard.throwBlocked &&
            this.character.throwableBottles.length > 0 &&
            (!this.lastThrowTime || Date.now() - this.lastThrowTime >= 250);
    }

    /**
    * Executes the bottle throw if the conditions are met.
    * - Creates a new throwable object (the bottle).
    * - Adds the throwable object to the list of objects in the game.
    * - Updates the inventory of throwable bottles.
    * - Updates the bottle percentage bar.
    * - Prevents further throws by blocking the input temporarily.
    * @function
    */
    throwBottle() {
        const bottle = this.createBottle();
        if (bottle) {
            this.throwableObjects.push(bottle);
            this.character.throwableBottles.pop();
            const bottlesLeft = this.character.throwableBottles.length;
            const percentage = (bottlesLeft / this.character.collectedBottles.length) * 100;
            this.statusBarBottles.setPercentage(percentage);
            this.lastThrowTime = Date.now();
            this.keyboard.throwBlocked = true;
        }
    }

    /**
     * Determines if a bottle can be thrown.     * 
     * @returns {boolean} True if the player can throw a bottle, false otherwise.
     */
    canThrowBottle() {
        return this.keyboard.D &&
            this.character.throwableBottles.length > 0 &&
            !this.character.otherDirection;
    }

    /**
     * Creates a throwable bottle object based on the character's position and direction.     * 
     * @returns {ThrowableObject} The newly created throwable bottle object.
     */
    createBottle() {
        if (this.character.otherDirection) {
            return null;
        }
        let bottleX = this.character.x + 50;
        let bottleY = this.character.y + 100;
        return new ThrowableObject(bottleX, bottleY, true);
    }

    /**
     * Updates the bottle inventory and the corresponding status bar.
     */
    updateBottleInventory() {
        this.character.throwableBottles.pop();

        const bottlesLeft = this.character.throwableBottles.length;
        const percentage = (bottlesLeft / this.character.collectedBottles.length) * 100;
        this.statusBarBottles.setPercentage(percentage);
    }

    /**
    * Checks for collisions between the character and enemies. If a collision is detected, the character is hit,
    * the hit sound is played, and the character's energy is updated. If no collision occurs, the character can jump on the enemy.
    * @returns {void}
    */
    checkCollisionEnemy() {
        this.level.enemies.forEach((enemy) => {
            if (enemy && !enemy.isDead) {
                if (this.character.isColliding(enemy)) {
                    if (!this.character.isJumpingOn(enemy)) {
                        this.character.hit();
                        soundControl.sounds.hitCharacterSound.play();
                        this.statusBarCharacter.setPercentage(this.character.energy);
                    } else {
                        this.character.jumpsOn(enemy);
                    }
                }
            }
        });
    }

    /**
    * Checks for collisions between the character and the end boss. If the character collides with the boss while it is attacking,
    * the character takes damage, and the damage sound is played. The character's energy is updated, and a timestamp for the last damage
    * is stored to prevent continuous damage within a short period of time.
    * @returns {void}
    */
    checkCollisionEndBoss() {
        if (this.character.isColliding(this.level.endBoss)) {
            if (this.level.endBoss.isAttacking) {
                if (!this.character.lastDamageTime || Date.now() - this.character.lastDamageTime >= 500) {
                    this.character.hit();
                    soundControl.sounds.hitCharacterSound.play();
                    soundControl.sounds.endbossAttack.play();
                    this.statusBarCharacter.setPercentage(this.character.energy);
                    this.character.lastDamageTime = Date.now();
                }
            }
        } else {
            this.level.endBoss.stopAttack();
        }
    }

    /**
    * Checks the distance between the character and the end boss. If the character is within a certain distance and the boss is not
    * already attacking, the boss initiates an attack.
    * @returns {void}
    */
    checkDistanceEndboss() {
        const distance = Math.abs(this.level.endBoss.x - this.character.x);
        if (distance < 160 && !this.level.endBoss.isAttacking) {
            this.level.endBoss.attack();
        }
    }

    /**
    * Draws the status bar for the end boss if the character is within a certain distance of the end boss.
    * @returns {void}
    */
    drawStatusBarEndboss() {
        const distance = Math.abs(this.level.endBoss.x - this.character.x);
        if (distance < 500) {
            this.showStatusBarEndboss = true;
        }
    }

    /**
    * Checks if a throwable bottle hits the end boss. If a collision is detected, the bottle registers as collided, the end boss
    * takes damage, and the hit sound is played. The status bar for the end boss is updated with the new energy value.
    * @returns {void}
    */
    checkIfBottleHitsBoss() {
        let bottle = this.throwableObjects.find(
            bottle => !bottle.bottleCollided && this.level.endBoss.isColliding(bottle)
        );
        if (bottle) {
            bottle.bottleIsColliding();
            soundControl.sounds.hitEndbossSound.play();
            this.level.endBoss.hit();
            this.statusBarEndboss.setPercentage(this.level.endBoss.energy);
        }
    }

    /**
    * Checks if a throwable bottle hits an enemy. If a collision is detected, the enemy is killed, the bottle registers as collided,
    * and the hit sound is played.
    * @returns {void}
    */
    checkIfBottleHitsEnemy() {
        this.level.enemies.forEach(enemy => {
            let bottle = this.throwableObjects.find(
                bottle => !bottle.bottleCollided && enemy.isColliding(bottle)
            );
            if (bottle) {
                enemy.kill();
                bottle.bottleIsColliding();
                soundControl.sounds.hitEnemySound.play();
            }
        });
    }

    /**
    * Checks if the character collides with any coins in the level. If a collision occurs and the coin has not been collected yet,
    * the coin is collected, the collection sound is played, and the coin is added to the character's collected coins array. The coin
    * is then removed from the level, and the status bar for coins is updated.
    * @returns {void}
    */
    checkCollectionCoins() {
        this.level.coins.forEach((coin, index) => {
            if (this.character.isColliding(coin) && !coin.collected) {
                soundControl.cloneAndPlaySound(soundControl.sounds.collectCoin);
                coin.collect();
                this.character.collectedCoins.push(coin);
                this.level.coins.splice(index, 1);
                this.statusBarCoins.setPercentage(this.statusBarCoins.percentage + 8.34);
            }
        });
    }

    /**
    * Checks if the character collides with any bottles in the level. If a collision occurs and the bottle has not been collected yet,
    * the bottle is collected, the collection sound is played, and the bottle is added to the character's collected and throwable bottles arrays.
    * The bottle is then removed from the level, and the status bar for bottles is updated.
    * @returns {void}
    */
    checkCollectionBottles() {
        this.level.bottles.forEach((bottle, index) => {
            if (this.character.isColliding(bottle) && !bottle.collected) {
                soundControl.cloneAndPlaySound(soundControl.sounds.collectBottle);
                bottle.collect();
                this.character.collectedBottles.push(bottle);
                this.character.throwableBottles.push(bottle);
                this.level.bottles.splice(index, 1);
                this.statusBarBottles.setPercentage(this.statusBarBottles.percentage + 6.25);
            }
        });
    }

    /**
    * Draws the game frame, including background, game objects, and status bars. It also handles the camera translation
    * to ensure the proper positioning of elements relative to the character's movement.
    * @returns {void}
    */
    draw() {
        if (!gameRunning) return;
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);
        this.drawBackground();
        this.ctx.translate(-this.camera_x, 0);
        this.drawStatusBars();
        this.ctx.translate(this.camera_x, 0);
        this.drawGameObjects();
        this.ctx.translate(-this.camera_x, 0);
        this.loopDraw();
    }

    /**
    * Clears the entire canvas, effectively resetting it for the next frame of the game.
    * @returns {void}
    */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
    * Draws the background elements of the level, including background objects and clouds, by adding them to the map.
    * @returns {void}
    */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
    * Draws the status bars, including the player's energy, collected coins, and bottles, as well as the end boss's energy bar,
    * if it is set to be visible.
    * @returns {void}
    */
    drawStatusBars() {
        this.addToMap(this.statusBarCharacter);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        if (this.showStatusBarEndboss) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    /**
    * Draws all game objects, including the bottles, coins, character, enemies, and end boss, by adding them to the map.
    * Additionally, it draws any throwable objects that are present in the game.
    * @returns {void}
    */
    drawGameObjects() {
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.coins);
        this.addToMap(this.character);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.level.endBoss);
        this.addObjectsToMap(this.throwableObjects);
    }

    /**
    * Initiates a loop to continuously redraw the game if the game is running, ensuring that the game frame is updated regularly.
    * @returns {void}
    */
    loopDraw() {
        const self = this;
        if (gameRunning) {
            self.checkCollisions();  // Kollisionsprüfung bei jedem Frame
            requestAnimationFrame(function () {
                self.draw();
            });
        }
    }

    // Kollisionen prüfen
    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isJumpingOn(enemy)) {
                this.character.jumpsOn(enemy);
            }
        });
    }

    /**
    * Filters out any objects marked as removed and adds the remaining objects to the map by calling the addToMap method for each object.
    * @param {Array} objects - The array of objects to be added to the map.
    * @returns {void}
    */
    addObjectsToMap(objects) {
        objects = objects.filter(o => !o.removed);
        objects.forEach(o => this.addToMap(o));
    }

    /**
    * Adds an individual object to the map and draws it on the canvas. If the object is facing the opposite direction, the image is flipped.
    * @param {Object} mo - The object to be added to the map and drawn.
    * @returns {void}
    */
    addToMap(mo) {
        if (mo.removed) return;
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
    * Flips the image of an object horizontally (mirrored) and updates the object's x position accordingly.
    * @param {Object} mo - The object whose image will be flipped.
    * @returns {void}
    */
    flipImage(mo) {
        this.ctx.save(mo);
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * Restores the image's original orientation (unflips) and updates the object's x position.
    * @param {Object} mo - The object whose image will be unflipped.
    * @returns {void}
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }
}