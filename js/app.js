/*
 * Create a list that holds all of your cards
 */
 let cardList = ["fa-diamond", "fa-paper-plane-o",
                "fa-anchor", "fa-bolt",
                "fa-cube", "fa-anchor",
                "fa-leaf", "fa-bicycle",
                "fa-diamond", "fa-bomb",
                "fa-leaf", "fa-bomb",
                "fa-bolt", "fa-bicycle",
                "fa-paper-plane-o", "fa-cube"];

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

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


 /*
  * set up the event listener for a card. If a card is clicked:
  *  - display the card's symbol (put this functionality in another function that you call from this one)
  *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
  *  - if the list already has another card, check to see if the two cards match
  *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
  *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
  *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
  *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
  */

  const deck = document.querySelector('.deck');
  const allCards = document.querySelectorAll('.card');
  let movesCounter;
  const stars = document.querySelector(".stars");
  let interval, second, minute, hour;
  const moves = document.querySelector(".moves");
  const timer = document.querySelector(".timer");

  document.body.onload = startGame();
 function startGame(){

    //shuffles Cardlist of 16 cards and generate li elements dynamically under the ul element
     let cardHTML = shuffle(cardList).map(function(card) {
         return generateCardItems(card);
     });
     deck.innerHTML = cardHTML.join('');

     // remove all exisiting classes from each card
     allCards.forEach(function(card) {
       card.classList.remove('show','open','match');
     });

     // reset moves
     movesCounter = 0;
     moves.innerHTML = movesCounter;

     // reset star ratings
     addStars(3);

     //reset timer
     second = 0;
     minute = 0;
     hour = 0;
    // var timer = document.querySelector(".timer");
     timer.innerHTML = "0 mins 0 secs";
     clearInterval(interval);
  }

  //adds required number of list itmes for stars
  function addStars(noOfStars){
      let strHTML ='';
      for(let i=1; i<=noOfStars; i++)
      {
          strHTML += `<li><i class="fa fa-star"></i></li>`;
      }
      stars.innerHTML = strHTML;
    }

  //generates list items for the deck
  function generateCardItems(card){
       return `<li class ="card"><i class = "fa ${card}"></i></li>`;

  }


  let openedCards = [];
  totalCards = document.querySelectorAll('.card');
  let matchedCardPair=0;


  totalCards.forEach(function(card) {
        card.addEventListener('click', function(evt) {

              //pushes open card to the opendedCards Array
              addToOpenedCards(card);

              //adds class show,open to the card class
              showSymbol(card);

              //if the there are two opened cards
              if(openedCards.length === 2) {
                  //increments the move
                  incrementMoves();
                  let firstOpenedCardClassName = openedCards[0].firstElementChild.className;
                  let secondOpenedCardClassName = openedCards[1].firstElementChild.className;

                      //If the two cards match
                      if(firstOpenedCardClassName === secondOpenedCardClassName){

                          //adds class match to them and increments the matched card pair counter
                          lockMatchedCards();
                          matchedCardPair++;
                          gameOver();
                      }
                      //If they dont match
                      else {
                        hideUnmatchedCards();
                    }
              }
        });
  });


 //adds the clicked card to the list of "open" Cards
 function addToOpenedCards(card){
      openedCards.push(card);
 }

 //displays the clicked card's Symbol
 function showSymbol(card){
       card.classList.add('open', 'show');
  }

  //increments the movecounter and starts the timer when the movecounter is one
  function incrementMoves(){
      movesCounter++;
      moves.innerHTML = movesCounter;
      //start the timer when the players clicks the first time
      if(movesCounter == 1){
          second = 0;
          minute = 0;
          hour = 0;
          startTimer();
      }

      if (moves.innerText > 25) {
            //adds one star if the moves are greator than 25
            addStars(1);
        }
      else if (moves.innerText > 15 && moves.innertext <=25){
          //adds two star if the moves are greator than 15 and equals to and smaller than 25
          addStars(2);
      }
      else {
          addStars(3);
      }
  }

  //starts the timer
  function startTimer(){
      interval = setInterval(function(){
          timer.innerHTML = minute+"mins "+second+"secs";
          second++;
          if(second == 60){
              minute++;
              second=0;
          }
          if(minute == 60){
              hour++;
              minute = 0;
          }
      },1000);
  }

  //adds match class to the matched cards and removes the class open and show and resets the openedCards Array
  function lockMatchedCards(){
      openedCards.forEach(function(card) {
          card.classList.remove('open', 'show');
          card.classList.add('match');
      });
      openedCards = [];
  }

  //removes the class open and show from unmatched cards after a certain delay and resets the openedCards Array
  function hideUnmatchedCards(){
      //If the two cards doesnot match , both the cards disappears
      setTimeout(function() {
          openedCards.forEach(function(card) {
            card.classList.remove('open', 'show');
          });
          openedCards = [];
      },200);
  }

  const congPopUpModal = document.querySelector("#congPopup-modal");
  const modalMessage = document.querySelector("#modal-message");
  const playAgain = document.querySelector(".play-again");
  const restart = document.querySelector(".restart");

  //ends the game and displays the congratulations modal popup
  function gameOver(){
      if (matchedCardPair === 8){
            //stop the timer
            clearInterval(interval);
           totalTime = timer.innerHTML;

           noOfStars=stars.children.length;
           //Pops up congratulations Modal and prints the message.
           congPopUpModal.style.display="block";
           modalMessage.textContent= "You have made "+movesCounter+" moves in "+totalTime+", and Your rating is "+noOfStars+" star(s)!";
    }

  }

  //resets the game from start
  restart.addEventListener("click",function(){
    window.location.reload();
  });

  //resets the game from start
  playAgain.addEventListener("click",function(){
    window.location.reload();
  });
