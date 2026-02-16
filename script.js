const player = document.getElementById("player");
const questionBox = document.getElementById("question-box");
const answersDiv = document.getElementById("answers");
let chosenAnswers = [];

let x = 330, y = 250;
player.style.left = x + "px";
player.style.top = y + "px";

const questions = [
    {
        q: "Will you play this game seriously?",
        options: ["Yes", "No"],
        correct: 0
    },
    {
        q: "Do you like animals?",
        options: ["Yes", "No"],
        correct: 0
    },
    {
        q: "Are you free this Saturday (February 21)?",
        options: ["Yes", "No"],
        correct: 0
    },
    {
        q: "Can I take you on a date to Cebu Safari?",
        options: ["Yes", "No"],
        correct: 0
    }
];

let currentQuestion = 0;

function loadQuestion() {
    const q = questions[currentQuestion];
    questionBox.innerText = q.q;
    answersDiv.innerHTML = "";

    let positions = [
        { top: 160, left: 60 },
        { top: 160, left: 380 },
        { top: 330, left: 60 },
        { top: 330, left: 380 }
    ];

    q.options.forEach((ans, i) => {
        const btn = document.createElement("div");
        btn.className = "answer";
        btn.style.top = positions[i].top + "px";
        btn.style.left = positions[i].left + "px";
        btn.innerText = ans;
        btn.dataset.id = i;
        answersDiv.appendChild(btn);
    });
}

function checkCollision() {
    const answers = document.querySelectorAll(".answer");
    answers.forEach(ans => {
        const rect = ans.getBoundingClientRect();
        const p = player.getBoundingClientRect();

        if (
            p.left < rect.right &&
            p.right > rect.left &&
            p.top < rect.bottom &&
            p.bottom > rect.top
        ) {
            let id = parseInt(ans.dataset.id);

            // Confirmation popup
            let decision = confirm("Are you sure you want to choose this answer?");
            if (!decision) return;

            // If No is picked
            if (id !== questions[currentQuestion].correct) {
                alert("You should pick Yes!");
                loadQuestion();
                return;
            }

            // Save chosen answer text
            chosenAnswers[currentQuestion] = ans.innerText;
            ans.classList.add("correct");

            setTimeout(() => {
                currentQuestion++;

                if (currentQuestion < questions.length) {
                    loadQuestion();
                    x = 330;
                    y = 250;
                    player.style.left = x + "px";
                    player.style.top = y + "px";
                } else {
                    showSummary();
                }
            }, 600);
        }
    });
}

function showSummary() {
    answersDiv.innerHTML = "";

    let summary = `
        💖 <b>I'll see you on Saturday (February 21)!</b> 💖 <br><br>
        I will pick you up — wear something nice for our Safari escapade! 🐯✨ <br>
        Just a little appreciation gift for you, and smol de-stressing date with you! 💗
    `;

    questionBox.innerHTML = summary;
    questionBox.style.fontSize = "20px";
    questionBox.style.lineHeight = "28px";
}



document.addEventListener("keydown", e => {
    const speed = 18;

    if (e.key === "ArrowUp") y -= speed;
    if (e.key === "ArrowDown") y += speed;
    if (e.key === "ArrowLeft") x -= speed;
    if (e.key === "ArrowRight") x += speed;

    // Keep inside arena
    x = Math.max(10, Math.min(650, x));
    y = Math.max(80, Math.min(460, y));

    player.style.left = x + "px";
    player.style.top = y + "px";

    checkCollision();
});

loadQuestion();
