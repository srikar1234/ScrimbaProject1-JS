// 2. Create the player object. Give it two keys, name and chips, and set their values
let player ={
    name: "Srikar",
    chips: 150
}
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""
let messageEl = document.getElementById("message-el")
let sumEl = document.getElementById("sum-el")
let cardsEl = document.getElementById("cards-el")
let playerEl = document.getElementById("player-el")
// 3. Grab ahold of the player-el paragraph and store it in a variable called playerEl

// 4. Render the player's name and chips in playerEl
playerEl.textContent = player.name + " : $" + player.chips
function getRandomCard() {
    let randomNumber = Math.floor( Math.random()*13 ) + 1
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function startGame() {
    isAlive = true
    let firstCard = getRandomCard()
    let secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame()
    document.getElementById("button-newcard-id").textContent = "New Card"
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else { 
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}


function newCard() {
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()
        if(sum > 21)
            document.getElementById("button-newcard-id").textContent = "TRY AGAIN"
        if(sum===21){
             redo()
        }
    }
    else{
        redo()
    }
}

function redo(){
    for(let i = 0; i  < cards.length; i+=1)
            cards.pop()
        cardsEl.textContent = "Cards: "
        sumEl.textContent = "Sum: " 
}