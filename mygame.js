var images = ["Images/laughemoji.png", "Images/hearteyesemoji.png", "Images/devilemoji.png", "Images/freezeemoji.png", "Images/poopemoji.png", "Images/angryemoji.png", "Images/sunglassemoji.png", "Images/skullemoji.png", "Images/haloemoji.png"];
        start();
        console.log('starting');
        var allImages = [];
        var shuffledImages = [];
        var matchedImages = [];
       
        function start() {
            numTries = 0;
            var x = document.getElementById("score");
            x.innerHTML = "Score: " + numTries
            document.getElementById("left-side").innerHTML = "Play this game and test your memory. Only 0.01% of people can beat this game.";
            document.getElementById("right-side").innerHTML = "Good Luck!";
            document.getElementById("left-side").style.color = "darkred";
            document.getElementById("right-side").style.color = "darkred";
            document.getElementById("title").style.color = "darkred";
            document.getElementById("title").style.textShadow = "5px 5px 5px black";
            document.getElementById("start").style.backgroundColor = "darkRed";
            x.style.color = "white";
            matchedImages = [];
            cardGuess = [];
            cardMatched = [];
            $('#match-alerts').hide();
            // randomize images : pick a random from images, add it twice to allImages, shuffle and save in matched images
            $('#match-grid').html('');
            allImages = [];
            shuffledImages = [];
            for (var i = 0; i < 1; i++) {
                randomizeImages();
            }
            shuffledImages = shuffleArray(allImages);
            // creates 12 card images
            for (var i = 0; i < 18; i++) {
                var cardDiv =
                    "<div class='card-container' id='card-" +
                    i +
                    "'><div class='card card_front'>?</div><div class='card card_back'><img draggable='false' src='" +
                    shuffledImages[i] +
                    "' ></div></div>";
                $('#match-grid').append(cardDiv);
            }
            addFlip();
        }
        function randomizeImages() {
            // get a random image from the list of images
            var randomImage1 = images[0];
            var randomImage2 = images[1];
            var randomImage3 = images[2];
            var randomImage4 = images[3];
            var randomImage5 = images[4];
            var randomImage6 = images[5];
            var randomImage7 = images[6];
            var randomImage8 = images[7];
            var randomImage9 = images[8];
         
            for (var i = 0; i < 2; i++) {
                allImages.push(randomImage1);
                allImages.push(randomImage2);
                allImages.push(randomImage3);
                allImages.push(randomImage4);
                allImages.push(randomImage5);
                allImages.push(randomImage6);
                allImages.push(randomImage7);
                allImages.push(randomImage8);
                allImages.push(randomImage9);
            }
            console.log('all images', allImages);
            return allImages;
        }
        // flips the card that is clicked
        var cardHTML;
        var cardID;
        var cardGuess = [];
        var cardMatched = [];
        var numTries = 0
        var x= document.getElementById("score")
        function addFlip() {
            var card = $('.card-container');
            // What happens when a card is clicked
            card.on('click', function (event) {
                $(this).addClass('is-flipped');
                cardID = $(this).attr('id');
                // check to see if card can be clicked on
                if (cardID == cardGuess[0]) return;
                if ($(this).hasClass('matched')) return;
                cardGuess.push(cardID);
                console.log('GUESS', cardGuess);
                
                document.getElementById("score").innerHTML = numTries.value
                if (cardGuess.length == 2) {
                    var card1 = document.getElementById(cardGuess[0]);
                    var card2 = document.getElementById(cardGuess[1]);
                    cardGuess = [];
                    setTimeout(() => checkAnswers(card1, card2), 1000);
                
                    numTries++
                    x.innerHTML = "Score: " + numTries
                    

                }
                if (cardGuess.length == 1){
                    x.innerHTML = "Score: " + numTries
                
                }
            });
        
        }
        
   
     
      
        function checkAnswers(card1, card2) {
            console.log('matching');
            if (card1.innerHTML == card2.innerHTML) {
                console.log('YES');
            

                cardMatched.push(card1, card2);
                card1.classList.add('matched');
                card2.classList.add('matched');
                document.getElementById("right-side").innerHTML = "You Got A Match!"
                document.getElementById("right-side").style.color = "Green"
            } else {
                console.log('NO');
                card1.classList.remove('is-flipped');
                card2.classList.remove('is-flipped');
                document.getElementById("right-side").innerHTML = "Not a Match Try again."
                document.getElementById("right-side").style.color = "red"
            }
            if (cardMatched.length == shuffledImages.length) {
                document.getElementById("left-side").innerHTML = "Winner Winner!!!";
                document.getElementById("right-side").innerHTML = "Click Restart To Play Again";
                document.getElementById("left-side").style.color = "Green";
                document.getElementById("right-side").style.color = "Green";
                document.getElementById("title").style.color = "Green";
                document.getElementById("title").style.textShadow = "5px 5px 5px Black";
                document.getElementById("start").style.backgroundColor = "Green"
                x.style.color = "Green"
            }
        }
       
       
        function alertMatch(alertMsg) {
            var message = alertMsg;
            $('#match-alerts').html(message).show();
            setTimeout(function () {
                $('#match-alerts').hide();
            }, 1000);
        }
        //  Durstenfeld shuffle, a function to shuffle arrays
        function shuffleArray(array) {
            array.sort(() => 0.5 - Math.random())
            return array;
        }