// ─── NAVBAR ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
    const navbar   = document.getElementById('navbar');
    const toggle   = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    // Scroll: adiciona classe .scrolled
    window.addEventListener('scroll', () => {
        navbar?.classList.toggle('scrolled', window.scrollY > 10);
        highlightActiveSection();
    });

    // Mobile menu toggle
    toggle?.addEventListener('click', () => {
        navLinks?.classList.toggle('open');
    });

    // Fecha menu ao clicar em link
    navLinks?.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
});

function highlightActiveSection() {
    const sections = ['inicio','acesso','tarja','medicamentos','legislacao','varejo','atencao','noticias','sobre'];
    let current = '';
    sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 90) current = id;
    });
    document.querySelectorAll('.nav-links a').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
}
