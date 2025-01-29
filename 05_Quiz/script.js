document.addEventListener("DOMContentLoaded", () => {
    
    //* DOM 
    const startBtn = document.getElementById("start-btn")
    const nextBtn = document.getElementById("next-btn")
    const restartBtn = document.getElementById("restart-btn")
    const questionContainer = document.getElementById("question-container")
    const questionText = document.getElementById("question-text")
    const choicesList = document.getElementById("choices-list")
    const resultContainer = document.getElementById("result-container")
    const scoreDisplay = document.getElementById("score")
    
    //? Questions
    const quizQuestions = [
        {
            question: "What is the capital of France?",
            choices: ["Paris", "Berlin", "Madrid", "Rome"],
            answer: "Paris",
        },
        {
            question: "Which planet is known as the Red Planet?",
            choices: ["Mars", "Venus", "Jupiter", "Saturn"],
            answer: "Mars",
        },
        {
            question: "What is the largest mammal in the world?",
            choices: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
            answer: "Blue Whale",
        },
        // {
        //     question: "Who wrote the play 'Romeo and Juliet'?",
        //     choices: [
        //         "William Shakespeare",
        //         "Charles Dickens",
        //         "Leo Tolstoy",
        //         "Mark Twain",
        //     ],
        //     answer: "William Shakespeare",
        // },
        // {
        //     question: "Which element has the chemical symbol 'O'?",
        //     choices: ["Oxygen", "Gold", "Osmium", "Hydrogen"],
        //     answer: "Oxygen",
        // },
        // {
        //     question: "What is the square root of 64?",
        //     choices: ["6", "7", "8", "9"],
        //     answer: "8",
        // },
        // {
        //     question:
        //         "What is the boiling point of water at sea level in degrees Celsius?",
        //     choices: ["90°C", "100°C", "120°C", "80°C"],
        //     answer: "100°C",
        // },
        // {
        //     question: "Which is the smallest prime number?",
        //     choices: ["0", "1", "2", "3"],
        //     answer: "2",
        // },
        // {
        //     question: "What is the hardest natural substance on Earth?",
        //     choices: ["Gold", "Iron", "Diamond", "Silver"],
        //     answer: "Diamond",
        // },
        // {
        //     question: "Which gas do plants primarily absorb for photosynthesis?",
        //     choices: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
        //     answer: "Carbon Dioxide",
        // },
    ];

    //? Global variables
    let currentQuestionIndex = 0
    let score = 0

    //* Buttons 
    //? start button
    startBtn.addEventListener("click", startQuiz)

    //? next button
    nextBtn.addEventListener("click", () => {
        currentQuestionIndex++
        
        if(currentQuestionIndex < quizQuestions.length) {
            startQuiz()
        } else {
            showResult()
        }
        nextBtn.classList.add("hidden")
    })

    //? restart button 
    restartBtn.addEventListener("click", restartQuiz)


    //. start quiz
    function startQuiz() {
        startBtn.classList.add("hidden")
        questionContainer.classList.remove("hidden")
        showQuestion()
    }

    //. show question
    function showQuestion() {
        choicesList.innerHTML = ""
        questionText.textContent = quizQuestions[currentQuestionIndex].question
        quizQuestions[currentQuestionIndex].choices.map((choice) => {
            const li = document.createElement("li")
            li.textContent = choice
            choicesList.appendChild(li)
            
            li.addEventListener("click", () => selectAnswer(choice))
        })
    }

    //.select answer 
    function selectAnswer(choice) {
        nextBtn.classList.remove("hidden")
        const correctAnswer = quizQuestions[currentQuestionIndex].answer
        
        if(correctAnswer === choice) {
            score++
        } 
    }

    //. show result 
    function showResult() {
        questionContainer.classList.add("hidden")
        resultContainer.classList.remove("hidden")
        
        scoreDisplay.textContent = `Your score is ${score} out of ${quizQuestions.length}`
    }

    //. restart quiz 
    function restartQuiz() {
        currentQuestionIndex = 0
        score = 0
        resultContainer.classList.add("hidden")
        startQuiz()
    }

    
});

//? startQuiz
//? show question
//? select answer
//? showResult
