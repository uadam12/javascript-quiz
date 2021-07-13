const radius = timeIndicator.r.baseVal.value;
const circum = 2 * Math.PI * radius;

let answers = [], summary = false, quiz, timer;

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
function displayQuestion(questionData) {
    hide(quizContent);
    doAfter(1, () => {
        show(quizContent);
        question.innerHTML = questionData.question;
        displayOptions(questionData.options);
        showChoice(quiz.index);

        if(summary) showCorrect();
    });
    questionNumber.innerHTML = quiz.getQuestionNum();
}

// Display options 
function displayOptions(quesOption) {
    options.forEach(option => {
        const opt = option.dataset.option;
        option.innerHTML = quesOption[opt];
    });
}

function showChoice(i, correct) {
    const chosen = answers[i];
    const ans = summary? "wrong":"correct";
    options.forEach(option => {
        const opt = option.dataset.option;
        option.classList.remove("wrong");
        option.classList.remove("correct");
        if(chosen === opt) option.classList.add(ans);
        if(correct === opt) option.classList.add("correct");
    });
}
function showCorrect() {
    const question = quiz.getQuestion();
    const correctOpt = getEl(`.quiz-options > li > .btn[data-option='${question.correct}']`);
    
    correctOpt.classList.add("correct");
    explanation.innerHTML = question.explanation;
}
function showResult() {
    const correctAns = [];
    const wrongAns = [];
    const skips = [];

    for(i=0; i<quiz.totalQuestions; i++) {
        const userAns = answers[i];
        const correctAnswer = quiz.questions[i].correct;

        if(userAns === correctAnswer) correctAns.push(i+1);
        else if(!userAns) skips.push(i+1);
        else wrongAns.push(i+1);
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