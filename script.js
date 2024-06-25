let mots = [
    "ordinateur", "programmation", "java", "algorithmes", "developpeur",
    "openai", "intelligence", "artificielle", "pendu", "girafe", "ordinateur",
    "montagne", "voiture", "maison", "chien", "chat", "python", "framboise",
    "banane", "pomme", "lune", "soleil"
];

let motSecret;
let motCache;
let vies;
let lettresEssayees;
let score = 0;

function choisirMotSecret() {
    motSecret = mots[Math.floor(Math.random() * mots.length)];
    motCache = Array(motSecret.length).fill('_');
    vies = 7;
    lettresEssayees = new Set();
}

function initialiserJeu() {
    choisirMotSecret();
    afficherMotCache();
    afficherVies();
    afficherPendu();
    document.getElementById('input-lettre').disabled = false;
    document.getElementById('btn-essayer').disabled = false;
    document.getElementById('message').textContent = '';
    document.getElementById('score').textContent = `Score : ${score}`;
}

function afficherMotCache() {
    document.getElementById('word-display').textContent = motCache.join(' ');
}

function afficherVies() {
    document.getElementById('hangman-display').textContent = `Vies restantes : ${vies}`;
}

function devinerLettre(lettre) {
    if (lettresEssayees.has(lettre)) {
        afficherMessage(`Vous avez déjà essayé la lettre ${lettre}.`);
        return;
    }

    lettresEssayees.add(lettre);
    let lettreTrouvee = false;

    for (let i = 0; i < motSecret.length; i++) {
        if (motSecret[i] === lettre) {
            motCache[i] = lettre;
            lettreTrouvee = true;
        }
    }

    if (!lettreTrouvee) {
        vies--;
        afficherVies();
    }

    afficherMotCache();
    afficherPendu();

    if (motCache.join('') === motSecret) {
        afficherMessage('Félicitations ! Vous avez deviné le mot.');
        score += vies; // Augmentez le score en fonction des vies restantes
        document.getElementById('score').textContent = `Score : ${score}`;
        desactiverEssai();
    } else if (vies === 0) {
        afficherMessage(`Dommage ! Le mot à deviner était : ${motSecret}`);
        desactiverEssai();
    }
}

function afficherMessage(message) {
    document.getElementById('message').textContent = message;
}

function desactiverEssai() {
    document.getElementById('input-lettre').disabled = true;
    document.getElementById('btn-essayer').disabled = true;
}

function afficherPendu() {
    let svg = document.getElementById('pendu-svg');
    svg.innerHTML = '';

    switch (vies) {
        case 0:
            drawLine(svg, 50, 150, 150, 150);
            drawLine(svg, 100, 150, 100, 20);
            drawLine(svg, 100, 20, 150, 20);
            drawLine(svg, 150, 20, 150, 50);
            drawCircle(svg, 150, 60, 10);
            drawLine(svg, 150, 70, 150, 100);
            drawLine(svg, 150, 80, 140, 90);
            drawLine(svg, 150, 80, 160, 90);
            drawLine(svg, 150, 100, 140, 120);
            drawLine(svg, 150, 100, 160, 120);
            break;
        case 1:
            drawLine(svg, 50, 150, 150, 150);
            drawLine(svg, 100, 150, 100, 20);
            drawLine(svg, 100, 20, 150, 20);
            drawLine(svg, 150, 20, 150, 50);
            drawCircle(svg, 150, 60, 10);
            drawLine(svg, 150, 70, 150, 100);
            drawLine(svg, 150, 80, 140, 90);
            drawLine(svg, 150, 80, 160, 90);
            drawLine(svg, 150, 100, 140, 120);
            break;
        case 2:
            drawLine(svg, 50, 150, 150, 150);
            drawLine(svg, 100, 150, 100, 20);
            drawLine(svg, 100, 20, 150, 20);
            drawLine(svg, 150, 20, 150, 50);
            drawCircle(svg, 150, 60, 10);
            drawLine(svg, 150, 70, 150, 100);
            drawLine(svg, 150, 80, 140, 90);
            drawLine(svg, 150, 80, 160, 90);
            break;
        case 3:
            drawLine(svg, 50, 150, 150, 150);
            drawLine(svg, 100, 150, 100, 20);
            drawLine(svg, 100, 20, 150, 20);
            drawLine(svg, 150, 20, 150, 50);
            drawCircle(svg, 150, 60, 10);
            drawLine(svg, 150, 70, 150, 100);
            break;
        case 4:
            drawLine(svg, 50, 150, 150, 150);
            drawLine(svg, 100, 150, 100, 20);
            drawLine(svg, 100, 20, 150, 20);
            drawLine(svg, 150, 20, 150, 50);
            drawCircle(svg, 150, 60, 10);
            break;
        case 5:
            drawLine(svg, 50, 150, 150, 150);
            drawLine(svg, 100, 150, 100, 20);
            drawLine(svg, 100, 20, 150, 20);
            drawLine(svg, 150, 20, 150, 50);
            break;
        case 6:
            drawLine(svg, 50, 150, 150, 150);
            drawLine(svg, 100, 150, 100, 20);
            drawLine(svg, 100, 20, 150, 20);
            break;
        case 7:
            drawLine(svg, 50, 150, 150, 150);
            drawLine(svg, 100, 150, 100, 20);
            break;
        default:
            drawLine(svg, 50, 150, 150, 150);
    }
}

function drawLine(svg, x1, y1, x2, y2) {
    let line = document.createElementNS("http://www.w3.org/2000/svg", "line");
    line.setAttribute("x1", x1);
    line.setAttribute("y1", y1);
    line.setAttribute("x2", x2);
    line.setAttribute("y2", y2);
    line.setAttribute("stroke", "black");
    svg.appendChild(line);
}

function drawCircle(svg, cx, cy, r) {
    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", cx);
    circle.setAttribute("cy", cy);
    circle.setAttribute("r", r);
    circle.setAttribute("stroke", "black");
    circle.setAttribute("fill", "none");
    svg.appendChild(circle);
}

document.getElementById('btn-essayer').addEventListener('click', function() {
    let inputLettre = document.getElementById('input-lettre');
    let lettre = inputLettre.value.toLowerCase();
    inputLettre.value = '';
    if (lettre) {
        devinerLettre(lettre);
    }
});

document.getElementById('btn-rejouer').addEventListener('click', function() {
    initialiserJeu();
});

document.getElementById('input-lettre').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        document.getElementById('btn-essayer').click();
    }
});

initialiserJeu();
