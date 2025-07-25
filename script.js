// --- NAVIGATION SMOOTH SCROLL (unchanged)
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

// --- ENHANCED TYPEWRITER EFFECT ---
const titles = ['Web Developer', 'UI/UX Enthusiast', 'React Specialist'];
let typeIndex = 0, charIndex = 0, typing = true;
const typedTitle = document.querySelector('.typed-title');
let cursor;
if (typedTitle) {
    cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    cursor.textContent = '|';
    typedTitle.after(cursor);
}
function randomDelay(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function typeLoop() {
    if (!typedTitle) return;
    if (typing) {
        if (charIndex < titles[typeIndex].length) {
            charIndex++;
            typedTitle.textContent = titles[typeIndex].slice(0, charIndex);
            setTimeout(typeLoop, randomDelay(70, 130));
        } else {
            typing = false;
            setTimeout(typeLoop, randomDelay(900, 1400));
        }
    } else {
        if (charIndex > 0) {
            charIndex--;
            typedTitle.textContent = titles[typeIndex].slice(0, charIndex);
            setTimeout(typeLoop, randomDelay(30, 60));
        } else {
            typing = true;
            typeIndex = (typeIndex + 1) % titles.length;
            setTimeout(typeLoop, randomDelay(300, 600));
        }
    }
}
typeLoop();
// Blinking cursor
setInterval(() => {
    if (cursor) cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
}, 500);

// --- PROJECT MODAL WITH GALLERY & ANIMATION ---
const projectDetails = {
    1: {
        title: 'Pomodoro Timer',
        desc: 'A web app that helps you focus on your work with the Pomodoro technique.',
        images: ['./images/pomodoro1.png', './images/pomodoro2.png'],
        live: 'https://your-pomodoro-link.com',
        source: 'https://github.com/ValijonJumaboyev/pomodoro'
    },
    2: {
        title: 'Cinema landing page',
        desc: 'A landing page with sleek design for a cinema platform.',
        images: ['./images/cinema1.png', './images/cinema2.png'],
        live: '',
        source: 'https://github.com/your/cinema'
    }
};
let currentImgIdx = 0;
document.querySelectorAll('.project').forEach(card => {
    card.addEventListener('click', function () {
        const id = this.getAttribute('data-project');
        const modal = document.getElementById('projectModal');
        const body = modal.querySelector('.modal-body');
        const details = projectDetails[id];
        currentImgIdx = 0;
        let gallery = '';
        if (details.images && details.images.length) {
            gallery = `
                <div class="modal-gallery">
                    <button class="gallery-prev" aria-label="Previous image">&#8592;</button>
                    <img src="${details.images[0]}" alt="${details.title} screenshot" class="gallery-img"/>
                    <button class="gallery-next" aria-label="Next image">&#8594;</button>
                </div>
            `;
        }
        let actions = '';
        if (details.live) actions += `<a href="${details.live}" target="_blank" class="modal-action">View Live</a>`;
        if (details.source) actions += `<a href="${details.source}" target="_blank" class="modal-action">Source Code</a>`;
        body.innerHTML = `
            <h3>${details.title}</h3>
            <p>${details.desc}</p>
            ${gallery}
            <div class="modal-actions">${actions}</div>
        `;
        modal.classList.add('open');
        setTimeout(() => modal.classList.add('visible'), 10);
        // Gallery navigation
        const img = body.querySelector('.gallery-img');
        if (img) {
            body.querySelector('.gallery-prev').onclick = () => {
                currentImgIdx = (currentImgIdx - 1 + details.images.length) % details.images.length;
                img.src = details.images[currentImgIdx];
            };
            body.querySelector('.gallery-next').onclick = () => {
                currentImgIdx = (currentImgIdx + 1) % details.images.length;
                img.src = details.images[currentImgIdx];
            };
        }
        // Focus for accessibility
        modal.setAttribute('tabindex', '-1');
        modal.focus();
    });
});
document.querySelector('.close-modal').onclick = function () {
    const modal = document.getElementById('projectModal');
    modal.classList.remove('visible');
    setTimeout(() => modal.classList.remove('open'), 200);
};
document.getElementById('projectModal').onclick = function (e) {
    if (e.target === this) {
        this.classList.remove('visible');
        setTimeout(() => this.classList.remove('open'), 200);
    }
};
// Keyboard close for modal
window.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
        const modal = document.getElementById('projectModal');
        if (modal.classList.contains('open')) {
            modal.classList.remove('visible');
            setTimeout(() => modal.classList.remove('open'), 200);
        }
    }
});

// --- ANIMATED PROGRESS BARS WITH NUMBERS & TOOLTIPS ---
function animateProgressBars() {
    document.querySelectorAll('.progress-bar').forEach(bar => {
        const val = +bar.getAttribute('data-progress');
        bar.innerHTML = `<div class='progress-inner'></div><span class='progress-num'>0%</span>`;
        bar.style.setProperty('--progress', val + '%');
        bar.classList.add('animate');
        bar.style.position = 'relative';
        const inner = bar.querySelector('.progress-inner');
        const num = bar.querySelector('.progress-num');
        inner.style.width = '0';
        setTimeout(() => {
            inner.style.width = val + '%';
            let count = 0;
            const step = () => {
                if (count < val) {
                    count++;
                    num.textContent = count + '%';
                    requestAnimationFrame(step);
                } else {
                    num.textContent = val + '%';
                }
            };
            step();
        }, 300);
        // Tooltip
        bar.title = `Skill level: ${val}%`;
    });
}
let skillsAnimated = false;
function debounce(fn, wait) {
    let t;
    return function (...args) {
        clearTimeout(t);
        t = setTimeout(() => fn.apply(this, args), wait);
    };
}
window.addEventListener('scroll', debounce(function () {
    if (!skillsAnimated) {
        const skills = document.getElementById('skills');
        if (skills && skills.getBoundingClientRect().top < window.innerHeight - 80) {
            animateProgressBars();
            skillsAnimated = true;
        }
    }
}, 50));

// --- PARALLAX & STAGGERED FADE-IN ---
const fadeSections = document.querySelectorAll('.fade-in-section');
function checkFadeIn() {
    fadeSections.forEach(sec => {
        const rect = sec.getBoundingClientRect();
        if (rect.top < window.innerHeight - 60) {
            sec.classList.add('visible');
            // Stagger children
            const children = sec.querySelectorAll('.fade-child');
            children.forEach((child, i) => {
                setTimeout(() => child.classList.add('visible'), i * 120);
            });
        }
    });
}
window.addEventListener('scroll', debounce(checkFadeIn, 30));
window.addEventListener('load', checkFadeIn);
// Parallax effect
window.addEventListener('scroll', debounce(() => {
    document.querySelectorAll('.parallax-bg').forEach(bg => {
        const y = window.scrollY * 0.3;
        bg.style.transform = `translateY(${y}px)`;
    });
}, 10));

// --- BACK TO TOP BUTTON (unchanged) ---
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', debounce(function () {
    if (window.scrollY > 300) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
}, 30));
backToTop.onclick = function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
};

// --- CONTACT FORM VALIDATION (unchanged) ---
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

// --- INTERACTIVE PARTICLE BACKGROUND ---
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
            r: 1.5 + Math.random() * 1.5,
            color: '#1e90ffcc'
        });
    }
    let mouse = { x: -1000, y: -1000 };
    canvas.addEventListener('mousemove', e => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    });
    canvas.addEventListener('mouseleave', () => {
        mouse.x = -1000; mouse.y = -1000;
    });
    canvas.addEventListener('click', e => {
        particles.forEach(p => {
            p.color = '#' + Math.floor(Math.random() * 16777215).toString(16) + 'cc';
        });
    });
    function draw() {
        ctx.clearRect(0, 0, w, h);
        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
            ctx.fillStyle = p.color;
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
            // Repel from mouse
            let dx = p.x - mouse.x, dy = p.y - mouse.y, dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 60) {
                let angle = Math.atan2(dy, dx);
                p.vx += Math.cos(angle) * 0.2;
                p.vy += Math.sin(angle) * 0.2;
            }
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.95; p.vy *= 0.95;
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
    window.addEventListener('resize', debounce(() => {
        w = window.innerWidth;
        canvas.width = w;
        particles = [];
        for (let i = 0; i < Math.floor(w / 18); i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                vx: (Math.random() - 0.5) * 0.7,
                vy: (Math.random() - 0.5) * 0.7,
                r: 1.5 + Math.random() * 1.5,
                color: '#1e90ffcc'
            });
        }
    }, 100));
}

// --- 3D TILT WITH GLARE ---
const projectCards = document.querySelectorAll('.project');
projectCards.forEach(card => {
    let glare = document.createElement('div');
    glare.className = 'tilt-glare';
    card.appendChild(glare);
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
        // Glare
        const glareX = percentX * 50 + 50;
        const glareY = percentY * 50 + 50;
        glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35), transparent 60%)`;
    });
    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--tiltX', '0deg');
        card.style.setProperty('--tiltY', '0deg');
        card.classList.remove('tilt');
        card.querySelector('.tilt-glare').style.background = 'none';
    });
}); 