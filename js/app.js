//establish variables for gameboard
let gameboard = document.getElementById('gameboard')
let win_statement = document.getElementById('win_flash')
gameboardSize = 16
gameboard.classList.add('gameboard')
let winner = false //user has not won yet
//-------------------------------------------------

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

//------------------------------------------------
//Count how many tries are left

//add a counter
var counter = Math.sqrt(gameboardSize) + 3;

//display countdown (Startoff)
win_statement.innerText = 'Moves Left: ' + counter;

//---------------------------------------------------
//function for tiles
function changeColor() {

    if (winner == false) { //user plays while winner is false

        //randomize list
        var random = colorChange[Math.floor(Math.random() * colorChange.length)]

        //if square is empty, choose random color
        if (this.className == 'tile') { 

            //countdown for each click
            counter--;

            //display countdown
            win_statement.innerText = 'Moves Left: ' + counter;

            if (counter == 0) {

                //display once out of moves
                win_statement.innerText = 'OUT OF MOVES. GAME OVER';

                //destroy function once 0 is reaches
                winner = true
            }
                
            if (random == explosion) {

                //if color is explosion, END GAME
                winner = true
                this.classList.add('explosion')
                win_statement.innerText = 'Enemy Destroyed!'
                
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

    } else { //user stops playing if they won or out of moves
        
        return;
        
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
        win_statement.innerText = ''

    }

    //reset win back to false
    winner = false

    //reset counter
    counter = Math.sqrt(gameboardSize) + 3;
    win_statement.innerText = 'Moves Left: ' + counter;
    
}

//counter = sqrt of gameboard + 3