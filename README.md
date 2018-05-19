# tictactoe

This is a project from freeCodeCamp where I went slightly above and beyond.

Assignment:
- I can play a game of Tic Tac Toe with the computer.
- My game will reset as soon as it's over so I can play again.
- I can choose whether I want to play as X or O.

But tictactoe may be the least rewarding game to play against a solid algorithm, so I added a "Battle-Mode" where the algorithm
has a 15% chance to place a piece randomly. This gives the player a chance to win, if he or she notices.

The 9 tiles are an array from 0-8, there are 8 ways to win the game (3 horizontally, 3 vertically and 2 diagonally) and these have 
been plotted into a two-dimensional array.

The Board with tiles:  
0-1-2  
3-4-5  
6-7-8  

Victory array:  
[  
	[0,1,2],  
	[3,4,5],  
	[6,7,8],  
	[0,3,6],  
	[1,4,7],  
	[2,5,8],  
	[0,4,8],  
	[2,4,6]  
]

The player decides who goes first at the beginning of each game. At the beginning, the player can also chose X or O.

With the first 3 pieces placed in the game, the algorithm will place in "the cross" (0-4-8 and 2-4-6) - after that, it will win, 
defend, or build as necessary.

The algorithm can also recognize and prioritize the opportunity for a "fork" attack, where placing in a tile will allow for 2 victory 
conditions. It does so by checking for victory sub-arrays it has placed a piece in and with no human pieces in them. Having made
an array of these sub-arrays, it will check for empty tiles present in each. If such one exists, it will place there for a 
certain victory in its next move.

To my best knowledge, the algorithm is infallible.

The player can chose Battle-Mode, in which there is a 15% chance for the algorithm to place randomly. This can mean almost 
certain human victory early in the game, and negligable later in the game. There will be kept score to see, how many wins 
the player and algorithm gets.

The entire UI will shrink down to fit mobile platforms.

The background color is the epitome of good taste.

