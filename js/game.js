let canvas;
let world;
let keyboard = new Keyboard();
let soundControl = new SoundControl();
let gameRunning = false;
soundControl.initSounds();

/**
 * Starts the game by setting the gameRunning flag, hiding the start screen overlay,
 * initializing the game world, and starting background music if enabled.
 */
function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        document.querySelector('.start-screen-overlay').classList.add('hidden');
        init();

        if (soundControl.isSoundOn) {
            soundControl.resetAllSounds();
            soundControl.playBackgroundMusic();
        }
    }
}

/**
 * Resets the game to the start state and displays the start screen overlay.
 * Stops the current game, clears the canvas, and removes the game over overlay.
 * The 'Start Game' button listener is also reattached to initiate the game.
 */
function home() {
    clearGame();
    document.getElementById("gameOverOverlay").style.display = 'none';
    document.querySelector('.start-screen-overlay').classList.remove('hidden');
    gameRunning = false;
    soundControl.stopGameOverMusic();
    document.getElementById('startGame').addEventListener('click', startGame);
}

/**
 * Restarts the game by clearing the current state, reinitializing the level,
 * and starting a new game instance. Also hides the game-over overlay.
 */
function restartGame() {
    clearGame();
    initLevel();
    world = new World(canvas, keyboard);
    soundControl.resetAllSounds();
    soundControl.playBackgroundMusic();
    startGame();
    document.getElementById("gameOverOverlay").style.display = 'none';
}

/**
 * Clears the current game state by stopping all active processes,
 * removing the current game world, and clearing the canvas content.
 */
function clearGame() {
    if (world) {
        world.stop();
        world = null;
    }
    if (canvas) {
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    }
}

/**
 * Initializes the game by setting up the canvas, loading the level configuration,
 * creating a keyboard input handler, and initializing the game world.
 */
function init() {
    canvas = document.getElementById('canvas');
    initLevel();
    keyboard = new Keyboard();
    world = new World(canvas, keyboard);
}

/**
 * Adds an event listener to toggle full-screen mode when the full-screen button is clicked.
 */
document.getElementById('fullScreenMode').addEventListener('click', () => {
    if (document.fullscreenElement) {
        exitFullscreenMode();
    } else {
        enterFullscreenMode();
    }
});

/**
 * Enters the full-screen mode for the main container and adjusts the canvas size and button icon.
 */
function enterFullscreenMode() {
    const fullscreenElement = document.querySelector('.main-container');
    const canvas = document.querySelector('#canvas');
    const fullscreenIcon = document.querySelector('#fullScreenMode img');

    fullscreenElement.requestFullscreen();
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    fullscreenIcon.src = "./img/Misc/close_fullscreen.png";
}

/**
 * Exits the full-screen mode, resets the canvas size, and updates the button icon.
 */
function exitFullscreenMode() {
    const canvas = document.querySelector('#canvas');
    const fullscreenIcon = document.querySelector('#fullScreenMode img');

    document.exitFullscreen();
    canvas.style.width = ""; // original size
    canvas.style.height = "";
    fullscreenIcon.src = "./img/Misc/fullscreen.png";
}

//EVENTLISTENER

/**
 * Starts the game when the start button is clicked.
 */
document.getElementById('startGame').addEventListener('click', startGame);

/**
 * Add event listener to trigger the restart functionality when the restart button is clicked
 */
document.getElementById('restartGame').addEventListener('click', restartGame);

/**
 * Add event listener to trigger the homw functionality when the home button is clicked
 */
document.getElementById('home').addEventListener('click', home);

/**
 * Displays the info overlay when the info button is clicked.
 */
document.getElementById('infoScreen').addEventListener('click', () => {
    document.querySelector('.info-overlay').style.display = 'block';
})

/**
 * Hides the info overlay when the close button is clicked.
 */
document.getElementById('closeInfoScreen').addEventListener('click', () => {
    document.querySelector('.info-overlay').style.display = 'none';
});

/**
 * Toggles the sound state between on and off when the sound control button is clicked.
 * The sound icon is updated accordingly and the sound state is stored in the localStorage.
 */
document.getElementById('toggleSound').addEventListener('click', () => {
    soundControl.toggleSounds();
    const soundIcon = document.querySelector('#toggleSound img');

    if (soundControl.isSoundOn) {
        soundIcon.src = './img/Misc/sound_on.png';
        soundIcon.alt = 'Sound on';
        localStorage.setItem('soundState', 'on');
    } else {
        soundIcon.src = './img/Misc/sound_off.png';
        soundIcon.alt = 'Sound off';
        localStorage.setItem('soundState', 'off');
    }
});

/**
 * Updates the sound icon based on the sound state stored in the localStorage when the page loads.
 * Sets the initial state of the sound icon to reflect the current sound state (on or off).
 */
window.addEventListener('load', () => {
    const soundState = localStorage.getItem('soundState');
    if (soundState === 'off') {
        soundControl.isSoundOn = false;
        document.querySelector('#toggleSound img').src = './img/Misc/sound_off.png';
        document.querySelector('#toggleSound img').alt = 'Sound off';
    } else {
        soundControl.isSoundOn = true;
        document.querySelector('#toggleSound img').src = './img/Misc/sound_on.png';
        document.querySelector('#toggleSound img').alt = 'Sound on';
    }
});

/**
 * Adds an event listener to track keyboard input and update the keyboard object accordingly.
 */
window.addEventListener('keydown', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (event.keyCode == 38) {
        keyboard.UP = true;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (event.keyCode == 68) {
        keyboard.D = true;
    }
})

/**
 * Adds an event listener to track keyboard input and update the keyboard object accordingly.
 */
window.addEventListener('keyup', (event) => {
    if (event.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (event.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (event.keyCode == 38) {
        keyboard.UP = false;
    }

    if (event.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (event.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (event.keyCode == 68) {
        keyboard.D = false;
        keyboard.throwBlocked = false;
    }
})

//Touch-Eventlistener for moving the main character
/**
 * Handles touch events for moving the character left.
 * - Sets `keyboard.LEFT` to true when the button is pressed.
 * - Sets `keyboard.LEFT` to false when the button is released.
 */
document.getElementById('moveLeft').addEventListener('touchstart', () => {
    keyboard.LEFT = true;
});
document.getElementById('moveLeft').addEventListener('touchend', () => {
    keyboard.LEFT = false;
});
/**
 * Handles touch events for moving the character right.
 * - Sets `keyboard.RIGHT` to true when the button is pressed.
 * - Sets `keyboard.RIGHT` to false when the button is released.
 */
document.getElementById('moveRight').addEventListener('touchstart', () => {
    keyboard.RIGHT = true;
});
document.getElementById('moveRight').addEventListener('touchend', () => {
    keyboard.RIGHT = false;
});
/**
 * Handles touch events for making the character jump.
 * - Sets `keyboard.SPACE` to true when the button is pressed.
 * - Sets `keyboard.SPACE` to false when the button is released.
 */
document.getElementById('jump').addEventListener('touchstart', () => {
    keyboard.SPACE = true;
});
document.getElementById('jump').addEventListener('touchend', () => {
    keyboard.SPACE = false;
});
/**
 * Handles touch events for attack and defense actions.
 * - Sets `keyboard.D` to true when the button is pressed.
 * - Sets `keyboard.D` to false when the button is released.
 */
document.getElementById('attackAndDefend').addEventListener('touchstart', () => {
    keyboard.D = true;
});
document.getElementById('attackAndDefend').addEventListener('touchend', () => {
    keyboard.D = false;
});

/**
 * Avoids displaying the browser context menu from appearing after a long touch.
 */
document.querySelectorAll('.ctrl-panel-icon').forEach((button) => {
    button.addEventListener('contextmenu', (event) => {
        event.preventDefault();
    });
});

// Mouse-Eventlisteners for moving the main character (optional)
//Move left
document.getElementById('moveLeft').addEventListener('mousedown', () => {
    keyboard.LEFT = true;
});
document.getElementById('moveLeft').addEventListener('mouseup', () => {
    keyboard.LEFT = false;
});
//Move right
document.getElementById('moveRight').addEventListener('mousedown', () => {
    keyboard.RIGHT = true;
});
document.getElementById('moveRight').addEventListener('mouseup', () => {
    keyboard.RIGHT = false;
});
//Jump
document.getElementById('jump').addEventListener('mousedown', () => {
    keyboard.SPACE = true;
});
document.getElementById('jump').addEventListener('mouseup', () => {
    keyboard.SPACE = false;
});
//Throw objects
document.getElementById('attackAndDefend').addEventListener('mousedown', () => {
    keyboard.D = true;
});
document.getElementById('attackAndDefend').addEventListener('mouseup', () => {
    keyboard.D = false;
});