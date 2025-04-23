const ROOT = document.querySelector("#root");
const SCREEN_WIDTH = window.innerWidth 
const SCREEN_HEIGHT = window.innerHeight
const BOX_SIZE = 60;
const BOX_TEXT_SIZE = 40;
const SPEED = 4;

function applyCSS(element, styles) {
  Object.assign(element.style, styles);
}

// Collection of colors with their dark and light variants
const colors = [
  {
    name: "red",
    dark: "#C00000",
    light: "#FFD5D5"
  },
  {
    name: "blue",
    dark: "#0000CC", 
    light: "#D5D5FF"
  },
  {
    name: "green",
    dark: "#006600",
    light: "#D5FFD5"
  },
  {
    name: "orange",
    dark: "#CC4400",
    light: "#FFDDCC"
  },
  {
    name: "purple",
    dark: "#660066",
    light: "#E5D5FF"
  },
  {
    name: "pink",
    dark: "#CC0066",
    light: "#FFDDDD"
  },
  {
    name: "yellow",
    dark: "#CCCC00",
    light: "#FFFFCC"
  },
  {
    name: "brown",
    dark: "#663300",
    light: "#D5BFAF"
  },
  {
    name: "gray",
    dark: "#666666",
    light: "#D5D5D5"
  },
];

class Screen {
  constructor() {
    this.element = document.createElement("div");
    this.element.id = "screen";
    applyCSS(this.element, {
      width: `${SCREEN_WIDTH}px`,
      height: `${SCREEN_HEIGHT}px`,
      position: "relative",
      backgroundColor: "black",
    });
    ROOT.appendChild(this.element);
  }

  addElement(element) {
    this.element.appendChild(element);
  }
}

class Box {
  constructor(x, y, color = "red") {
    this.element = document.createElement("div");
    this.element.className = "box";
    this.x = x;
    this.y = y;
    // Increase speed for more noticeable movement
    this.speedX = (Math.random() * 2 - 1) * SPEED;
    this.speedY = (Math.random() * 2 - 1) * SPEED;
    this.randomIndex = Math.floor(Math.random() * colors.length);
    this.darkColor = colors[this.randomIndex].dark;
    this.lightColor = colors[this.randomIndex].light;

    applyCSS(this.element, {
      width: `${BOX_SIZE}px`,
      height: `${BOX_SIZE}px`,
      backgroundColor: this.darkColor,
      position: "absolute",
      zIndex: 20,
    });

    this.updatePosition();
  }

  updatePosition() {
    this.x += this.speedX;
    this.y += this.speedY;

    applyCSS(this.element, {
      left: `${this.x}px`,
      top: `${this.y}px`,
    });
  }

  setText(text) {
    this.element.innerText = text;
    applyCSS(this.element, {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: `${BOX_TEXT_SIZE}px`,
      color: "white",
      fontWeight: "bold",
    });
  }

  showBorder() {
    applyCSS(this.element, {
      boxShadow: `${this.lightColor} 0px 1px 4px, ${this.lightColor} 0px 0px 0px 3px`
    });
    
    // Hide border after 500ms
    setTimeout(() => {
      this.hideBorder();
    }, 500);
  }

  hideBorder() {
    applyCSS(this.element, {
      boxShadow: `0 0 0 0 ${this.lightColor}`,
    });
  }
}

class Game {
  constructor(boxesCount = 10) {
    this.screen = new Screen();
    this.boxes = [];
    this.boxesCount = boxesCount;
  }

  start() {
    this.createBoxes();
    this.keepUpdating = setInterval(() => {
      this.updateBoxes();
    }, 1000 / 60);
  }
  createBoxes() {
    for (let i = 0; i < this.boxesCount; i++) {
      const x = Math.random() * (SCREEN_WIDTH - BOX_SIZE);
      const y = Math.random() * (SCREEN_HEIGHT - BOX_SIZE);
      const box = new Box(x, y);
      // add index text in the box
      box.setText(i);
      this.boxes.push(box);
      this.screen.addElement(box.element);
    }
  }
  updateBoxes() {
    for (let i = 0; i < this.boxes.length; i++) {
      const box = this.boxes[i];
      
      // Update position
      box.updatePosition();

      // Check for wall collisions and handle correctly
      if (this.handleWallCollision(box)) {
        // Reverse direction
        box.speedX = -box.speedX;
        box.speedY = -box.speedY;

        // show border in box
        box.showBorder();

        // Move the box back inside the screen
        if (box.x < 0) box.x = 0;
        if (box.x + BOX_SIZE > SCREEN_WIDTH)
          box.x = SCREEN_WIDTH - BOX_SIZE;
        if (box.y < 0) box.y = 0;
        if (box.y + BOX_SIZE > SCREEN_HEIGHT)
          box.y = SCREEN_HEIGHT - BOX_SIZE;
      }

      // Check for box collisions
      for (let j = i + 1; j < this.boxes.length; j++) {
        const otherBox = this.boxes[j];
        if (this.checkBoxCollision(box, otherBox)) {
          // Simple collision response
          const tempSpeedX = box.speedX;
          const tempSpeedY = box.speedY;
          box.speedX = otherBox.speedX;
          box.speedY = otherBox.speedY;
          otherBox.speedX = tempSpeedX;
          otherBox.speedY = tempSpeedY;

          // Show border in both boxes
          box.showBorder();
          otherBox.showBorder();

          // slighty move the boxes apart
          //check which box is deeper in the other box
          const overlappingX = BOX_SIZE - Math.abs(box.x - otherBox.x);
          const overlappingY = BOX_SIZE - Math.abs(box.y - otherBox.y);
          // move the boxes apart
          if (overlappingX < overlappingY) {
            if (box.x < otherBox.x) {
              box.x -= overlappingX / 2;
              otherBox.x += overlappingX / 2;
            } else {
              box.x += overlappingX / 2;
              otherBox.x -= overlappingX / 2;
            }
          } else {
            if (box.y < otherBox.y) {
              box.y -= overlappingY / 2;
              otherBox.y += overlappingY / 2;
            } else {
              box.y += overlappingY / 2;
              otherBox.y -= overlappingY / 2;
            }
          }

          //update the position of the boxes
          box.updatePosition();
          otherBox.updatePosition();
          
          

        }
      }

    }
  }

  handleWallCollision(box) {
    if (box.x < 0 || box.x + BOX_SIZE > SCREEN_WIDTH) {
      return true
    }
    if (box.y < 0 || box.y + BOX_SIZE > SCREEN_HEIGHT) {
      return true
    }
    return false
  }

  // We can simplify this function now - it's just for detection
  checkBoxCollision(box1, box2) {
    if (
      box1.x < box2.x + BOX_SIZE &&
      box1.x + BOX_SIZE > box2.x &&
      box1.y < box2.y + BOX_SIZE &&
      box1.y + BOX_SIZE > box2.y
    ) {
      return true;
    }
    return false;
  }
}

const game = new Game(30);
game.start();

//
