//you should add the tiles of the gameboard to the DOM
//The AI must select a random tile on the gameboard
//you will select tiles and the game will indicate a hit or miss
//on HIT, the game is over
//add a button to start a new game

//add x amount of tiles to the gameboard
//add event listener to each tile

//listener
//check of its an AI block
//if it is, player wins and end game
//else player missed and keeps playing

//button listener
//reset gameboard and have AI choose new tile
//-------------------------------------------------------------------------------------

//establish variables for gameboard
let gameboard = document.getElementById('gameboard')
let hit = document.getElementById('win_flash')
gameboardSize = 36
gameboard.classList.add('gameboard')
let winner = false //user has not won yet
//--------------------------------------------------------

//for gameboard start
for (let i = 0; i < gameboardSize; i++) {

    var tile = document.createElement('div'); //this creates an element to be added to the gameboard

    tile.classList.add('tile') //add a class

    gameboard.appendChild(tile); //adds all childs to the gameboard, which will display in the DOM

    tile.addEventListener('click', changeColor)

}
//---------------------------------------------

//establish variables for tiles
var explosion = 'hit'
var drop = 'miss'
var colorChange = []

for (let i = 0; i < (gameboardSize - 1); i++) {

    //store them in a list (add more chances to get drop than explosion)
    colorChange.push(drop)
    
}
colorChange.push(explosion)

// console.log(colorChange)

//------------------------------------------------

//function for tiles
function changeColor() {

    if (winner == false) { //user plays while winner is false

        //randomize list
        var random = colorChange[Math.floor(Math.random() * colorChange.length)]

        //if square is empty, choose random color
        if (this.className == 'tile') { 
        
            if (random == explosion) {

                //if color is explosion, END GAME
                winner = true
                this.classList.add('explosion')
                hit.innerText = 'Enemy Destroyed!'
                
            }else{
                
                //if color is drop, continue game
                this.classList.add('drop')

                //remove the miss from the list to increase
                //chance of getting explosion
                colorChange.splice(colorChange, 1)

                // console.log(colorChange)
            }
        
        } else {
            //if square is full, dont overwrite it
            return;
        }

    } else { //user stops playing if they won
        return
    }
    
    //this refers to the word 'tile'

}

//function for reset button
let reset = document.getElementById('reset')
reset.addEventListener('click', resetGame)

function resetGame() {

    //get all tile blocks
    let tileBlocks = document.querySelectorAll('.tile')

    //remove color changes from each tile (DO NOT REMOVE ALL CLASSES!)
    for (const boardClear of tileBlocks) {

        boardClear.classList.remove('drop')
        boardClear.classList.remove('explosion')
        hit.innerText = ''

    }

    //reset win back to false
    winner = false
    
}