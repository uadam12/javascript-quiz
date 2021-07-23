const radius = timeIndicator.r.baseVal.value;
const circum = 2 * Math.PI * radius;

let summary = false, quiz, timer;

// Get the quiz data
getQuizData(quizData => {
    // Covert the quiz data to an object
    quizData = JSON.parse(quizData);
    // Create quiz object
    quiz = new Quiz(quizData);

    // Display quiz details
    title.innerHTML = quizData.title;
    intro.innerHTML = quizData.introduction;

    // Show the start buttons
    displayTimeLeft(quiz.timeLeft);
    show(start);
});

// Display question
function displayQuestion() {
    const questionData = quiz.getQuestion();

    hide(quizContent);
    doAfter(1, () => {
        show(quizContent);
        question.innerHTML = questionData.question;
        displayOptions(questionData.options);
    });
    questionNumber.innerHTML = quiz.getQuestionNum();
}

// Display options 
function displayOptions(quesOption) {
    options.forEach(option => {
        const opt = option.dataset.option;
        option.innerHTML = quesOption[opt];
        option.classList.remove("correct");
        option.classList.remove("skip-ques");
        option.classList.remove("wrong");
    });
    const chosen = quiz.getAnswer();

    if(summary) showCorrect();
    else if(chosen) getOpt(chosen).classList.add("correct");
}

function showCorrect() {
    const question = quiz.getQuestion();
    const correct = quiz.getCorrect();
    const chosen = quiz.getAnswer();
    const correctOpt = getOpt(correct);

    let ansStatus = "skip this question.";
    let color = "blue";

    
    if(chosen) {
        if(chosen === correct) {
            ansStatus = "answer this question correctly.";
            color = "green";
        } else {
            ansStatus = "answer this question wrongly.";
            color = "red";
            getOpt(chosen).classList.add("wrong");
        }
        correctOpt.classList.add("correct");
    } else correctOpt.classList.add("skip-ques");
    
    status.innerHTML = ansStatus;
    status.style.color = color;
    explanation.innerHTML = question.explanation;
}
function showResult() {
    const correctAns = [];
    const wrongAns = [];
    const skips = [];

    for(i=0; i<quiz.totalQuestions; i++) {
        const userAns = quiz.answers[i];
        const correctAnswer = quiz.questions[i].correct;
        const no = i+1;

        if(userAns === correctAnswer) correctAns.push(no);
        else if(!userAns) skips.push(no);
        else wrongAns.push(no);
    }

    correctly[0].innerHTML = correctAns.length;
    wrong[0].innerHTML = wrongAns.length;
    skip[0].innerHTML = skips.length;

    correctly[1].innerHTML = correctAns;
    wrong[1].innerHTML = wrongAns;
    skip[1].innerHTML = skips;
}

function displayTimeLeft(time) {
    const offset = circum - time / quiz.timeAllowed * circum;
    timeIndicator.style.strokeDashoffset = -offset;
    timeLeft.innerHTML = formatTime(time);
}

// Add Event handler
start.addEventListener("click", startQuiz);
prev.addEventListener("click", changeQuestion);
next.addEventListener("click", changeQuestion);
submit.addEventListener("click", submitQuiz);
retake.addEventListener("click", () => location.reload());
correction.addEventListener("click", quizCorrection);
document.addEventListener("keydown", keyHandler);