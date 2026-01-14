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

// -------------------- SKILLS PROGRESS --------------------
const progressBars = document.querySelectorAll('.progress');
let progressAnimated = false;

const skillPercentages = {
    html: 60,
    css: 60,
    js: 50,
    figma: 85,
    illustrator: 75,
    photoshop: 75,
    canva: 90,
    blender: 40,
    lua: 55
};

function animateSkills() {
    progressBars.forEach(bar => {
        for (const skill in skillPercentages) {
            if (bar.classList.contains(skill)) {
                bar.style.width = skillPercentages[skill] + '%';
            }
        }
    });
    progressAnimated = true;
}

window.addEventListener('scroll', () => {
    if (progressAnimated) return;
    const skillsSection = document.getElementById('skills');
    if (!skillsSection) return;

    const pos = skillsSection.getBoundingClientRect().top;
    if (pos < window.innerHeight - 50) {
        animateSkills();
    }
});

// -------------------- MOBILE NAV TOGGLE --------------------
const nav = document.querySelector('nav ul');
const toggleBtn = document.querySelector('.nav-toggle');

toggleBtn.addEventListener('click', () => {
    nav.classList.toggle('active');
});

// -------------------- ABOUT PHOTO FADE-IN + ZOOM --------------------
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










