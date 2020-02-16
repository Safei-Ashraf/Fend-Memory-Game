/*
 * Create a list that holds all of your cards
 */
const icons = ["fa fa-diamond","fa fa-diamond","fa fa-paper-plane-o", "fa fa-paper-plane-o","fa fa-anchor","fa fa-anchor","fa fa-bolt","fa fa-bolt","fa fa-cube","fa fa-cube","fa fa-leaf","fa fa-leaf","fa fa-bicycle","fa fa-bicycle","fa fa-bomb","fa fa-bomb"];
const gameBoard = document.querySelector('.deck');
//USE frag doc for better performance with loop:
const fragment = document.createDocumentFragment();
let openedCards = [];
let matchedCards = [];
let moves = 0;
let movesCounter = document.querySelector('#movesCounter');
let starsContainer = document.querySelector('.stars');
let timeContainer = document.querySelector('.timer');
let liveTimer, totalSeconds = 0;
let isFirstClick = true;

//Initialize the game:
init();

/*
*
* Logic:
*/
//Start Game:
function init(){
    const shuffledIcons = shuffle(icons);
    for(let i = 0; i <icons.length; ++i)
    { 
        //CREATE the Cards:
        const card = document.createElement('li');
        card.classList.add('card');
        card.innerHTML = `<i class = "${icons[i]}"></i>`;
        fragment.appendChild(card) //ADD to frag to avoid reflow and repaint on browser.
        click(card);
        
    };
    //ADD fragment to actual DOM:
    gameBoard.appendChild(fragment);
    };

//CLICK Event:
function click(card)
{
    card.addEventListener('click', function()
    { // Set Seconds Count:
        let startDate = new Date();
        if(isFirstClick)
            {
                startTimer();
                isFirstClick = false;
            }
       const currentCard = this;
       const previousCard = openedCards[0];  
      //Check we have cards flipped already:
      if(openedCards.length === 1)
      {   //TRUE, then Compare it
        card.classList.add('open', 'show','disabled');
        openedCards.push(this);
         compare(currentCard, previousCard);
      }
      else
      {//FALSE, Add it to array:
        currentCard.classList.add('open', 'show','disabled');
        openedCards.push(this);
      } 
    });
}

//Compare 2 Cards:
function compare(currentCard, previousCard)
{
            if(currentCard.innerHTML === previousCard.innerHTML)
            { //MATCHED:
                currentCard.classList.add('match','shake');
                previousCard.classList.add('match','shake');
                matchedCards.push(currentCard,previousCard);
                //RESET Clicked Cards Array:
                openedCards = [];
                //Check if game ended:
                isOver();
            }
            //Do not Match:
            else
            {   //Delay before Removal:
                setTimeout(function()
                {
                    currentCard.classList.remove('show','open','disabled','wrong');
                    previousCard.classList.remove('show','open','disabled','wrong');
                },1000);
                openedCards = [];
            }
            //ADD a move:
              addMove();
}
//CHECK when Game is OVER:
function isOver()
{
    if(matchedCards.length === icons.length)
    {
        stopTimer();
        alert(`Congratulation You Won in ${totalSeconds} Seconds!`);
        resetAll();
       

        
    }
}

//RESTART Button:
const resetButton = document.querySelector('#reset');
resetButton.addEventListener('click', function ()
{
    //1-Delete All Cards:
    gameBoard.innerHTML = "";

    //2-Intiate a new Game:
    init();
    //3-Reset All Records:
    matchedCards = [];
    moves = 0;
    movesCounter.textContent = 0;
    stopTimer();
    isFirstClick = true;
    totalSeconds = 0;
    timeContainer.innerHTML = totalSeconds + 's';
});

//STOP Timer:
function stopTimer() {
    clearInterval(liveTimer);
}
//Add moves to counter:
function addMove(){
    moves++;
    movesCounter.textContent = moves;
    //Set Rating:
        rating();
}
//Rating Implementation:
function rating()
{ 
   if(moves <= 16){
       starsContainer.innerHTML = 
       `<li><i class="fa fa-star"></i></li>
       <li><i class="fa fa-star"></i></li>
       <li><i class="fa fa-star"></i></li>`
   }
   else if( 16< moves <20)
   {
    starsContainer.innerHTML = 
    `<li><i class="fa fa-star"></i></li>
    <li><i class="fa fa-star"></i></li>`
   }
   else if ( moves >= 21)
   {
       starsContainer.innerHTML= 
       `<li><i class="fa fa-star"></i></li>`
   }
}
//SET default value to time container:
timeContainer.innerHTML = totalSeconds + 's';
//Timer Function:
function startTimer()
{
    liveTimer = setInterval(function()
    {
        totalSeconds++;
        timeContainer.innerHTML = totalSeconds;
    },1000);
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

