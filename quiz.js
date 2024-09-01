const questions = [{
    question: "Which is the largest desert in the world ",
    answers:[{text:"Kalahari", correct:false},
        {text:"Gobi", correct:false},
        {text:"Sahara", correct:true},
        {text:"Antarctica", correct:false}]
}];

const questionElement = document.getElementById("ques");
const answerButton = document.getElementById("ans");
const nextButton = document.getElementById("next-btn");

let currentQuesIdx = 0;
let score = 0;

function startQuiz(){
    currentQuesIdx = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
};

function showQuestion(){
    resetState();
    let currentQues = questions[currentQuesIdx];
    let questionNo = currentQuesIdx + 1;
    questionElement.innerHTML = questionNo + ". " + currentQues.question;

    currentQues.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
};

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuesIdx++;
    if(currentQuesIdx < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play again";
    nextButton.style.display = "block";
}


nextButton.addEventListener("click", () => {
    if(currentQuesIdx < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});

startQuiz();