document.getElementById('animateBtn').addEventListener('click', function() {
    const card = document.querySelector('.card');
    card.classList.add('animate');
    startConfetti();

    setTimeout(() => {
        showModal();
    }, 2000);
});

function showModal() {
    const modal = document.getElementById('modal');
    const closeModal = document.querySelector('.close');
    modal.style.display = 'flex';

    closeModal.onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
}

function startConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const confettiColors = ['#ff0', '#0f0', '#f00', '#00f', '#f0f', '#0ff'];
    const confetti = [];

    function Confetto() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height - canvas.height;
        this.size = Math.random() * 10 + 5;
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.speed = Math.random() * 3 + 2;
        this.angle = Math.random() * 360;
        this.spin = Math.random() * 10 - 5;
    }

    Confetto.prototype.update = function() {
        this.y += this.speed;
        this.angle += this.spin;
        if (this.y > canvas.height) {
            this.y = -this.size;
            this.x = Math.random() * canvas.width;
        }
    };

    Confetto.prototype.draw = function() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.size, this.size / 2, this.angle, 0, 2 * Math.PI);
        ctx.fill();
    };

    function addConfetti() {
        for (let i = 0; i < 300; i++) {
            confetti.push(new Confetto());
        }
    }

    function animateConfetti() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < confetti.length; i++) {
            confetti[i].update();
            confetti[i].draw();
        }
        requestAnimationFrame(animateConfetti);
    }

    addConfetti();
    animateConfetti();
}
