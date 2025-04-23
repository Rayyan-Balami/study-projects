const ROOT = document.querySelector("#root");
const BASE_HEIGHT = 150;
const SCREEN_WIDTH = window.innerWidth;
const SCREEN_HEIGHT = window.innerHeight - BASE_HEIGHT;
const BIRD_WIDTH = 80;
const BIRD_HEIGHT = 55;
const BIRD_SPEED = 5;
const GAP_HEIGHT = BIRD_HEIGHT * 4;
const POLE_WIDTH = 180;
const POLE_GAP = POLE_WIDTH + BIRD_WIDTH;
const POLE_SPEED = 4;
const GRAVITY = 0.5;
const JUMP_FORCE = -10;
const BIRD_IMG_UP_FLAP = "./images/yellowbird-upflap.png";
const BIRD_IMG_MID_FLAP = "./images/yellowbird-midflap.png";
const BIRD_IMG_DOWN_FLAP = "./images/yellowbird-downflap.png";
const BASE_IMG = "./images/base.png";
const POLE_GREEN_IMG = "./images/pipe-green.png";
const POLE_RED_IMG = "./images/pipe-red.png";
const BACKGROUND_IMG = "./images/background-night.png";

function applyCSS(element, styles) {
  Object.assign(element.style, styles);
}

// Function to create a new HTML element
function createElement(type, className, styles) {
  const element = document.createElement(type);
  element.className = className;
  applyCSS(element, styles);
  return element;
}

class Screen {
  constructor() {
    this.element = createElement("div", "screen", {
      width: `${SCREEN_WIDTH}px`,
      height: `${SCREEN_HEIGHT}px`,
      position: "relative",
      backgroundColor: "#4EC0CA",
      overflow: "hidden",
      position: "relative",
      backgroundImage: `url(${BACKGROUND_IMG})`,
      backgroundSize: "contain",
    });
    this.element.id = "screen";

    // Add score display
    this.scoreElement = createElement("div", "score", {
    });
    this.element.appendChild(this.scoreElement);

    //add Base ground
    const base = createElement("div", "base", {
      width: `${SCREEN_WIDTH}px`,
      height: `${BASE_HEIGHT}px`,
      backgroundImage: `url(${BASE_IMG})`,
      backgroundSize: "contain",
    });

    ROOT.appendChild(this.element);
    ROOT.appendChild(base);

    // Add modal for game over
    this.modal = createElement("div", "game-over-modal", {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
      color: "white",
      padding: "80px 60px",
      borderRadius: "40px",
      textAlign: "center",
      zIndex: "2000",
      display: "none", // Hidden by default
      marginBottom: "40px",
    });

    // Add game over text
    this.scoreDisplay = createElement("div", "modal-score", {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "40px",
      color: "white",
    });
    this.modal.appendChild(this.scoreDisplay);

    // Add play again button
    this.playAgainButton = createElement("button", "modal-button", {
      backgroundColor: "green",
      color: "white",
      border: "none",
      padding: "20px 40px",
      display: "block",
      width: "100%",
      marginBottom: "40px",
      cursor: "pointer",
      borderRadius: "20px",
      fontSize: "20px",
      fontWeight: "bold",
    });
    this.playAgainButton.textContent = "Play Again";
    this.playAgainButton.id = "play-again-button";
    this.modal.appendChild(this.playAgainButton);

    // Add exit button
    this.exitButton = createElement("button", "modal-button", {
      backgroundColor: "red",
      color: "white",
      border: "none",
      padding: "20px 40px",
      display: "block",
      width: "100%",
      cursor: "pointer",
      borderRadius: "20px",
      fontSize: "20px",
      fontWeight: "bold",
    });
    this.exitButton.textContent = "Exit";
    this.exitButton.id = "exit-button";
    this.modal.appendChild(this.exitButton);

    ROOT.appendChild(this.modal);
  }

  updateScore(score) {
    this.scoreElement.textContent = `Score: ${score}`;
    this.scoreDisplay.innerHTML = `Game Over! 🥹 Your score: ${score}`;
  }

  addElement(element) {
    this.element.appendChild(element);
  }
}

class Bird {
  constructor() {
    this.x = SCREEN_WIDTH / 6;
    this.y = SCREEN_HEIGHT / 2;
    this.element = createElement("div", "bird", {
      width: `${BIRD_WIDTH}px`,
      height: `${BIRD_HEIGHT}px`,
      position: "absolute",
      top: `${this.y}px`,
      left: `${this.x}px`,
      transform: "rotate(0deg)",
      transition: "transform 0.1s",
      backgroundImage: `url(${BIRD_IMG_UP_FLAP})`,
      backgroundSize: "contain",
      backgroundPosition: "stretch",
      backgroundRepeat: "no-repeat",
    });
    this.element.id = "bird";
    this.speedY = 0;
  }

  jump() {
    this.speedY = JUMP_FORCE; //-10
    this.element.style.transform = "rotate(-20deg)";
  }

  updatePosition() {
    this.speedY += GRAVITY; //-10 + 0.5
    this.y += this.speedY; //store new y position

    // when falling menas top increasing, so rotate right
    const rotation = this.speedY * 2;

    applyCSS(this.element, {
      transform: `rotate(${rotation}deg)`,
      top: `${this.y}px`,
      backgroundImage:
        this.speedY > 0
          ? `url(${BIRD_IMG_DOWN_FLAP})`
          : `url(${BIRD_IMG_UP_FLAP})`,
    });
  }

  reset() {
    this.y = SCREEN_HEIGHT / 2;
    this.speedY = 0;
    applyCSS(this.element, {
      top: `${this.y}px`,
      transform: "rotate(0deg)",
    });
  }
}

class Pole {
  constructor(x, gapY, isTop = true) {
    this.x = x;
    this.gapY = gapY; //gapY ments the top opsition of gap where bird passes
    this.isTop = isTop;
    this.scored = false;
    this.backgroundImage = POLE_GREEN_IMG;

    if (isTop) {
      this.height = gapY;
    } else {
      this.height = SCREEN_HEIGHT - (gapY + GAP_HEIGHT);
    }
    this.element = createElement("div", "pole", {
      width: `${POLE_WIDTH}px`,
      height: `${this.height}px`,
      backgroundImage: `url(${this.backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "stretch",
      backgroundRepeat: "no-repeat",
      //if the pole is top, rotate background image
      transform: isTop ? "rotate(180deg)" : "rotate(0deg)",
      position: "absolute",
      left: `${this.x}px`,
      top: isTop ? "0px" : `${gapY + GAP_HEIGHT}px`,
    });
  }

  updatePosition() {
    this.x -= POLE_SPEED;
    applyCSS(this.element, {
      left: `${this.x}px`,
    });
  }

  reset(x, gapY) {
    this.x = x;
    this.scored = false;
    if (this.isTop) {
      this.height = gapY;
      applyCSS(this.element, {
        height: `${this.height}px`,
        top: "0px",
      });
    } else {
      this.height = SCREEN_HEIGHT - (gapY + GAP_HEIGHT);
      applyCSS(this.element, {
        height: `${this.height}px`,
        top: `${gapY + GAP_HEIGHT}px`,
      });
    }
  }
}

class Game {
  constructor() {
    this.screen = new Screen();
    this.bird = new Bird();
    this.poles = [];
    this.score = 0;
    this.isGameOver = false;
    this.init();
  }

  init() {
    this.screen.addElement(this.bird.element);
    this.createPoles();

    // Add keyboard control
    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        if (this.isGameOver) {
          this.resetGame();
        } else {
          this.bird.jump();
        }
      }
    });

    // Add touch support
    document.addEventListener("touchstart", () => {
      if (this.isGameOver) {
        this.resetGame();
      } else {
        this.bird.jump();
      }
    });

    // add events to model buttons
    // Play Again button
    this.screen.playAgainButton.addEventListener("click", () => {
      this.screen.modal.style.display = "none";
      this.resetGame();
    });
    // Exit button
    this.screen.exitButton.addEventListener("click", () => {
      this.screen.modal.style.display = "none";
    });
  }

  createPoles() {
    for (let i = 0; i < SCREEN_WIDTH / (POLE_WIDTH + POLE_GAP); i++) {
      //x position of pole with gaping
      const x = SCREEN_WIDTH + i * (POLE_WIDTH + POLE_GAP);

      //top position of pole gap
      const minGapY = BIRD_HEIGHT;
      const maxGapY = SCREEN_HEIGHT - GAP_HEIGHT - BIRD_HEIGHT;
      const gapY = Math.random() * (maxGapY - minGapY) + minGapY;

      const topPole = new Pole(x, gapY, true);
      const bottomPole = new Pole(x, gapY, false);
      this.poles.push({ topPole, bottomPole });
      this.screen.addElement(topPole.element);
      this.screen.addElement(bottomPole.element);
    }
  }

  update() {
    this.bird.updatePosition();
    this.updatePoles();
    this.checkCollision();
    this.screen.updateScore(this.score);
  }

  updatePoles() {
    this.poles.forEach(({topPole,bottomPole}) => {
      topPole.updatePosition();
      bottomPole.updatePosition();

      // did bird pass the pole
      if (!topPole.scored && topPole.x + POLE_WIDTH < this.bird.x) {
        topPole.scored = true;
        this.score++;
      }

      // did pole went left of the screen
      if (topPole.x + POLE_WIDTH < 0) {
        // calc gapY position
        const minGapY = BIRD_HEIGHT;
        const maxGapY = SCREEN_HEIGHT - GAP_HEIGHT - BIRD_HEIGHT;
        const gapY = Math.random() * (maxGapY - minGapY) + minGapY;

        // Toggle pole image when recycling
        const newImage = topPole.backgroundImage === POLE_RED_IMG
          ? POLE_GREEN_IMG
          : POLE_RED_IMG;

        topPole.backgroundImage = newImage;
        bottomPole.backgroundImage = newImage;

        applyCSS(topPole.element, {
          backgroundImage: `url(${newImage})`,
        });
        applyCSS(bottomPole.element, {
          backgroundImage: `url(${newImage})`,
        });

        // maintain a gap between poles
        const x = SCREEN_WIDTH + POLE_WIDTH;

        topPole.reset(x, gapY);
        bottomPole.reset(x, gapY);
      }
    });
  }

  checkCollision() {
    for (const { topPole,bottomPole } of this.poles) {
      //hit on top pole edge
      if (
        this.bird.x + BIRD_WIDTH > topPole.x &&
        this.bird.x < topPole.x + POLE_WIDTH &&
        this.bird.y < topPole.height
      ) {
        this.gameOver();
      }
      //hit on bottom pole edge
      if (
        this.bird.x + BIRD_WIDTH > bottomPole.x &&
        this.bird.x < bottomPole.x + POLE_WIDTH &&
        this.bird.y + BIRD_HEIGHT > SCREEN_HEIGHT - bottomPole.height
      ) {
        this.gameOver();
      }
    }

    //hits top or bottom of screen
    if (this.bird.y < 0 || this.bird.y + BIRD_HEIGHT > SCREEN_HEIGHT) {
      this.gameOver();
    }
  }

  gameOver() {
    if (this.isGameOver) return;

    this.isGameOver = true;
    applyCSS(this.screen.modal, {
      display: "block",
    });
  
  }

  resetGame() {
    this.isGameOver = false;
    this.score = 0;
    this.bird.reset();
    applyCSS(this.screen.modal, {
      display: "none",
    });

    // Remove old poles from the screen and the array
    this.poles.forEach(({ topPole, bottomPole }) => {
      this.screen.element.removeChild(topPole.element);
      this.screen.element.removeChild(bottomPole.element);
    });
    this.poles = [];

    // Create new poles
    this.createPoles();

    // Restart the game loop
    this.start();
  }

  start() {
    requestAnimationFrame(() => {
      if (!this.isGameOver) {
        this.update();
        this.start();
      }
    }
    );
  }
}

const game = new Game();
game.start();
