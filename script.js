const $comment = document.getElementById('comment');
const $overall = document.getElementById("overall");
const $start = document.getElementById('start');

let [seconds, minutes, hours] = [0,0,0];
let displayTime = document.getElementById("displayTime");
let totalTime = document.getElementById("totalTime");
let timer = null;

function stopwatch() {
    seconds++;
    if(seconds == 60) {
        seconds = 0;
        minutes ++;
    }
    let m = minutes < 10 ?  + minutes : minutes;
    let s = seconds < 10 ? "0" + seconds : seconds;
    displayTime.innerHTML = m + ":" + s;
    totalTime.innerHTML = m + "分" + s + "秒";
}

function watchStart() {
    if(timer!== null) {
        clearInterval(timer);
    }
    timer = setInterval(stopwatch,1000);
}

let score = 0;
let num_q = 0;
let current_per = 0;

function play() {
    document.answer.guess.focus();
    document.getElementById("score").innerHTML = score;
    document.getElementById("num_q").innerHTML = num_q;
    document.getElementById("current_per").innerHTML = current_per;
    game();
    watchStart();
    $start.style.display = 'none';
    $overall.style.display = 'block';
}

function game () {
    document.getElementById("left").value = Math.floor(Math.random() * 6) + 3;
    document.getElementById("right").value = Math.floor(Math.random() * 6) + 3;
    document.getElementById("guess").value = "";
}
function judge() {
    if(window.event.keyCode == 13) {
        a = Number(document.getElementById("left").value);
        b = Number(document.getElementById("right").value);
        c = Number(document.getElementById("guess").value);
        
        if(a*b == c) {
            $comment.textContent = "正解！";
            $comment.style.color = "blue";
            score +=1;
            num_q +=1;
            current_per = score/num_q*100;
            displayPercent = current_per.toFixed(0);
        } else {
            $comment.textContent = a + "x" + b + "=" + a*b + "だよ！";
            $comment.style.color = "red";
            num_q +=1;
            current_per = score/num_q*100;
            displayPercent = current_per.toFixed(0);
            console.log(a + "x" + b + "=" + a*b);
            add();
        }
        current_per = displayPercent;
        if (num_q == 30) {
            clearInterval(timer);
            finish ();
            }
        play();
    }
}

const ul = document.getElementById("ul");

function add() {
    const li = document.createElement("li");
    li.innerText = a + "x" + b + "=" + a*b;
    li.classList.add("incorrect-list");
    ul.appendChild(li);
}

function finish () {
    document.getElementById('hero').style.display = 'none';
    document.getElementById('mask').style.display = 'block';
    document.getElementById('result').textContent = (num_q + '問中' + score + '点');
    document.getElementById('total_per').textContent = ('正答率' + displayPercent + '%');
    if (current_per >= 90) {
        document.getElementById('assess').textContent = ('よくできたね！');
    } else if (90 > current_per >= 70) {
        document.getElementById('assess').textContent = ('もうすこしだね！');
    } else {
        document.getElementById('assess').textContent = ('がんばってね！');
    }
    totalTime.innerHTML = m + "分" + s + "秒";
}