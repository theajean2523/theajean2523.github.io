const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? '×' : '☰';
});
document.querySelectorAll('nav a').forEach(link => link.addEventListener('click', () => { nav.classList.remove('open'); menuButton.setAttribute('aria-expanded','false'); menuButton.textContent='☰'; }));
const sections = [...document.querySelectorAll('main section[id]')];
const links = [...document.querySelectorAll('nav a')];
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) entry.target.classList.add('visible');
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(item => observer.observe(item));
const sectionObserver = new IntersectionObserver(entries => entries.forEach(entry => {
  if (!entry.isIntersecting) return;
  links.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
}), { rootMargin: '-38% 0px -55% 0px' });
sections.forEach(section => sectionObserver.observe(section));

// Mini-tag popups: hover works on its own via CSS; this adds tap/click support for touch devices and keyboard.
document.querySelectorAll('.tag-item').forEach(item => {
  const trigger = item.querySelector('.tag-trigger');
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    const wasActive = item.classList.contains('active');
    document.querySelectorAll('.tag-item.active').forEach(other => { if (other !== item) other.classList.remove('active'); });
    item.classList.toggle('active', !wasActive);
  });
  trigger.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger.click(); }
  });
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.tag-item')) {
    document.querySelectorAll('.tag-item.active').forEach(item => item.classList.remove('active'));
  }
});
