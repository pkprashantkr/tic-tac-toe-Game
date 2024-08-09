let boxes = document.querySelectorAll('.box')
let resetBtn = document.querySelector('#reset-btn')
let newGameBtn = document.querySelector('#new-btn')
let msgContainer = document.querySelector('.msg-container')
let msg = document.querySelector('#msg')


let turnO = true;       // player O
let count = 0;          // to track draw 

const winPatterns = [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8]
]


// Reset or Button
const resetGame = () => {
    turnO = true
    enableBtns()
    msgContainer.classList.add("hide")
}


boxes.forEach((box) => {

    // Making Buttons Clickable
    box.addEventListener('click', () => {
        console.log("box clicked");
        if(turnO){                      // Player O turn
            box.innerText = "O"
            box.classList.add('o-color')
            turnO = false;
        } else{                           // Player X turn
            box.innerText = "X"
            box.classList.add('x-color')
            turnO = true
        }
        box.disabled = true             // restricted from double click
        count++

        let isWinner = checkWinner()

        if(count === 9 && !isWinner){
            gameDraw()
        }
    })
})

    // Function to disable buttons after winning
    const disableBtns = () => {
        for (let box of boxes) {
            box.disabled = true
        }
    }


    // Function for Draw
    const gameDraw = () => {
        msg.innerText = "Game was a Draw..."
        msgContainer.classList.remove("hide")
        disableBtns()
    }


    // Function to enable boxes
    const enableBtns = () => {
        for (let box of boxes) {
            box.disabled = false
            box.innerText = ""
        }
    }

    // For Winner Message
    const showWinner = (winner) => { 
        msg.innerText = `Congrats... Winner is ${winner}`
        msgContainer.classList.remove("hide");
        disableBtns()    
    }


    // For checking the patterns
    const checkWinner = () => {
            for(let pattern of winPatterns){
                let pos1Val = boxes[pattern[0]].innerText;
                let pos2Val = boxes[pattern[1]].innerText;
                let pos3Val = boxes[pattern[2]].innerText;

                if(pos1Val != "" && pos2Val != "" && pos3Val != ""){
                    if(pos1Val === pos2Val && pos2Val === pos3Val){
                        console.log("Winner", pos1Val);
                        showWinner(pos1Val);
                    }
                }
            }
    }


newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)