/* ===== PORTFOLIO JAVASCRIPT =====
   Subeek — UI/UX Designer Portfolio
   ================================== */

/* ---------- Theme Toggle ---------- */
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const saved = localStorage.getItem('subeek-theme') || 'dark';
html.setAttribute('data-theme', saved);

themeToggle && themeToggle.addEventListener('click', () => {
  const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('subeek-theme', next);
});

/* ---------- Navbar Scroll ---------- */
const navbar = document.getElementById('navbar');
let lastScroll = 0;
window.addEventListener('scroll', () => {
  const y = window.scrollY;
  if (navbar) {
    navbar.classList.toggle('scrolled', y > 50);
  }
  lastScroll = y;
}, { passive: true });

/* ---------- Hamburger Menu ---------- */
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger && hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});
document.querySelectorAll('.mobile-link').forEach(l => {
  l.addEventListener('click', () => mobileMenu && mobileMenu.classList.remove('open'));
});

/* ---------- Typewriter Effect ---------- */
const roles = [
  'AI-Powered UI/UX Designer',
  'Agentic UX Specialist',
  'Visual Brand Identity Expert',
  'Logo & Poster Designer',
  'Interface Architect',
];
const tw = document.getElementById('typewriter');
if (tw) {
  let ri = 0, ci = 0, del = false;
  function type() {
    const word = roles[ri];
    tw.textContent = del ? word.slice(0, ci - 1) : word.slice(0, ci + 1);
    del ? ci-- : ci++;
    let speed = del ? 55 : 95;
    if (!del && ci === word.length)   { speed = 2200; del = true; }
    if (del  && ci === 0)             { del = false; ri = (ri + 1) % roles.length; speed = 380; }
    setTimeout(type, speed);
  }
  type();
}

/* ---------- Scroll Reveal ---------- */
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      revealObs.unobserve(e.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
revealEls.forEach(el => revealObs.observe(el));

/* ---------- Smooth Scroll ---------- */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
  });
});

/* ---------- Active Nav Link ---------- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let cur = '';
  sections.forEach(s => {
    if (window.scrollY >= s.offsetTop - 120) cur = s.id;
  });
  navLinks.forEach(l => {
    l.classList.toggle('active', l.getAttribute('href') === `#${cur}`);
  });
}, { passive: true });

/* ---------- Contact Form ---------- */
const form = document.getElementById('contactForm');
const successMsg = document.getElementById('formSuccess');
const btnText = document.getElementById('btnText');
const btnIcon = document.getElementById('btnIcon');
const submitBtn = document.getElementById('submitBtn');

form && form.addEventListener('submit', e => {
  e.preventDefault();
  submitBtn.disabled = true;
  btnText.textContent = 'Sending…';
  btnIcon && (btnIcon.style.animation = 'spin .6s linear infinite');

  setTimeout(() => {
    submitBtn.disabled = false;
    btnText.textContent = 'Send Message';
    btnIcon && (btnIcon.style.animation = '');
    successMsg && successMsg.classList.add('show');
    form.reset();
    setTimeout(() => successMsg && successMsg.classList.remove('show'), 4500);
  }, 1600);
});

/* ---------- Particles (Hero) ---------- */
const particleContainer = document.getElementById('particles');
if (particleContainer) {
  const count = 28;
  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    const size = Math.random() * 2.5 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = Math.random() * 12 + 6;
    const delay = Math.random() * -10;
    const isV = Math.random() > 0.5;
    p.style.cssText = `
      position:absolute;
      width:${size}px;height:${size}px;border-radius:50%;
      left:${x}%;top:${y}%;
      background:${isV ? 'rgba(124,58,237,.6)' : 'rgba(0,212,255,.5)'};
      box-shadow:0 0 ${size * 3}px ${isV ? 'rgba(124,58,237,.4)' : 'rgba(0,212,255,.3)'};
      animation:particle-drift ${dur}s ${delay}s ease-in-out infinite alternate;
      pointer-events:none;
    `;
    particleContainer.appendChild(p);
  }

  const style = document.createElement('style');
  style.textContent = `
    @keyframes particle-drift {
      0%   { transform: translate(0,0) scale(1); opacity:.4; }
      50%  { transform: translate(${Math.random()*30-15}px,${Math.random()*30-15}px) scale(1.4); opacity:.8; }
      100% { transform: translate(${Math.random()*20-10}px,${Math.random()*20-10}px) scale(.8); opacity:.3; }
    }
  `;
  document.head.appendChild(style);
}

/* ---------- Card Hover Tilt ---------- */
document.querySelectorAll('.pcard').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    card.style.transform = `translateY(-10px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---------- Resume Download Alert ---------- */
const resumeBtn = document.getElementById('resumeBtn');
resumeBtn && resumeBtn.addEventListener('click', e => {
  e.preventDefault();
  alert('Resume PDF will be available soon! Contact me at subeeks2007@gmail.com');
});
