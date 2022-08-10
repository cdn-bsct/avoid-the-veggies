# Avoid the Veggies
#### Unit 1 - GA - Browser Game Project

This game takes a colourful spin from the classic minesweeper game. The only difference is that instead of sweeping for mines, you are avoiding the ones who put veggies on your pizza. If you run into one, it looks like you will have to be picking veggies off the pizza... but lets be honest, no matter how good you are at picking them off, the pizza still has the taste of veggies on it. 

![Blue basics header](https://i.imgur.com/DwNQuSA.png)

This is the wireframe of the project and pseudocode that will give me a rough starting point and outline of how my project is going to look. 

#### **Wireframe Mockup** 
![header for game title, 10x10 grid, text field for win/loss, and reset button. wireframe mockup](https://i.imgur.com/hYdMkb9.png) 

#### **Pseudocode**

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

![the game header](https://i.imgur.com/o97zE2C.png)

![Image of the loaded game screen](https://i.imgur.com/gv5OuvJ.png)

I decided to go with a more simple design. Nothing too fancy or complicated. Sticking to the original idea of minesweeper.

The board, when buttons are pressed, colour the 'pizza' similar to the colour of the toppings on a pizza. Safe spaces represent pepperoni (or any other meat topping) whereas green represents vegetables. (see below)

## **Gameplay**

![Image showing the game board in action](https://i.imgur.com/WtzreOw.png)

In the example above, this is a loss scenario where your pizza is populated with veggies. 

Gameplay is simple, click anywhere on the grid to begin, if you lose, simply reset the board. If you win, all the veggie tiles will deactivate and you will be the veggie free on your pizza... (if you cant seem to win... there is a dev mode that may help you).


## **Dev Mode**

I created a dev mode that shows the value of each space so that you can see the win screen. It also helps with debugging the code and verifying the board is populated with random veggies.

![Imaging showing the dev button in action](https://i.imgur.com/StRYJbx.png)

![technology and data header](https://i.imgur.com/IOy81Im.png)

For this game, I used HTML, CSS, and JS. A big focus for me on this game was manipulating the DOM. 

I primarily programmed this in javascript, but, the data of the elements is stored in the DOM. 
<br/>

# Getting Started
Follow the link below to play the game! 

[Link to Game]()

## **Next Steps**

### Ice Box Steps
> * Make the game more efficient by properly storing all of the data within javascript and manipulating the browser accordingly.

> * Create a difficulty option that changes the size of the board and number of veggies.