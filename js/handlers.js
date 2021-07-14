function startQuiz() {
    timeIndicator.style.strokeDasharray =  `${circum} ${circum}`;

    timer = setInterval(() => {
        const time = quiz.getTime();
        displayTimeLeft(time);
        if(time < 1) submitQuiz();
    }, 1000);
    displayQuestion(quiz.getQuestion());
    quizContent.style.display = "block";
    show(next);
    hide(intro);
    hide(start);
    doAfter(1, () => {
        quizContainer.removeChild(intro);
        btns.replaceChild(submit, start);
        show(quizContent);
    });
}

function changeQuestion(btn) {
    btn = btn.target.innerHTML;
    const qNum = quiz.getQuestionNum();

    if(btn === "→") {
        if(qNum === 1) show(prev);
        else if(qNum >= quiz.totalQuestions - 1) {
            hide(next);
            show(submit);
        } quiz.nextQuestion();
    } else {
        if(qNum === 2) hide(prev);
        else if(qNum === quiz.totalQuestions) {
            hide(submit);
            show(next);
        } quiz.prevQuestion();
    }
    displayQuestion(quiz.getQuestion());
}

function chooseAnswer(btn) {
    const i = quiz.index;
    // Store user answer
    answers[i] = btn.dataset.option;
    // Show user his choice and progress
    const answered = answers.filter(answer => answer);
    const progress = answered.length / quiz.totalQuestions * 100;
    showChoice(i);
    quizProgressIndicator.style.width = progress+"%";
}

function submitQuiz() {
    clearInterval(timer);
    // Enable summary
    summary = true;
    // Disabled the options
    options.forEach(option => option.disabled = true);
    
    // Hide the quiz content
    hide(quizContent);
    hide(prev);
    hide(submit);
    // Change the display of summary
    quizSummary.style.display = "block";

    doAfter(1, () => {
        quizTitle.innerHTML = "Your Quiz Result";
        showCorrect();
        showResult();
        // Remove or replace the buttons
        btns.replaceChild(retake, prev);
        btns.replaceChild(correction, next);
        btns.removeChild(submit);
        // Change the display of quiz content
        quizContent.style.display = "none";
        // Show the summary, retate and correction
        show(quizSummary);
        show(retake);
        show(correction);
    });
}

function quizCorrection() {
    // Hide the quiz summary and correction button
    hide(quizSummary);
    hide(retake);
    hide(correction);
    // Change the display of quiz content
    quizContent.style.display = "block";

    doAfter(1, () => {
        quizTitle.innerHTML = "Your Quiz Result";

        btns.insertBefore(prev, retake);
        btns.appendChild(next)
        // Remove the correction button
        btns.removeChild(correction);
        // Change the display of quiz summary
        quizSummary.style.display = "none";
        // Show the summary and buttons
        show(quizContent);
        if(quiz.getQuestionNum() > 1) show(prev);
        show(retake);
        if(quiz.getQuestionNum() < quiz.totalQuestions) show(next);
    });
}