// -------------------- SMOOTH SCROLL --------------------
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
        const targetID = link.getAttribute('href');
        if (!targetID.startsWith('#')) return;
        const target = document.querySelector(targetID);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});

// -------------------- FADE-IN ANIMATIONS --------------------
const faders = document.querySelectorAll('.fade-in');

const appearOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
    });
}, appearOptions);

faders.forEach(fader => appearOnScroll.observe(fader));

// -------------------- PROGRESS BARS --------------------
const progressBars = document.querySelectorAll('.progress');
let progressAnimated = false;

window.addEventListener('scroll', () => {
    if (progressAnimated) return;
    const speciale = document.getElementById('speciale');
    if (!speciale) return;

    const pos = speciale.getBoundingClientRect().top;
    if (pos < window.innerHeight - 50) {
        progressBars.forEach(bar => {
            if (bar.classList.contains('html')) bar.style.width = '90%';
            if (bar.classList.contains('css')) bar.style.width = '80%';
            if (bar.classList.contains('js')) bar.style.width = '70%';
        });
        progressAnimated = true;
    }
});

// -------------------- MOBILE NAV TOGGLE --------------------
const nav = document.querySelector('nav ul');
const toggleBtn = document.createElement('button');
toggleBtn.textContent = "☰";
toggleBtn.classList.add('nav-toggle');
document.querySelector('nav').prepend(toggleBtn);

toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// -------------------- ABOUT SECTION PHOTO FADE-IN + ZOOM --------------------
const aboutImg = document.querySelector('.about-col-1 img');

window.addEventListener('load', () => {
    if (!aboutImg) return;

    aboutImg.style.opacity = 0;
    aboutImg.style.transform = 'scale(0.9)';

    setTimeout(() => {
        aboutImg.style.transition = 'opacity 1s ease, transform 1s ease';
        aboutImg.style.opacity = 1;
        aboutImg.style.transform = 'scale(1)';
    }, 200);
});








