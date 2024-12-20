class Endboss extends MovableObject {

    height = 350;
    width = 300;
    y = 100;
    offset = { top: 60, right: 20, bottom: 30, left: 20 };
    isAlerting = false;
    isAttacking = false;
    isWalking = false;
    attackInterval = 0;
    speed = 20;

    IMAGES_WALK = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];

    IMAGES_ALERT_IDLE = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png'
    ];

    IMAGES_ALERT = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ];

    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];

    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]

    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',

    ];

    /**
     * Creates an instance of the Endboss and initializes the boss's properties, animations, and position.
     */
    constructor() {
        super().loadImage(this.IMAGES_ALERT_IDLE[0]);
        this.loadImages(this.IMAGES_ALERT);
        this.loadImages(this.IMAGES_WALK);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 4100
        this.damageValue = 9.1;
        this.checkCharacterPosition();
        this.anmiate();
    }

    /**
     * Handles the animation of the endboss depending on its current state (dead, hurt, attacking, alerting, walking).
     */
    anmiate() {
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.IMAGES_DEAD);
            } else if (this.isHurt()) {
                this.playAnimation(this.IMAGES_HURT);
            } else if (this.isAttacking) {
                this.playAnimation(this.IMAGES_ATTACK);
                this.moveEndboss();
            } else if (this.isAlerting) {
                this.playAnimation(this.IMAGES_ALERT);
            } else if (this.isWalking) {
                this.playAnimation(this.IMAGES_WALK);
                this.moveEndboss();
            }
        }, 100);
    }

    /**
     * Moves the endboss to the left or right, based on its current position and direction.
     */
    moveEndboss() {
        if (this.x <= 1000) {
            this.otherDirection = true;
        } else if (this.x >= 2000) {
            this.otherDirection = false;
        }
        if (this.otherDirection) {
            this.moveRight();
        } else {
            this.moveLeft();
        }
    }

    /**
     * Checks the character's position and triggers the alert if the character is close enough to the endboss.
     */
    checkCharacterPosition() {
        setInterval(() => {
            if (this.world && this.world.character && this.world.character.x >= 3600) {
                this.startFullAlert();
            }
        }, 1000 / 60);
    }

    /**
     * Starts the endboss's attack animation if the boss is not already attacking.
     */
    attack() {
        if (!this.isAttacking) {
            this.isAttacking = true;
            soundControl.sounds.endbossAttack.play();
        }
    }

    /**
     * Stops the endboss's attack and transitions the boss back to walking state.
     */
    stopAttack() {
        if (this.isAttacking) {
            this.isAttacking = false;
            this.isWalking = true;
        }
    }

    /**
     * Starts the full alert animation, plays alert sounds, and pauses the background music.
     */
    startFullAlert() {
        if (!this.isAlerting && !this.isWalking) {
            this.isAlerting = true;
            soundControl.sounds.endGame.play();
            soundControl.sounds.backgroundMusic.pause();
            setTimeout(() => {
                this.isAlerting = false;
                this.isWalking = true;
            }, 1500);
        }
    }

    /**
     * Returns the endboss to the standard alert animation if it's currently alerting.
     */
    playStandardAlert() {
        if (this.isAlerting) {
            this.isAlerting = false;
        }
    }
}