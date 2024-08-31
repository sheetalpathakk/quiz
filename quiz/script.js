const questions = [
    {
        question: "Which is the largest state of India?",
        answers: [
            { text: "UTTAR PRADESH", correct: false },
            { text: "MAHARASHTRA", correct: false },
            { text: "RAJASTHAN", correct: true },
            { text: "MADHYA PRADESH", correct: false },
        ]
    },
    {
        question: "Which is the smallest state of India?",
        answers: [
            { text: "UTTAR PRADESH", correct: false },
            { text: "SIKKIM", correct: false },
            { text: "TRIPURA", correct: false },
            { text: "GOA", correct: true },
        ]
    },
    {
        question: "What is the capital of GUJARAT?",
        answers: [
            { text: "SURAT", correct: false },
            { text: "JABALPUR", correct: false },
            { text: "AHMEDABAD", correct: false },
            { text: "GANDHINAGAR", correct: true },
        ]
    }
];

const questionelement = document.getElementById('questions');
const answerbuttons = document.getElementById('answers');
const nextbutton = document.getElementById('next-btn');
const resultContainer = document.getElementById('result-container');
const scoreText = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');

let CurrentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    CurrentQuestionIndex = 0;
    score = 0;
    nextbutton.innerHTML = "Next";
    nextbutton.style.display = "none";
    document.getElementById('quiz-container').classList.remove('hidden');
    resultContainer.classList.add('hidden');
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentquestion = questions[CurrentQuestionIndex];
    let questionnumber = CurrentQuestionIndex + 1;
    questionelement.innerHTML = questionnumber + ". " + currentquestion.question;

    currentquestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerbuttons.appendChild(button);
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState() {
    nextbutton.style.display = "none";
    while (answerbuttons.firstChild) {
        answerbuttons.removeChild(answerbuttons.firstChild);
    }
}

function selectAnswer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("incorrect");
    }

    Array.from(answerbuttons.children).forEach(button => {
        button.removeEventListener("click", selectAnswer);
    });

    nextbutton.style.display = "block";
}

nextbutton.addEventListener("click", () => {
    CurrentQuestionIndex++;
    if (CurrentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

function showResult() {
    document.getElementById('quiz-container').classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreText.innerHTML = `You scored ${score} out of ${questions.length}`;
}

restartBtn.addEventListener("click", startQuiz);
function showResult() {
    document.getElementById('quiz-container').classList.add('hidden');
    resultContainer.classList.remove('hidden');
    scoreText.innerHTML = `You scored ${score} out of ${questions.length}`;
    
    // Update the progress bar
    const progressBarFill = document.querySelector('.progress-bar-fill');
    const scorePercentage = (score / questions.length) * 100;
    progressBarFill.style.width = `${scorePercentage}%`;
}


startQuiz();
