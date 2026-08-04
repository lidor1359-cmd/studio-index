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

const archiveSlides = [...document.querySelectorAll('[data-archive-slide]')];
const archiveLinks = [...document.querySelectorAll('.archive-index a')];
if ('IntersectionObserver' in window && archiveSlides.length) {
  const archiveObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      archiveLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
    });
  }, { threshold: .62 });
  archiveSlides.forEach((slide) => archiveObserver.observe(slide));
}

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const projectLinks = [...document.querySelectorAll('.project-link')];

if (!reduceMotion) {
  const galleryTrack = document.querySelector('[data-drag-scroll]');
  if (galleryTrack && window.matchMedia('(pointer: fine)').matches) {
    let pointerStartX = 0;
    let scrollStart = 0;
    let dragged = false;
    let suppressClick = false;
    galleryTrack.addEventListener('pointerdown', (event) => {
      pointerStartX = event.clientX;
      scrollStart = galleryTrack.scrollLeft;
      dragged = false;
      galleryTrack.setPointerCapture(event.pointerId);
    });
    galleryTrack.addEventListener('pointermove', (event) => {
      if (!galleryTrack.hasPointerCapture(event.pointerId)) return;
      const distance = event.clientX - pointerStartX;
      if (Math.abs(distance) > 5) dragged = true;
      if (dragged) {
        galleryTrack.classList.add('is-dragging');
        galleryTrack.scrollLeft = scrollStart - distance;
      }
    });
    const stopDrag = (event) => {
      if (!galleryTrack.hasPointerCapture(event.pointerId)) return;
      galleryTrack.releasePointerCapture(event.pointerId);
      galleryTrack.classList.remove('is-dragging');
      suppressClick = dragged;
      window.setTimeout(() => { suppressClick = false; }, 0);
    };
    galleryTrack.addEventListener('pointerup', stopDrag);
    galleryTrack.addEventListener('pointercancel', stopDrag);
    galleryTrack.addEventListener('click', (event) => {
      if (suppressClick) event.preventDefault();
    }, true);
  }
  const intro = document.querySelector('.intro');
  const orb = document.querySelector('.intro-orb');
  if (intro && orb && window.matchMedia('(pointer: fine)').matches) {
    intro.addEventListener('pointermove', (event) => {
      const bounds = intro.getBoundingClientRect();
      orb.style.setProperty('--orb-x', `${Math.round(((event.clientX - bounds.left) / bounds.width - .5) * 34)}px`);
      orb.style.setProperty('--orb-y', `${Math.round(((event.clientY - bounds.top) / bounds.height - .5) * 24)}px`);
    });
    intro.addEventListener('pointerleave', () => {
      orb.style.setProperty('--orb-x', '0px');
      orb.style.setProperty('--orb-y', '0px');
    });
  }
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
