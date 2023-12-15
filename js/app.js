function init() {
  //! VARIABLES AND ELEMNTS

  //? ELEMENTS

  // CREATE GRID
  const grid = document.querySelector(".grid");
  const gameOverAudio = document.querySelector("#gameover");
  gameOverAudio.src = "./assets/Gameover.mp3";
  const munchAudio = document.querySelector("#munch");
  munchAudio.src = "./assets/Munch.mp3";
  let scoreBoard = document.getElementById("scoreboard");
  const gameOver = document.getElementById("endofgame")
  

  //? VARIABLES
  // CONFIG
  const width = 20;
  const height = 20;
  const cellCount = width * height;
  let generateApplePosition;
  let score = 0;
  scoreBoard.innerText = `Score ${score}`


  //CHARACTER COFIGURATION
  const startingPosition = [168];
  let currentPosition = startingPosition;
  let cells = [];
  const slippy = [168, 169, 170];
  let slippyTime;
  let slippyDirection = -1;

  //! FUNCTIONS
  // CREATE GRID CELLS

  function createGrid() {
    // Use the cellCount to create grid cells
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement("div");
      // Add index to div elements
      // cell.innerText = i;
      // Add index as an attribute
      cell.dataset.id = i;
      // Add the height and width to each grid cell (div)
      cell.style.height = `${100 / height}%`;
      cell.style.width = `${100 / width}%`;
      // Add cell to grid
      grid.appendChild(cell);
      // Add newly created div cell to cells array
      cells.push(cell);
    }    
    createSlippy();
    addApple();
  }

  // CREATE THE ACTUAL SNAKE (SLIPPY)

  function createSlippy() {
    const [slippyHead, ...slippyBody] = slippy
    cells[slippyHead].classList.add('snakehead')
    slippyBody.forEach((cell) => {
      cells[cell].classList.add("snake");
    });
  }
  function removeSlippy() {
    const [slippyHead, ...slippyBody] = slippy
    cells[slippyHead].classList.remove('snakehead')
    slippyBody.forEach((cell) => {
      cells[cell].classList.remove("snake");
    });
  }
  // MOVE SLIPPY

  function moveSlippy(position) {
    clearInterval(slippyTime);
    slippyTime = setInterval(() => {
      removeSlippy();

  //? Logic for collisions

      const slippyX = slippy[0] % width;
      const slippyY = Math.floor(slippy[0] / width);
      let slippyCollision = false;
      for (let i = 1; i < slippy.length; i++) {
        if (slippy[0] + slippyDirection === slippy[i]) {
          slippyCollision = true;
        }
      }
      if (
        slippyCollision ||
        (slippyX === 19 && slippyDirection === 1) ||
        (slippyX === 0 && slippyDirection === -1) ||
        (slippyY === 19 && slippyDirection === 20) ||
        (slippyY === 0 && slippyDirection === -20)
      ) {
        clearInterval(slippyTime);
        gameOverAudio.play();   
        gameOver.innerHTML = 'GAME OVER!'    
        console.log("GAME OVER");
        document.removeEventListener("keyup", handleMovemet)
        return;
      }

      if (!cells[slippy[0] + slippyDirection].classList.contains("apple")) {
        slippy.pop();
      } else {
        removeApple();
        addApple();
        score++;
        munchAudio.play();
        scoreBoard.innerText = `Score ${score}`;
        console.log("Score: ", score);
      }
      slippy.unshift(slippy[0] + slippyDirection);
      createSlippy();
    }, 250);
  } 
  

  // CREATE FOOD RANDOMLY

  function addApple() {
    generateApplePosition = Math.floor(Math.random() * cells.length);
    cells[generateApplePosition].classList.add("apple");
  }

  function removeApple() {
    cells[generateApplePosition].classList.remove("apple");
  }  

  // ? HANDLE MOVEMENT

  function handleMovemet(event) {
    const key = event.keyCode;
    const up = 38;
    const down = 40;
    const left = 37;
    const right = 39;

    // Remomve Snake from previous position before updating current position to new cell
    
    if (document.getElementById('start-message').innerText === 'Press an arrow key to start the game!') {
      document.getElementById('start-message').innerText = ''
    }

    // check which key has been pressed and execute code
    if (key === up && slippyDirection !== 20) {
      // console.log("UP");
      // currentPosition -= width;
      slippyDirection = -20;
    } else if (key === down && slippyDirection !== -20) {
      // console.log("DOWN");
      // currentPosition += width;
      slippyDirection = 20;
    } else if (key === left && slippyDirection !== 1) {
      // console.log("LEFT");
      //currentPosition--;
      slippyDirection = -1;
    } else if (key === right && slippyDirection !== -1) {
      // console.log("RIGHT");
      //currentPosition++;
      slippyDirection = 1;
    } else {
      // console.log("INVALID KEY");
    }
    // Add snake class once current position has been updated
    moveSlippy(currentPosition);
  }

  //   //! EVENTS
  document.addEventListener("keyup", handleMovemet);
  

  //! PAGE LOAD
  createGrid(); // CREATE GRID
}

window.addEventListener("DOMContentLoaded", init);
