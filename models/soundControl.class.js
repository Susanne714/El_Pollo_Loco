class SoundControl {

    /**
     * Creates an instance of SoundControl.
     * Initializes sound properties and the sound state.
     */
    constructor() {
        this.isSoundOn = true;
        this.sounds = {};
        this.loadSoundState();
    }

    /**
     * Initializes all the sound settings, including sound properties and volume.
     */
    initSounds() {
        this.initializeSounds();
        this.setSoundProperties();
        this.applyGlobalVolumeIfNeeded();
        this.updateMutedState();
    }

    /**
     * Initializes all sound objects with their corresponding audio files.
     */
    initializeSounds() {
        this.sounds = {
            backgroundMusic: new Audio('audio/gameTheme.mp3'),
            walkingSound: new Audio('audio/walking.mp3'),
            throwingSound: new Audio('audio/throw.mp3'),
            splashSound: new Audio('audio/glass.mp3'),
            hitEnemySound: new Audio('audio/hitObject.mp3'),
            hitEndbossSound: new Audio('audio/chickenEndbossHit.mp3'),
            endbossAttack: new Audio('audio/chickenEndbossAttack.mp3'),
            hitCharacterSound: new Audio('audio/pepeOuch.mp3'),
            collectCoin: new Audio('audio/collectCoin.mp3'),
            collectBottle: new Audio('audio/collectBottle.mp3'),
            chickenSound: new Audio('audio/chickenEnemy.mp3'),
            endGame: new Audio('audio/finalFight2.mp3'),
            jumpSound: new Audio('audio/jump.mp3'),
            gameOverWinningSound: new Audio('audio/ElPolloLocoTheme.mp3'),
            gameOverLosingSound: new Audio('audio/gameOver.mp3'),
        };
    }

    /**
     * Sets individual properties like volume and looping for each sound.
     */
    setSoundProperties() {
        this.sounds.backgroundMusic.loop = true;
        this.sounds.endGame.loop = true;
        this.sounds.gameOverWinningSound.loop = true;

        this.sounds.backgroundMusic.volume = 0.1;
        this.sounds.walkingSound.volume = 0.4;
        this.sounds.throwingSound.volume = 0.4;
        this.sounds.splashSound.volume = 0.4;
        this.sounds.hitEnemySound.volume = 0.3;
        this.sounds.hitCharacterSound.volume = 0.1;
        this.sounds.chickenSound.volume = 0.2;
        this.sounds.endGame.volume = 0.5;
        this.sounds.jumpSound.volume = 0.4;
        this.sounds.collectBottle.volume = 0.2;
        this.sounds.collectCoin.volume = 0.2;
    }

    /**
     * Applies a global volume to all sounds if the global volume flag is enabled.
     */
    applyGlobalVolumeIfNeeded() {
        const applyGlobalVolume = false; // Schalter
        const globalVolume = 0.1;

        if (applyGlobalVolume) {
            for (const soundKey in this.sounds) {
                this.sounds[soundKey].volume = globalVolume;
            }
        }
    }

    /**
     * Plays the background music if the sound is enabled.
     */
    playBackgroundMusic() {
        if (this.isSoundOn) {
            this.sounds.backgroundMusic.currentTime = 0; // Start von vorne
            this.sounds.backgroundMusic.play();
        }
    }

    /**
     * Stops the background music and resets its play position.
     */
    stopBackgroundMusic() {
        this.sounds.backgroundMusic.pause();
    }

    stopGameOverMusic() {
        this.sounds.gameOverWinningSound.pause();
        this.sounds.gameOverLosingSound.pause();
    }

    resetAllSounds() {
        for (const soundKey in this.sounds) {
            const sound = this.sounds[soundKey];
            sound.pause();          // Sound pausieren
            sound.currentTime = 0;  // Zurück auf Anfang setzen
        }
    }

    /**
    * Pauses all active sounds in the game, including chicken sound, background music, and end game music.
    */
    pauseGameSounds() {
        this.sounds.chickenSound.pause();
        this.sounds.backgroundMusic.pause();
        this.sounds.endGame.pause();
    }

    /**
     * Toggles the sound on or off.
     * Updates the Local Storage state and applies the change to all sounds.
     */
    toggleSounds() {
        this.isSoundOn = !this.isSoundOn;
        if (this.isSoundOn) {
            this.playBackgroundMusic();
        } else {
            this.stopBackgroundMusic();
        }
        this.updateMutedState();
        localStorage.setItem('soundOn', this.isSoundOn);
    }

    /**
     * Loads the saved sound state from Local Storage and applies it to all sounds.
     */
    loadSoundState() {
        const savedState = localStorage.getItem('soundOn');
        if (savedState !== null) {
            this.isSoundOn = savedState === 'true';
        }
        this.updateMutedState(); // Ensure all sounds respect the loaded state
    }

    /**
     * Plays a specific sound effect by its key.
     * @param {string} soundKey The key of the sound to play (e.g., 'walkingSound').
     */
    playSound(soundKey) {
        if (this.isSoundOn && this.sounds[soundKey]) {
            this.sounds[soundKey].play();
        }
    }

    /**
     * Mutes all sounds by pausing them.
     */
    muteAllSounds() {
        for (const soundKey in this.sounds) {
            this.sounds[soundKey].pause();
        }
    }

    /**
     * Updates the muted state for all sounds based on the current `isSoundOn` state.
     */
    updateMutedState() {
        for (const soundKey in this.sounds) {
            this.sounds[soundKey].muted = !this.isSoundOn;
        }
    }

    /**
     * Plays a cloned sound if sound is enabled. 
     * This ensures that cloned sounds respect the sound on/off state. 
     * @param {Audio} sound The sound object to clone and play.
     */
    cloneAndPlaySound(sound) {
        if (this.isSoundOn) {
            const clonedSound = sound.cloneNode();
            clonedSound.volume = sound.volume;  // Ensure the cloned sound has the same volume as the original
            clonedSound.muted = !this.isSoundOn; // Respect the global sound state
            clonedSound.play();
        }
    }
}