document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: 'smooth'
            });
        }
    });
});

const titles = ['Web Developer', 'UI/UX Enthusiast', 'React Specialist'];
let typeIndex = 0, charIndex = 0, typing = true;
const typedTitle = document.querySelector('.typed-title');
function typeLoop() {
    if (!typedTitle) return;
    if (typing) {
        if (charIndex < titles[typeIndex].length) {
            charIndex++;
            typedTitle.textContent = titles[typeIndex].slice(0, charIndex);
            setTimeout(typeLoop, 90);
        } else {
            typing = false;
            setTimeout(typeLoop, 1200);
        }
    } else {
        if (charIndex > 0) {
            charIndex--;
            typedTitle.textContent = titles[typeIndex].slice(0, charIndex);
            setTimeout(typeLoop, 40);
        } else {
            typing = true;
            typeIndex = (typeIndex + 1) % titles.length;
            setTimeout(typeLoop, 400);
        }
    }
}
typeLoop();

const projectDetails = {
    1: {
        title: 'Pomodoro Timer',
        desc: 'A web app that helps you focus on your work with the Pomodoro technique.'
    },
    2: {
        title: 'Cinema landing page',
        desc: 'A landing page with sleek design for a cinema platform.'
    }
};
document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('click', function () {
        const id = this.getAttribute('data-project');
        const modal = document.getElementById('projectModal');
        const body = modal.querySelector('.modal-body');
        body.innerHTML = `<h3>${projectDetails[id].title}</h3><p>${projectDetails[id].desc}</p>`;
        modal.classList.add('open');
    });
});
document.querySelector('.close-modal').onclick = function () {
    document.getElementById('projectModal').classList.remove('open');
};
document.getElementById('projectModal').onclick = function (e) {
    if (e.target === this) this.classList.remove('open');
};

function animateProgressBars() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const val = bar.getAttribute('data-progress');
        bar.querySelector && (bar.querySelector('::after').style.width = val + '%');
        bar.style.setProperty('--progress', val + '%');
        bar.classList.add('animate');
        bar.style.position = 'relative';
        bar.innerHTML = `<div style='background:linear-gradient(90deg,#1e90ff 80%,#ccd6f6 100%);height:100%;width:0;border-radius:10px;transition:width 1.2s cubic-bezier(.4,0,.2,1);position:absolute;top:0;left:0;'></div>`;
        setTimeout(() => {
            bar.firstChild.style.width = val + '%';
        }, 300);
    });
}
let skillsAnimated = false;
window.addEventListener('scroll', function () {
    if (!skillsAnimated) {
        const skills = document.getElementById('skills');
        if (skills.getBoundingClientRect().top < window.innerHeight - 80) {
            animateProgressBars();
            skillsAnimated = true;
        }
    }
});

const fadeSections = document.querySelectorAll('.fade-in-section');
function checkFadeIn() {
    fadeSections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            sec.classList.add('visible');
        }
    });
}
window.addEventListener('scroll', checkFadeIn);
window.addEventListener('load', checkFadeIn);

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});
backToTop.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    const error = document.getElementById('formError');
    error.textContent = '';
    if (!name || !email || !message) {
        error.textContent = 'Please fill in all fields.';
        return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        error.textContent = 'Please enter a valid email.';
        return;
    }
    alert('Thank you for reaching out!');
    this.reset();
});

// Particle background
const canvas = document.getElementById('particles-bg');
if (canvas) {
    const ctx = canvas.getContext('2d');
    let w = window.innerWidth, h = 340;
    canvas.width = w; canvas.height = h;
    let particles = [];
    const count = Math.floor(w / 18);
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * w,
            y: Math.random() * h,
            vx: (Math.random() - 0.5) * 0.7,
            vy: (Math.random() - 0.5) * 0.7,
            r: 1.5 + Math.random() * 1.5
        });
    }
    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = '#1e90ffcc';
            ctx.shadowColor = '#1e90ff';
            ctx.shadowBlur = 8;
            ctx.fill();
            ctx.shadowBlur = 0;
            for (let j = i + 1; j < particles.length; j++) {
                let q = particles[j];
                let dx = p.x - q.x, dy = p.y - q.y, dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 80) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(q.x, q.y);
                    ctx.strokeStyle = '#1e90ff33';
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    function update() {
        for (let p of particles) {
            p.x += p.vx;
            p.y += p.vy;
            if (p.x < 0 || p.x > w) p.vx *= -1;
            if (p.y < 0 || p.y > h) p.vy *= -1;
        }
    }
    function loop() {
        update();
        draw();
        requestAnimationFrame(loop);
    }
    loop();
    window.addEventListener('resize', () => {
        w = window.innerWidth;
        canvas.width = w;
        particles = [];
        for (let i = 0; i < Math.floor(w / 18); i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                r: 1.5 + Math.random() * 1.5
            });
        }
    });
}
// 3D tilt effect for project cards
const projectCards = document.querySelectorAll('.project');
projectCards.forEach(card => {
    card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;
        card.style.setProperty('--tiltX', `${percentX * 10}deg`);
        card.style.setProperty('--tiltY', `${-percentY * 10}deg`);
        card.classList.add('tilt');
    });
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--tiltX', '0deg');
        card.style.setProperty('--tiltY', '0deg');
        card.classList.remove('tilt');
    });
}); 