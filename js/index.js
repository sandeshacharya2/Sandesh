quizCollection = {
    "quiz": [
        {
            "category": "All",
            "id": 1,
            "questions": [
                {
                    "id": 1,
                    "question": "Who is father of Physics ?",
                    "options": [
                        "Albert Einsten",
                        "Netwon",
                        "Robert Hook",
                        "James Cook"
                    ],
                    "correct": 0
                },
                {
                    "id": 2,
                    "question": "What is C in E=MC2 ?",
                    "options": [
                        "Current",
                        "Force",
                        "Velocity of Light",
                        "Velocity of sound"
                    ],
                    "correct": 2
                },
                {
                    "id": 3,
                    "question": "Who is current Prime Minister of Nepal ?",
                    "options": [
                        "KP Oli",
                        "Puspha Kamal Dahal",
                        "Baburam Bhattrai",
                        "Sher Bahadur Deuba"
                    ],
                    "correct": 3
                },
                {
                    "id": 4,
                    "question": "Who is current President of Nepal ?",
                    "options": [
                        "Biddha Devi Bhandari",
                        "Rambaran Yadav",
                        "Pramananda Jha",
                        "Kishor Yadav"
                    ],
                    "correct": 0
                },
                {
                    "id": 5,
                    "question": "When is next election going to be held?",
                    "options": [
                        "Mangsir 2",
                        "Mangsir 3",
                        "Mangsir 4",
                        "Mangsir 5"
                    ],
                    "correct": 2
                },
                {
                    "id": 6,
                    "question": "Who is father of Computer ?",
                    "options": [
                        "Albert Einsten",
                        "Netwon",
                        "Charles Babbage",
                        "James Cook"
                    ],
                    "correct": 2
                },
                {
                    "id": 7,
                    "question": "What is full form of WWW ?",
                    "options": [
                        "World Wolf Warm",
                        "World Web Width",
                        "World Width Web",
                        "World Wide Web"
                    ],
                    "correct": 3
                },
                {
                    "id": 8,
                    "question": "What is full form of MODEM ?",
                    "options": [
                        "Module Deno Module",
                        "Modulator and Demodulator",
                        "Month De Mario",
                        "Month of December"
                    ],
                    "correct": 1
                },
                {
                    "id": 9,
                    "question": "What is the Capital City of Bhutan?",
                    "options": [
                        "Thimpu",
                        "Dhaka",
                        "Delhi",
                        "Kolkata"
                    ],
                    "correct": 0
                },
                {
                    "id": 10,
                    "question": "What is the Headquarter of Gandaki Province ?",
                    "options": [
                        "Kathmandu",
                        "Chitwan",
                        "Baglung",
                        "Pokhara"
                    ],
                    "correct": 3
                },
            ]
        },
    ],
    "version": "1.0.0",
    "author": "Madhav Gautam",
    "email": "hola@gautammadhav.com.np",
    "result_code": "200",
    "result_msg": "Success"
};

let gameTime = new Audio("./sounds/gametime.mp3")
let success = new Audio("./sounds/success.mp3");
let failure = new Audio("./sounds/lose.mp3");

let question = [];
let categoryTitle = '';

// inital default values
let questionNumber = 1;
let playerScore = 0;
let wrongAttempt = 0;
let indexNumber = 0;

// opern welcome screen on load
function openWelcomeModal() {
    document.getElementById('welcome-modal').style.display = 'flex';
}

// fetch all the data from api
function startGame() {
    document.getElementById('multiple-options').innerHTML = '';
    document.getElementById('demo').innerHTML = '';

    // now hiding welcome screen
    document.getElementById('welcome-modal').style.display = "none";


    const random = quizCollection.quiz[0];
    categoryTitle = random.category;
    question = random.questions;

    // selecting first question
    selectQuestion(0);
}

// Actually Starting the game and displaying questions in the screen
function selectQuestion(index) {
    document.getElementById('multiple-options').innerHTML = '';
    document.getElementById('demo').innerHTML = '';

    document.getElementById('display-question').innerHTML =
        'Loading Question.... Please Wait !'; // during waiting of qns show proper message to user
    document.getElementById('display-category').innerHTML = ``;

    setTimeout(async () => {
        handleQuestions(index);
    }, 2000);
}

let alreadyAskedQuestions = []; //empty array to keep track of already asked questions
async function handleQuestions(index) {
    // clear options if not cleared already
    document.getElementById('multiple-options').innerHTML = '';


    /*function to shuffle  Questions array
     select random question from selected category */
    const random = question[Math.floor(Math.random() * question.length)];

    // updating options in view port
    for (i = 0; i < random.options.length; i++) {
        document.getElementById("multiple-options").innerHTML += `<span id="option-${i}" onclick="checkForAnswer(${i})"> <p>${random.options[i]} </p></span>`
    }

    if (!alreadyAskedQuestions.some((e) => e.id === random.id)) {
        /* if this question  is not already aksed push to alreadyAskedQuestions */
        alreadyAskedQuestions.push(random);
    } else if (
        alreadyAskedQuestions.some((e) => e.id === random.id) &&
        alreadyAskedQuestions.length !== question.length
    ) {
        /* if this question is already asked but all question from this category is not completed 
        increase the index to get another question which is not asked already*/
        return handleQuestions(++index);
    } else if (alreadyAskedQuestions.length === question.length) {
        // here all no more questions are left; so ending game
        return handleEndGame();
    }

    const currentQuestion = alreadyAskedQuestions[alreadyAskedQuestions.length - 1];
    document.getElementById('question-number').innerHTML = questionNumber;
    document.getElementById('player-score').innerHTML = playerScore;


    // update question and category in the view port
    document.getElementById('display-question').innerHTML =
        currentQuestion.question;
    document.getElementById(
        'display-category'
    ).innerHTML = `[${categoryTitle}]`;

    gameTime.play();
}

// check if the selected answer is correct or not
function checkForAnswer(ans) {
    
    // proper message after right answer submittion
    document.getElementById(`option-${ans}`).style.backgroundColor = 'black';
    
    setTimeout(()=>{
        const currentQuestion = alreadyAskedQuestions[indexNumber]; //gets current Question

        // checking if checked radio button is same as answer
        if (currentQuestion.correct === ans) {
            gameTime.pause();
            success.play();
    
            // proper message after right answer submittion
            document.getElementById(`option-${ans}`).style.backgroundColor = 'green';
    
            setTimeout(function () {
                // get next question in case of correct answer
                gameTime.play();
                selectQuestion(indexNumber);
            }, 3000);
    
            playerScore++; // increase score
            indexNumber++; // increase index
            questionNumber++; // increase questionNumber
        } else {
    
            wrongAttempt++;
    
            gameTime.pause();
            failure.play();
    
            // proper message after wrong answer submittion
            document.getElementById(`option-${ans}`).style.backgroundColor = 'red';
            document.getElementById(`option-${currentQuestion.correct}`).style.backgroundColor = 'green';
            document.getElementById('categoryCompleted').innerHTML = '';
    
    
            // end in case of wrong answer with score and other message
            setTimeout(() => {
                handleEndGame();
            }, 3500);
        }
    },10000)
}

// function for when all questions being answered
function handleEndGame() {
    alreadyAskedQuestions = [];

    //data to display to score board
    document.getElementById('wrong-answers').innerHTML = wrongAttempt;
    document.getElementById('right-answers').innerHTML = playerScore;
    document.getElementById('score-modal').style.display = 'flex';

    let finalMessage = "Game Over !!"
    if(playerScore===question.length){
        finalMessage = 'Hurray !! Congratulations Genius'
    }
    document.getElementById('final-message').innerHTML = finalMessage;
}

//closes score modal and resets game
function closeScoreModal() {
    questionNumber = 1;
    playerScore = 0;
    wrongAttempt = 0;
    indexNumber = 0;
    alreadyAskedQuestions = [];

    startGame();

    document.getElementById('score-modal').style.display = 'none';
}

//function to close warning modal
function closeOptionModal() {
    document.getElementById('option-modal').style.display = 'none';
}