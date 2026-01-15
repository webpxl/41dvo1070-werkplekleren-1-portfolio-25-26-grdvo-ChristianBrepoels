// -------------------- SMOOTH SCROLL MET OFFSET --------------------
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', e => {
        const targetID = link.getAttribute('href');
        if (!targetID.startsWith('#')) return;
        const target = document.querySelector(targetID);
        if (!target) return;

        e.preventDefault();

        const header = document.querySelector('#header');
        const headerOffset = header.offsetHeight;

        let elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
        let offsetPosition = elementPosition - headerOffset - 10;

        if (targetID === '#skills') {
            const targetHeight = target.offsetHeight;
            const viewportHeight = window.innerHeight;
            if (targetHeight > viewportHeight - 20) {
                offsetPosition = elementPosition - headerOffset;
            }
        }

        const maxScroll = document.body.scrollHeight - window.innerHeight;
        if (offsetPosition > maxScroll) offsetPosition = maxScroll;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        const nav = document.querySelector('nav ul');
        if (nav.classList.contains('active')) nav.classList.remove('active');
    });
});

// -------------------- FIX HASH BIJ PAGINA LAAD --------------------
window.addEventListener('load', () => {
    const hash = window.location.hash;
    if (hash) {
        const target = document.querySelector(hash);
        if (target) {
            const header = document.querySelector('#header');
            const headerOffset = header.offsetHeight;
            const elementPosition = target.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 10;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'auto' // direct, zonder animatie
            });
        }
    } else {
        // geen hash? dan standaard naar About Me sectie met zelfde offset
        const about = document.querySelector('#about-me');
        if (about) {
            const header = document.querySelector('#header');
            const headerOffset = header.offsetHeight;
            const elementPosition = about.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerOffset - 10;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'auto'
            });
        }
    }
});

// -------------------- FADE-IN ANIMATIONS --------------------
const faders = document.querySelectorAll('.fade-in');
const appearOptions = { threshold: 0.1, rootMargin: "0px 0px -50px 0px" };
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
    html: 60, css: 60, js: 50,
    figma: 85, illustrator: 75, photoshop: 75,
    canva: 90, blender: 40, lua: 55
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
    if (!progressAnimated) {
        const skillsSection = document.getElementById('skills');
        if (skillsSection.getBoundingClientRect().top < window.innerHeight - 50) {
            animateSkills();
        }
    }
    updateActiveNav();
});

// -------------------- MOBILE NAV TOGGLE --------------------
const nav = document.querySelector('nav ul');
const toggleBtn = document.querySelector('.nav-toggle');
if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
        nav.classList.toggle('active');
    });
}
document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !toggleBtn.contains(e.target) && nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
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

// -------------------- NAV HIGHLIGHT OP BASIS VAN SCROLL --------------------
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('nav ul li a');

function updateActiveNav() {
    const viewportMiddle = window.scrollY + window.innerHeight / 2;
    let currentSectionId = sections[0].id;

    sections.forEach(section => {
        if (viewportMiddle >= section.offsetTop && viewportMiddle < section.offsetTop + section.offsetHeight) {
            currentSectionId = section.id;
        }
    });

    navLinks.forEach(link => {
        if (link.getAttribute('href') === '#' + currentSectionId) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// init active nav
updateActiveNav();
















