# Project 1 Browser Game ReadMe 


## Description

My first project was to create a browser game primarily made with JavaScript, HTML and CSS.
I chose “SNAKE”, the game made popular by Nokia phones from the late 90’s. We were given a choice of games, but this was the one that I was the most familiar with apart from Tetris which was a challenge too far for a first project.


## Deployment link

My project was deployed to github and can be found by clicking the links below:

Game:
https://patrickq2023.github.io/Snake-Game/



## Timeframe

This was a solo project and we had one week to complete, from planning to submission.
We were given the brief on a Friday afternoon, the weekend was spent planning which included analysing the brief and writing up the action plan in Excalidraw.  We started coding on Monday and the goal was to get the functionality working by late Wednesday prior to styling and adding finishing touches on Thursday. Friday morning was final proofing before handing in at midday.


## Technologies Used

The main aim of this project was to use Javascript to build and run the game with minimal HTML and CSS. I also used Excalidraw to make my plan and I used Adobe Photoshop to tweak the background image and the fruit.

## Brief

Snake is a single-player game where the player earns points by guiding the snake to eat food randomly placed on the game board. Each item of food the snake eats the longer it grows. The game is over if the snake hits the edge of the board, or itself. To make things even more challenging, the snake increases speed as the longer it gets!
The aim of the game is to stay alive as long as possible.
Requirements
* The snake should be able to eat food to grow bigger
* The game should end when the snake hits the wall or itself
* Snake speeds up as it eats more
Suggested Enhancements

* Responsive design
* Multi-player mode
* High score table

## Challenges

While not immediately obvious, the logic required to make the game work is relatively straightforward. Some of the enhancements are a little challenging, in particular making the game mobile-friendly.

## Tips

* Make sure you spend plenty of time planning before you start coding
* Make sure you understand all of the rules of the game
* Make a checklist of all the features you want to add to the game
* Keep It Simple Stupid
* Refactor your code as you go
* Make sure you have a good idea of what your MVP is and only add extra features once you have  
   achieved that
* Do just enough styling to get started, then once you have your MVP polish up the styling before moving on


## Planning

The first steps were to do a bit of research into the actual game. There are many versions of “Snake” online, so I needed to familiarise myself with the look and feel of the game, and to play it a few times (it has been a while since I had a Nokia 3310!) Once I was reacquainted with it I needed to choose a look and feel, so I took some screengrabs to add to my plan. 

My whole plan, and subsequent observations shown below.


![Snake Plan](https://github.com/patrickq2023/Snake-Game/assets/151511696/de11d83f-8947-4fbb-9ae7-ecde3fcba929)

## Build/Code Process


### STEP BY STEP THROUGH THE PROCESS

It was very rewarding to go from plan to the final game, although there were many hurdles along the way (as expected!!).
Once the plan was laid out above, I started with making the grid. Initially it was 10 x 10, but I scaled up later.
The next step was to create the snake (SLIPPY) and get him to move manually around the grid.
Once I could move him around the grid, I had to randomly generate fruit for him to eat.
The biggest challenge was to get him moving automatically on a key press.
Once he was moving automatically and following direction changes, he had to grow when eating fruit.
He then had to be contained in the grid. Boundaries were set, if he hit them or himself the game would be over.
With most of the functionality now working, I could set about improving the looks and styling.
I got an image of an apple to use as fruit, then changed his head to another colour.
With most aspects now working, I scaled up to a 20 x 20 grid,and amended the boundary values and start position.
Next I added some audio to the fruit consumption and a game over audio clip
I then did a bit of background styling by dropping in a background image. I then sourced a font for the h1 and the text within the game.
A scoreboard was then added which was then followed by a game over message.
The final thing I had to do was post a start instruction that would disappear once the game was initialised.
In hindsight I would like to have added a refresh or new game instruction...  


## Challenges

The main challenge apart from the obvious like getting the snake to move constantly and the collisions, were actually the enormity of the project from a beginners point of view.  I am sure in the months and years to come I’ll look back and laugh at how nervous I was at the start of this project, but as soon as I started the planning stage I knew that I had a few hurdles to clear. The first few days of the build were painful and slow, but slowly it started piecing together, as I gained confidence and it went more smoothly.

The below snippet of code demonstrates how the snake (Slippy) was created and how he moves.


````javascript

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

````


This next snippet deals with the collision logic and ending the current game if Slippy hits a wall or himself.

````javascript

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



````



## Wins

The whole project feels like a massive step for someone very new to working with JavaScript. From the beginning, the whole process felt very daunting , but working through it methodically and with some support from my tutors I feel I gained an enormous amount of knowledge in a very short space of time. The biggest win was gettin Slippy to move on his own once a key had been pressed to initiate the game. After that the collision logic was also a big hurdle to clear.



## Key Learnings/Takeaways 

Being my first browser game, there were plenty of things that I learned and used for the first time. These are probably easier to list, and are as follows:

The creation of the numbered grid with JavaScript was the basis of the whole game and the first time I had done this.
Understanding that Slippy’s movement  across the grid was a matter of adding and removing classes to the divs as he moved, employing pop and unshift.
Setting up the handle movement and assigning the direction arrow keys.
Setting an interval timer to make him move in a continuous motion, and adjusting the speed.
Defining the borders of the grid and not allowing him to leave the grid.
Setting up the borders and himself as collisions
Creating apples randomly using Math.random
Learning to incorporate audio for the apples being eaten and the game over.
Working out how to get a  point for eating apples and updating the score.
Finally adding a “Game Over” message when he crashed

## Bugs

There are no major bugs in the game, although on a few occasions the new random fruit crops up underneath where Slippy still is and although I did have collision protocols in place this particular bug was still there on the odd occasion. Apart from that it all ran smoothly.



## Future Improvements

There are a few minor improvements that I think could improve the game and the user experience
as a whole. The first thing that I would probably do is make a “New Game” button, rather than requiring the user to have to refresh the page each time they finished a game. I have also noticed that the up and down keys also seem to move the grid up and down in the window a bit and would like to resolve that. The final improvement would be to make it mobile friendly.


## View of the final game in a browser.


![Snake screenshot](https://github.com/patrickq2023/Snake-Game/assets/151511696/4e481278-4de0-45ba-a0bd-623d69854149)


