// Smooth scroll
const navLinks = document.querySelectorAll('nav ul li a');
navLinks.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();
        const targetID = link.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetID);
        if(targetSection){
            window.scrollTo({
                top: targetSection.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    });
});

// Progress bars animation
const progressBars = document.querySelectorAll('.progress');
window.addEventListener('scroll', () => {
    const speciale = document.getElementById('speciale');
    const specialePos = speciale.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (specialePos < windowHeight) {
        progressBars.forEach(bar => {
            if (bar.classList.contains('html')) bar.style.width = '90%';
            if (bar.classList.contains('css')) bar.style.width = '80%';
            if (bar.classList.contains('js')) bar.style.width = '70%';
        });
    }
});





