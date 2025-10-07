const startBtn = document.getElementById('start-btn');
const usernameInput = document.getElementById('username');
const greeting = document.getElementById('greeting');
const questionText = document.getElementById('question-text');
const optionsContainer = document.getElementById('options');
const livesContainer = document.getElementById('lives');
const bgMusic = document.getElementById('bg-music');
const witchLaugh = document.getElementById('witch-laugh');
const ghostSound = document.getElementById('ghost-sound');

let currentQuestion = 0;
let lives = 3;
let username = '';

const questions = [
    { q: '¿Cuándo nos hicimos novios?', options: ['16/01/22', '16/01/23', '15/01/22'], answer: 0 },
    { q: '¿Cómo se llamaba el lugar donde nos conocimos?', options: ['Eterno', 'Xtasis', 'Xcso'], answer: 1 },
    { q: '¿En qué año nos conocimos?', options: ['2022', '2021', '2019'], answer: 1 },
    { q: '¿Qué vestida nos presentó?', options: ['Isaí', 'Lady Gaga', 'Alexis'], answer: 2 },
    { q: '¿Cuál fue la primera ciudad a la que fuimos de viaje?', options: ['Sayulita', 'Guanajuato', 'CDMX'], answer: 1 },
    { q: '¿Cuántos años cumplimos de novios en enero 2026?', options: ['4', '5', '3'], answer: 0 },
    { q: '¿Cuál era nuestra actividad principal cuando nos conocimos?', options: ['salir a correr', 'ir a comer pozole', 'salir a caminar'], answer: 2 },
    { q: '¿Quién le envió el primer mensaje al otro?', options: ['Andrés', 'Enrique'], answer: 0 },
    { q: '¿Cuál fue la primera playa que conocimos juntos?', options: ['PV', 'Playa del Carmen', 'Sayulita'], answer: 2 },
    { q: '¿Quién dijo primero te amo?', options: ['Andrés', 'Enrique'], answer: 0 }
];

startBtn.addEventListener('click', () => {
    username = usernameInput.value.trim() || 'Amigo';
    ghostSound.play();
    document.getElementById('start-screen').classList.remove('active');
    document.getElementById('question-screen').classList.add('active');
    greeting.innerHTML = `HELLO ${username} Monster!`;
    bgMusic.play();
    showQuestion();
});

function showQuestion() {
    if(currentQuestion >= questions.length) { return showResult(); }

    const q = questions[currentQuestion];
    questionText.textContent = q.q;
    optionsContainer.innerHTML = '';

    const classes = ['zombie','witch','vampire'];
    q.options.forEach((opt,i)=>{
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.classList.add('option-btn', classes[i%3]);
        btn.onclick = ()=>checkAnswer(i);
        optionsContainer.appendChild(btn);
    });
    renderLives();
}

function checkAnswer(selected){
    const correct = questions[currentQuestion].answer;
    if(selected===correct){ witchLaugh.play(); } 
    else { ghostSound.play(); lives--; if(lives<=0) return restartGame(); }
    currentQuestion++;
    showQuestion();
}

function renderLives(){
    livesContainer.innerHTML = '';
    for(let i=0;i<lives;i++){ livesContainer.innerHTML += '🧙‍♀️ '; }
}

function showResult(){
    document.getElementById('question-screen').classList.remove('active');
    document.getElementById('result-screen').classList.add('active');
    document.getElementById('result-message').innerHTML = '🧙‍♀️ PLAYA DEL CARMEN<br>del 17 al 24 de marzo del 2026<br>✈️ 🏨';
}

document.getElementById('restart-btn').addEventListener('click',restartGame);
function restartGame(){
    lives=3;
    currentQuestion=0;
    document.getElementById('result-screen').classList.remove('active');
    document.getElementById('start-screen').classList.add('active');
}
