const app = getEl(".quiz");
const quizContainer = getEl(".container");
const title = getEl("#title");
const quizTitle = getEl("#quiz-title");
const timeLeft = getEl("#time-left");
const quizProgressIndicator = getEl("#quiz-progress-indicator");
const timeIndicator = getEl("#time-indicator");
const questionNumber = getEl("#question-number");
const intro = getEl(".container > p.intro");
const quizContent = getEl(".quiz-content");
const quizSummary = getEl(".quiz-summary");
const question = getEl("#question");
const explanation = getEl("#explanation");
const options = getEls(".quiz-options > li > .btn");
const btns = getEl(".quiz-buttons");
const prev = getEl("#prev");
const start = getEl("#start");
const next = getEl("#next");
const correctly = getEls(".correctly");
const wrong = getEls(".wrongly");
const skip = getEls(".skip");

const retake = makeBtn("&#8635;");
const submit = makeBtn("Submit");
const correction = makeBtn("&#128064;");
const yourResult = mkel("h3", 0, "Your result summary");