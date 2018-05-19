/*
Missions:
- Chose X or O
- Play vs CPU
- Reset on its own

There are 8 possible win scenarios.
3 horizontal
3 vertical
2 diagonal; 1,5,9 - 7,5,3

Each Row can thus be hardcoded as arrays and checked.

The AI must first check four scenarios - Game Over, Win, Defend and Build.
If win is possible, it is preferable.
Else if Defense is necessary, do that.
Else, the AI can Build by putting a piece on a Row, preferably one where there is no human presence and the AI already has a piece.

Each Tile could have several boolean values, but I think I'll opt for 0,1,2.
0: Open tile
1: Human tile
2: AI tile

Additional ideas: Make a game-mode where the AI makes mistakes. Keep score.
*/

let player = 0;
let computer = 0;

let victory = false;
let battle = false;
let start = true;
let hum = true; // By default human turn to set pieces
let tile = [0,0,0,0,0,0,0,0,0]; // The 9 tiles - 0 will mean not occupied, 1 will mean human occupies it, 2 will mean the AI occupies it

// Array of all possible victory scenarios
let vic = [
	[0,1,2],
	[3,4,5],
	[6,7,8],
	[0,3,6],
	[1,4,7],
	[2,5,8],
	[0,4,8],
	[2,4,6]
	];

// Toggle between X or O ?
let cross = true; // Player places crosses
document.getElementById('selector').addEventListener('click', function() { 
	let i = 0;
	let j = 0; // makes sure the player can't change type mid-game
	while(i < 9){ 
		if(tile[i] !== 0){
			j++;
			break;
		}
		i++;
	}
	if(j === 0 && cross === true){
		cross = false;
		document.getElementById('selector').innerHTML = "&xcirc;";
	}
	else if(j === 0 && cross === false){
		cross = true;
		document.getElementById('selector').innerHTML = "&#x2715;";
	}
});

// Reset
function reset(){
	i = 0;
	while(i < 9){
		tile[i] = 0;
		i++;
	}
	document.getElementById('header').innerHTML = "<h1>&nbsp;</h1>";
	hum = true;
	
	i = 0;
	let id = "";
	while(i < 9){ 
		id = "t" + i;
		if(tile[i] === 0){ 
			document.getElementById(id).innerHTML = "&nbsp;";
		} 
		i++;
	}
	start = true;
	
	// Reset color from potential victory
	let vid = '';
	let inc = 0;
	while(inc < 9){
		vid = 't'+ inc;
		document.getElementById(vid).style.color = 'red';
		inc++;
	}
	victory = false;
	
	// Keep Score
	document.getElementById('computer').innerHTML = computer;
	document.getElementById('player').innerHTML = player;

	// Re-allows for the choice between X and O
	document.getElementById('selector').style.color = "rgba(255,0,0,1)";
	document.getElementById('selector').style.transition = "color 1s";
}

// Checks if the game was a draw/tie
function drawCheck(){
	j = 0;
	i = 0;
	while(i < 9){
		if(tile[i] !== 0){
			j++;
		}
		i++
		if(j === 9 && victory !== true){
			document.getElementById('header').innerHTML = "<h1>It's A Draw...</h1>";
			hum = undefined;
			setTimeout(function(){ reset(); }, 3000);
		}
	}
}

// The "Let AI Start" button
document.getElementById('ai').addEventListener('click', function() {
	if(start){
		hum = false; 
		start = false;
		aiTurn();
	}
}); 

// The "Battle-Mode On!" toggle button
document.getElementById('footer').addEventListener('click', function() {
	if(battle === false){
		battle = true; 
		document.getElementById('footer').innerHTML = "Battle-Mode On!";
		
		document.getElementById('computer').style.color = "rgba(255,0,0,1)";
		document.getElementById('computer').style.transition = "color 1s";
		document.getElementById('player').style.color = "rgba(255,0,0,1)";
		document.getElementById('player').style.transition = "color 1s";
	}
	else {
		battle = false;
		document.getElementById('footer').innerHTML = "Training";
		
		document.getElementById('computer').style.color = "rgba(255,0,0,0)";
		document.getElementById('computer').style.transition = "color 1s";
		document.getElementById('player').style.color = "rgba(255,0,0,0)";
		document.getElementById('player').style.transition = "color 1s";
	}
}); 

// Render function
function render(){
	let i = 0;
	let id = "";
	while(i < 9){ 
	
		id = "t" + i;
		if(tile[i] === 0){ 
			document.getElementById(id).innerHTML = "&nbsp;";
		} 
		else if(tile[i] === 1 && cross === true){ 
			document.getElementById(id).innerHTML = "&#x2715;"; 
		} 
		else if(tile[i] === 1 && cross === false){ 
			document.getElementById(id).innerHTML = "&xcirc;"; 
		} 
		else if(tile[i] === 2 && cross === true){ 
			document.getElementById(id).innerHTML = "&xcirc;"; 
		} 
		else if(tile[i] === 2 && cross === false){ 
			document.getElementById(id).innerHTML = "&#x2715;"; 
		} 
		i++;
	}
	drawCheck();
}

// Do this at each click
document.addEventListener('click', function() { 
	render();
	
	document.getElementById('computer').innerHTML = computer;
	document.getElementById('player').innerHTML = player;
	
	// Selector Check and Render
	let i = 0;
	let j = 0; // makes sure the player can't change type mid-game
	while(i < 9){ 
		if(tile[i] !== 0){
			j++;
			break;
		}
		i++;
	}
	if(j === 0){
		document.getElementById('selector').style.color = "rgba(255,0,0,1)";
		document.getElementById('selector').style.transition = "color 1s";
	}
	else{
		document.getElementById('selector').style.color = "rgba(255,0,0,0)";
		document.getElementById('selector').style.transition = "color 1s";
	}
});

//Place pieces functions
function aip(x){ // AI Place piece on the board
	tile[x] = 2; 
	hum = true;
}

function hp(y){ // Human Place piece on the board
	tile[y] = 1; 
	hum = false;
	aiTurn();
}

// Listens at each tile; if unoccupied it gets occupied and it is no longer the human's turn
document.getElementById('t0').addEventListener('click', function() { if(tile[0] === 0 && hum === true){ hp(0); }});
document.getElementById('t1').addEventListener('click', function() { if(tile[1] === 0 && hum === true){ hp(1); }});
document.getElementById('t2').addEventListener('click', function() { if(tile[2] === 0 && hum === true){ hp(2); }});
document.getElementById('t3').addEventListener('click', function() { if(tile[3] === 0 && hum === true){ hp(3); }});
document.getElementById('t4').addEventListener('click', function() { if(tile[4] === 0 && hum === true){ hp(4); }});
document.getElementById('t5').addEventListener('click', function() { if(tile[5] === 0 && hum === true){ hp(5); }});
document.getElementById('t6').addEventListener('click', function() { if(tile[6] === 0 && hum === true){ hp(6); }});
document.getElementById('t7').addEventListener('click', function() { if(tile[7] === 0 && hum === true){ hp(7); }});
document.getElementById('t8').addEventListener('click', function() { if(tile[8] === 0 && hum === true){ hp(8); }});

// Algorithm for the "A.I.".
function aiTurn(){
	setTimeout(function(){ // 700ms delay, makes the "A.I." seem less aggressive
		
		// Random placement chance for each placement in Battle-Mode
		let r = Math.random();
		if(battle === true && hum === false && r > .85){ // 15%
			console.log('A.I. Places Randomly!');
			let i = 0;
			let ranArray = [];
			while(i < 9){
				if(tile[i] === 0){
					ranArray.push(i);
				}
				i++;
			}
			let q = Math.random();
			let p = ranArray.length;
			r = Math.floor(q * ranArray.length);
			let s = ranArray[r];
			aip(s);
		}
		
		// Check for human victory
		let i = 0;
		let j = 0;
		let hv = 0;
		let k = 0;
		let victoryArr = [];
		
		// Check for draw
		drawCheck();

		while(i < vic.length){ // each victory row
			j = 0;
			hv = 0; //Human Victory counter
			k = 0;
			while(j < 3){ // runs through row of 3
				k = vic[i][j]; // k is value of vic[i][j]
				if(tile[k] === 1){ 
					hv++;
					victoryArr[j] = k;
				}
				if(hv === 3){
					/* Human Victory Dance! */
					let vid = '';
					let inc = 0;
					while(inc < 3){
						vid = 't'+ victoryArr[inc];
						document.getElementById(vid).style.color = 'blue';
						inc++;
					}
					document.getElementById('header').innerHTML = "<h1>You Are Victorious!</h1>";
					player++;
					victory = true;
					hum = undefined;
					setTimeout(function(){ reset(); }, 3000);
				}
				j++;
			}
			i++;
		}

		// Check for ai victory
		i = 0;
		while(i < vic.length && hum === false){ // each victory row
			let j = 0;
			let aiv = 0; //AI Victory counter
			let k = 0;
			let m = 0;
			while(j < 3){ // runs through row of 3
				k = vic[i][j]; // k is value of vic[i][j]
				if(tile[k] === 2){ aiv++; }
				if(aiv === 2){
					/* AI Wins if open, place accordingly */
					m = 0;
					let l = 0;
					while(l < 3){
						m = vic[i][l];
						if(tile[m] === 0){
							aip(m); // If one of the tiles is empty, place a piece
							document.getElementById('header').innerHTML = '<h1>A.I. Victory</h1>';
							if(battle === true){ computer++; }
							hum = undefined;
							victory = true;
							setTimeout(function(){ reset(); }, 3000);
						}
						l++;
					}
				}
				j++;
			}
			i++;
		}
		
		// Check for human threat (2 in a vic)
		i = 0;
		while(i < vic.length && hum === false){ // each victory row
			let j = 0;
			let ht = 0;
			let k = 0;
			let m = 0;
			while(j < 3){ // runs through row of 3
				k = vic[i][j]; // k runs through the value of each element in the vic sub-arrays
				if(tile[k] === 1){ ht++; }
				if(ht === 2){
					/* Possible Human Threat, place accordingly! */
					m = 0;
					let l = 0;
					while(l < 3){
						m = vic[i][l];
						if(tile[m] === 0){
							aip(m); // If one of the tiles is empty, place a piece
						}
						l++;
					}
				}
				j++;
			}
			i++;
		}
		
		// Build up an attack - find empty vic
		i = 0;
		j = 0;
		k = 0;
		while(i < tile.length){ 
			if(tile[i] === 1){ j++; } // Human tiles
			if(tile[i] === 2){ k++; } // AI tiles
			i++;
		}
		// Place the first tac of the game in "the cross" (should optimally always be the middle tile, but this keeps the game a bit fresh without sacrificing much)
		if(j === 0 && hum === false){
			let occ = (Math.floor(Math.random() * 5))*2; // Cross is even numbers
			aip(occ);
			hum = true;
		}
		// Place the second tac of the game, always center or if occupied, corner, react
		else if(j+k === 1 && hum === false){
			if(tile[4] === 0){
				aip(4);
				}
			else{
				switch(Math.floor(Math.random() * 4)){ // any corner if player has placed center
					case 0:
						aip(0);
						break;
					case 1:
						aip(2);
						break;
					case 2:
						aip(6);
						break;
					case 3:
						aip(8);
						break;
				}
			}
		}
		
		else if(tile[4] === 0 && hum === false){ aip(4); }
		
		// Place the third tac of the game
		else if((j+k) === 2 && hum === false){
			
			// Press in a corner
			switch(Math.floor(Math.random() * 3)){ // any corner not occupied
				case 0:
					if(tile[0] === 0 && tile[8] !== 1){ aip(0); }
					else { aip(2); }
					break;
				case 1:
					if(tile[2] === 0 && tile[6] !== 1){ aip(2); }
					else { aip(6); }
					break;
				case 2:
					if(tile[6] === 0 && tile[2] !== 1){ aip(6); }
					else { aip(8); }
					break;
			}
		}
		
		// Checks if it can place a piece so it has two victory options and the human cannot defend
		else if(hum === false){
			let arrPotential = []; // array for potential vic-sub-arrays
			let vicIndexNumber = 0;
			let potVic = 0;

			let placed = 0;
			let empty = 0;
			i = 0;
			let k = 0;
			
			// Makes array of vics with potential
			while(i < 8){
				placed = 0;
				empty = 0;
				j = 0;
				while(j < 3){
					vicIndexNumber = vic[i][j];
					if(tile[vicIndexNumber] === 2){ placed++; } // has this been filled with the placed tile in question? Is the tile === 2 ??
					if(tile[vicIndexNumber] === 0){ empty++; } // is this empty?
					potVic = vic[i];
					if(placed === 1 && empty === 2){ arrPotential.push(potVic); }
					j++;
				}
				i++;
			}

			// Finnish Him!!
			i = 0;
			while(i < arrPotential.length-1){
				j = 0;
				while(j < 3){
					k = 0;
					while(k < 3){
						if(arrPotential[i][j] === arrPotential[i+1][k] && tile[ arrPotential[i][j] ] !== 2 && hum === false){
							x = arrPotential[i][j];
							aip(x);
						}
						k++;
					}
					j++;
				}
				i++;
			}
			
			// Place within open vic so as to not waste a placement
			i = 0;
			j = 0;
			k = 0;
			let a = 0;
			let b = 0;
			let check = 0;
			while(i < 8){
				while(j < 3){
					// tile value of vic position
					check = tile[vic[i][j]];
					a = 0;
					b = 0;
					if(check === 2){ a++; }
					if(check === 0){ b++; }
					if(a === 1 && b === 2){
						while(k < 3){
							if(tile[vic[i][k]] === 0){ aip(k); }
						}
					}
					j++;
				}
				i++;
			}

			// Else random
			i = 0;
			arr = [];
			while(i < 9 && hum === false){
				if(tile[i] === 0){arr.push(i);}
				i++;
			}
			
			a = arr.length;
			b = Math.floor(Math.random() * a);
			let c = arr[b];
			aip(c);
			i = 0;
			j = 0;
			drawCheck();
		}
		
	/* Extra Render Update */
		render();
		
	}, 700);
}













