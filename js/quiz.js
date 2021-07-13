class Quiz {
    constructor(quizData) {
        this.title = quizData.title;
        this.timeAllowed = quizData.timeAllowed;
        this.timeLeft = this.timeAllowed;
        this.questions = quizData.questions.
            sort(() => Math.random() - 0.5);
        this.index = 0;
        this.totalQuestions = this.questions.length;
    }
    prevQuestion() {
        if(this.index > 0)
        this.index--;
    }
    nextQuestion() {
        if(this.index < this.totalQuestions - 1)
        this.index++;
    }
    getTime() {
        return this.timeLeft--;
    }
    getQuestionNum() {return this.index +1;}
    getQuestion() {
        return this.questions[this.index];
    }
}