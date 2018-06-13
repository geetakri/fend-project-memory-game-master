# Udacity-FEND Memory Game Project

## Table of Contents

* [Project Summary](#project-summary)
* [How the Game works](#how-the-game-works)
* [To play](#to-play)
* [Contributing](#contributing)


## Project Summary
The Memory Game Project requires HTML, CSS, and JavaScript skills in order to make it an interactive one. It is a complete browser-based card matching game (also known as Concentration).It works across all the modern desktop, tablet, and phone browsers.

## How the Game works
The game board consists of sixteen cards arranged randomly in a grid. The deck is made up of eight different pairs of cards, each with different symbols on one side. Initially, the symbol is hidden. At each move, the player flips two hidden cards at a time to locate the ones that match.

On each turn:

* The player flips one card over to reveal its underlying symbol.
* The player then turns over a second card, trying to find the corresponding card with the same symbol.
* If the cards match, both cards stay flipped over
* If the cards do not match, both cards are returned to their initial hidden state.

The game ends once all cards have been correctly matched.

Also, after the player wins the game, a congratulations popup comes up to ask the player if he/she wants to play again. It also lets the player the number of moves, the star rating and time taken to win the game.

A restart button is also available while playing to game to reset the game and start a new game.

Score panel: Displays stars , no of moves and Timer

Initially, No of stars = 3.
If the no of moves is greator than 25, star rating is 1

If the no of moves is greator than 15 and less than or equals to 25, star rating is 2.


## To play

Go to [repository link](https://github.com/geetakri/fend-project-memory-game-master). Either clone or download the repository to your local computer and open the index.html file to your browser.

## Contributing

This repository is for a project for the Front-End Web Developer NanoDegree program at Udacity.

For details, check out [CONTRIBUTING.md](CONTRIBUTING.md).
