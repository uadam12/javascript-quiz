function startQuiz() {
    quiz.start = true;
    timeIndicator.style.strokeDasharray =  `${circum} ${circum}`;

    timer = setInterval(() => {
        const time = quiz.getTime();
        displayTimeLeft(time);
        if(time < 1) submitQuiz();
    }, 1000);
    displayQuestion();
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
    const firstQuestion = qNum === 1;
    const lastQuestion = qNum === quiz.totalQuestions;

    if(btn === "→") {
        if(lastQuestion) return;
        else if(firstQuestion) show(prev);
        else if(qNum >= quiz.totalQuestions - 1) {
            hide(next);
            show(submit);
        } quiz.nextQuestion();
    } else if(btn === "←") {
        if(firstQuestion) return;
        else  if(qNum === 2) hide(prev);
        else if(lastQuestion) {
            hide(submit);
            show(next);
        } quiz.prevQuestion();
    }
    displayQuestion();
}

function chooseAnswer(btn) {
    const i = quiz.index;
    // Store user answer
    quiz.setAnswer(btn.dataset.option);
    // Show user his choice and progress
    const answered = quiz.answers.filter(answer => answer);
    const progress = answered.length / quiz.totalQuestions * 100;

    options.forEach(option => {
        option.classList.remove("correct");
    });
    btn.classList.add("correct");
    
    quizProgressIndicator.style.width = progress+"%";
}

function submitQuiz() {
    clearInterval(timer);
    // Enable summary
    summary = true;
    quiz.start = false;
    // Disabled the options
    options.forEach(option => option.disabled = true);
    
    // Hide the quiz content
    hide(quizContent);
    hide(prev);
    hide(submit);
    // Change the display of summary
    quizSummary.style.display = "block";

    doAfter(1, () => {
        app.replaceChild(yourResult, quizTitle);
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
    quiz.start = true;
    // Hide the quiz summary and correction button
    hide(quizSummary);
    hide(retake);
    hide(correction);
    // Change the display of quiz content
    quizContent.style.display = "block";
    userAnswer.style.display = "block";

    doAfter(1, () => {
        app.replaceChild(quizTitle, yourResult);
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

function keyHandler(e) {
    if(!quiz.start) return;

    switch(e.code) {
        case "ArrowLeft":
        case "KeyP":
            prev.click();    
        break;
        case "ArrowRight":
        case "KeyN":
            next.click();    
        break;
        case "KeyA":
            getOpt("A").click();    
        break;
        case "KeyB":
            getOpt("B").click();
        break;
        case "KeyC":
            getOpt("C").click();
        break;
        case "KeyD":
            getOpt("D").click();    
        break;
        case "KeyS":
            const sure = confirm("Are you sure you want to submit?");
            
            if(sure) submit.click();
        break;
    }
}