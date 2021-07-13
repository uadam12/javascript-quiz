const getEl = el => document.querySelector(el);
const getEls = els => Array.from(document.querySelectorAll(els));

function makeBtn(label) {
    const btn = document.createElement("button");
    btn.classList.add("btn");
    btn.innerHTML = label;

    return btn;
}

function doAfter(s, func) {
    const timeout = setTimeout(() => {
        func();
        clearTimeout(timeout);
    }, s * 1000);
}
function formatTime(seconds) {
    const minutes = formatDigit(Math.floor(seconds / 60));
    seconds = formatDigit(seconds%60);

    return minutes+":"+seconds;
}
function formatDigit(num) {
    if(num < 10) num = "0"+num.toString();
    return num;
}

function getQuizData(func) {
    const http = new XMLHttpRequest();

    http.onreadystatechange = () => {
        if(http.readyState === 4) {
            if(http.status === 200) func(http.responseText);
            else alert("not found");
        }
    }
    http.open("GET", "js-interview-questions.json");
    http.send();
}

function show(btn) {btn.classList.add("show");}
function hide(btn) {btn.classList.remove("show");}