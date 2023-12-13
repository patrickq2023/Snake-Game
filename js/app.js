function init() {
  //! VARIABLES AND ELEMNTS

  //? ELEMENTS

  // CREATE GRID
  const grid = document.querySelector(".grid");

  //? VARIABLES
  // CONFIG
  const width = 10;
  const height = 10;
  const cellCount = width * height;
  let generateApplePosition
  let score = 0

  //CHARACTER COFIGURATION
  const startingPosition = [44];
  let currentPosition = startingPosition;
  let cells = [];
  const slippy = [44, 45, 46];  
  let slippyTime 
  let slippyDirection = -1

  //! FUNCTIONS
  // CREATE GRIDD CELLS
  function createGrid() {
    // Use the cellCount to create grid cells
    for (let i = 0; i < cellCount; i++) {
      const cell = document.createElement("div");
      // Add index to div elements
      cell.innerText = i;
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
    // Add SNAKE (class) to starting position
    // addSnake([44, 45, 46]);
    createSlippy();
    addApple()
  }

  // CREATE THE ACTUAL SNAKE (SLIPPY)

  function createSlippy() {
    slippy.forEach((cell) => {
      cells[cell].classList.add("snake");
    });
  }
  // MOVE SLIPPY

  function moveSlippy(position) {
    clearInterval(slippyTime)
    slippyTime = setInterval(() => {      
      slippy.forEach((cell) => {
        cells[cell].classList.remove("snake");
      });    
      if (!cells[slippy[0] + slippyDirection].classList.contains('apple'))  {
        slippy.pop()
      }   else { 
        removeApple ()
        addApple()
        score ++
        console.log('Score: ', score)

      }  
      slippy.unshift(slippy[0] + slippyDirection);
      createSlippy();     
    }, 500)
   
  }
// SLIPPY DIRECTION



  // CREATE FOOD RANDOMLY

  function addApple() {
     generateApplePosition = Math.floor(Math.random() * cells.length);
    cells[generateApplePosition].classList.add("apple");    
  }

  function removeApple() {  
    cells[generateApplePosition].classList.remove("apple");
    
  }

  // // ? ADD SNAKE CLASS
  // function addSnake(position) {
  //   console.log("snake being added to the following cells->", position);
  //   cells[startingPosition].classList.add("snake");
  //   cells[currentPosition].style.backgroundColor = "#2ef600";
  // }
  //? REMOVE SNAKE CLASS
  // function removeSnake() {
  // console.log('SNAKE REMOVED', cells, currentPosition)
  //   cells[currentPosition].classList.remove("snake");
  //   cells[currentPosition].style.backgroundColor = "white";
  // console.log(cells[currentPosition].classList)
  // }

  // ? HANDLE MOVEMENT
  function handleMovemet(event) {
   

    const key = event.keyCode;
    const up = 38;
    const down = 40;
    const left = 37;
    const right = 39;

    // Remomve Snake from previous position before updating current position to new cell
    // removeSnake();

   
    // check which key has been pressed and execute code
    if (key === up && slippyDirection !== 10) {
      // console.log("UP");
    // currentPosition -= width;
    slippyDirection = -10
    } else if (key === down && slippyDirection !== -10 ) {
      // console.log("DOWN");
     // currentPosition += width;
     slippyDirection = 10
    } else if (key === left && slippyDirection !== 1) {
      // console.log("LEFT");
      //currentPosition--;
      slippyDirection = -1
    } else if (key === right && slippyDirection !== -1) {
      // console.log("RIGHT");
      //currentPosition++;
      slippyDirection = 1   
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
