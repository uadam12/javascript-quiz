class Quiz {
    constructor(quizData) {
        this.title = quizData.title;
        this.timeAllowed = quizData.timeAllowed;
        this.timeLeft = this.timeAllowed;
        this.questions = quizData.questions.
            sort(() => Math.random() - 0.5);
        this.answers = [];
        this.index = 0;
        this.start = false;
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
    setAnswer(answer) {
        this.answers[this.index] = answer;
    }
    getAnswer() {
        return this.answers[this.index];
    }
    getCorrect() {
        return this.questions[this.index].correct;
    }
}