# Avoid the Veggies
#### Unit 1 - GA - Browser Game Project

This game takes a colourful spin from the classic minesweeper game. The only difference is that instead of sweeping for mines, you are avoiding the ones who put veggies on your pizza. If you run into one, it looks like you will have to be picking veggies off the pizza... but lets be honest, no matter how good you are at picking them off, the pizza still has the taste of veggies on it. 

## The Basics 

This is the wireframe of the project and pseudocode that will give me a rough starting point and outline of how my project is going to look. 

#### Wireframe Mockup 
![header for game title, 10x10 grid, text field for win/loss, and reset button. wireframe mockup](https://i.imgur.com/hYdMkb9.png) 

#### Pseudocode

Have a function that randomly generates a position for the veggies on the 10x10 grid.
- Auto generate so that 30% of the space is filled with veggies

Use an event listener to listen for a click anywhere on the grid.
- Generate an if statement to check to see if there is a veggie there
- Expand the slot selection if there isn’t 
- If there is one within the perimeter, generate a number stating how many veggies are hidden

When a veggie is clicked, grey out the board and return a statement that they are having veggies for dinner

If all available spaces are clicked, and only veggies remain active, generate a message that they have successfully avoided the veggies.

Allow for the player, at any time, rest the board by clicking on a button
- Use an event listener to wait for a click
- Initialize the application.

ICEBOX: Give the player and input to select their difficulty
- Depending on their choice 15%, 30%, or 45% of the board will have veggies.


