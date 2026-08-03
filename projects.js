// One source of truth for project destinations.
window.STUDIO_PROJECTS = {
  hub: { local: './index.html', production: 'https://studio-hub-nu.vercel.app' },
  'gitsis-real-estate': { local: '../gitsis-real-estate/index.html', production: 'https://gitsis-real-estate-lidor-levins-projects.vercel.app' },
  lidorprivatejets: { local: '../lidorprivatejets/dist/index.html', production: 'https://lidorprivatejets-lidor-levins-projects.vercel.app' },
  venizio: { local: '../venizio/site/index.html', production: 'https://site-lidor-levins-projects.vercel.app' },
};

const projectDirectory = [
  { key: 'gitsis-real-estate', name: 'Gitsis Real Estate', type: 'Real estate', image: 'https://gitsis-real-estate-lidor-levins-projects.vercel.app/assets/web/hero.jpg' },
  { key: 'lidorprivatejets', name: 'Lidor Private Jets', type: 'Aviation', image: 'https://lidorprivatejets-lidor-levins-projects.vercel.app/images/hero-golden.jpg' },
  { key: 'venizio', name: 'Venizio', type: 'Hospitality', image: 'https://site-lidor-levins-projects.vercel.app/assets/og-card.jpg' },
];

const menu = document.querySelector('.projects-menu');
const toggle = document.querySelector('.projects-toggle');
const closeButton = document.querySelector('.projects-menu__close');
const directory = document.querySelector('.projects-menu__links');

directory.innerHTML = projectDirectory.map(({ key, name, type, image }, index) => {
  const url = window.STUDIO_PROJECTS[key].production;
  return `<a href="${url}" style="--preview: url('${image}')"><span>${String(index + 1).padStart(2, '0')} / ${type}</span>${name}<span aria-hidden="true">↗</span></a>`;
}).join('');

function setMenu(open) {
  menu.classList.toggle('is-open', open);
  menu.setAttribute('aria-hidden', String(!open));
  toggle.setAttribute('aria-expanded', String(open));
  document.body.classList.toggle('menu-open', open);
  if (open) closeButton.focus();
}

toggle.addEventListener('click', () => setMenu(!menu.classList.contains('is-open')));
closeButton.addEventListener('click', () => setMenu(false));
document.addEventListener('keydown', (event) => { if (event.key === 'Escape') setMenu(false); });

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const projectLinks = [...document.querySelectorAll('.project-link')];

if (!reduceMotion) {
  const visibleLinks = new Set(projectLinks);
  const updateDepth = () => {
    const viewportCenter = window.innerHeight / 2;
    visibleLinks.forEach((link) => {
      const bounds = link.getBoundingClientRect();
      const offset = Math.max(-1, Math.min(1, (bounds.top + bounds.height / 2 - viewportCenter) / window.innerHeight));
      link.style.setProperty('--image-parallax', `${Math.round(offset * -24)}px`);
    });
  };

  let animationFrame;
  window.addEventListener('scroll', () => {
    cancelAnimationFrame(animationFrame);
    animationFrame = requestAnimationFrame(updateDepth);
  }, { passive: true });
  if ('IntersectionObserver' in window) {
    const visibilityObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => {
        if (isIntersecting) visibleLinks.add(target);
        else visibleLinks.delete(target);
      });
      updateDepth();
    }, { rootMargin: '180px 0px' });
    projectLinks.forEach((link) => visibilityObserver.observe(link));
  }
  updateDepth();

  if (window.matchMedia('(pointer: fine)').matches) {
    projectLinks.forEach((link) => {
      link.addEventListener('pointermove', (event) => {
        const bounds = link.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        link.style.setProperty('--tilt-x', `${(-y * 3).toFixed(2)}deg`);
        link.style.setProperty('--tilt-y', `${(x * 3).toFixed(2)}deg`);
      });
      link.addEventListener('pointerleave', () => {
        link.style.setProperty('--tilt-x', '0deg');
        link.style.setProperty('--tilt-y', '0deg');
      });
    });
  }
}
