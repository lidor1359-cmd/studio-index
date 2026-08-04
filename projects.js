const projectDirectory = window.WEBFORGE_PROJECTS;
window.STUDIO_PROJECTS = Object.fromEntries([
  ['hub', { local: './index.html', production: 'https://webforge-index.vercel.app' }],
  ...projectDirectory.map((project) => [project.id, { production: project.url }]),
]);

const menu = document.querySelector('.projects-menu');
const toggle = document.querySelector('.projects-toggle');
const closeButton = document.querySelector('.projects-menu__close');
const directory = document.querySelector('.projects-menu__links');

directory.innerHTML = projectDirectory.map((project) => {
  return `<a href="${project.url}" style="--preview: url('${project.image}')"><span>${project.number} / ${project.category}</span>${project.name}<span aria-hidden="true">↗</span></a>`;
}).join('');

const projectSpace = document.querySelector('[data-project-space]');
const archiveIndex = document.querySelector('[data-archive-index]');
projectSpace.innerHTML = projectDirectory.map((project, index) => `<a class="spatial-project" data-spatial-project data-name="${project.name}" data-category="${project.category.toUpperCase()}" data-location="${project.location.toUpperCase()}" href="${project.url}"><img src="${project.image}" alt="${project.alt}" ${index === 0 ? 'fetchpriority="high"' : 'loading="lazy"'} /><span class="spatial-project__shade"></span><span class="spatial-project__label"><b>${project.number}</b> ${project.name.toUpperCase()} <i>↗</i></span></a>`).join('');
archiveIndex.innerHTML = projectDirectory.map((project, index) => `<button class="${index === 0 ? 'is-active' : ''}" type="button" data-archive-target="${index}"><span>${project.number}</span> ${project.name.split(' ').slice(-1)[0].toUpperCase()}</button>`).join('');

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

const spatialStage = document.querySelector('[data-archive-stage]');
const spatialProjects = [...document.querySelectorAll('[data-spatial-project]')];
const archiveButtons = [...document.querySelectorAll('[data-archive-target]')];
const archiveReadout = {
  count: document.querySelector('[data-archive-count]'),
  name: document.querySelector('[data-archive-name]'),
  category: document.querySelector('[data-archive-category]'),
  location: document.querySelector('[data-archive-location]'),
};
if (spatialStage && spatialProjects.length) {
  spatialStage.style.height = `${110 + (spatialProjects.length - 1) * 110}svh`;
  let activeProject = -1;
  const updateSpatialArchive = () => {
    const bounds = spatialStage.getBoundingClientRect();
    const range = Math.max(1, spatialStage.offsetHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -bounds.top / range));
    const position = progress * (spatialProjects.length - 1);
    const nextActive = Math.round(position);
    spatialProjects.forEach((project, index) => {
      const distance = index - position;
      const absoluteDistance = Math.abs(distance);
      project.style.setProperty('--space-x', `${(distance * 4).toFixed(2)}vw`);
      project.style.setProperty('--space-y', `${(distance * 92).toFixed(2)}vh`);
      project.style.setProperty('--space-z', `${Math.round(-absoluteDistance * 280)}px`);
      project.style.setProperty('--space-rotate-y', `${(-distance * .88).toFixed(2)}deg`);
      project.style.setProperty('--space-rotate-x', `${(distance * 7.36).toFixed(2)}deg`);
      project.style.setProperty('--space-scale', Math.max(.62, 1 - absoluteDistance * .18).toFixed(3));
      project.style.setProperty('--space-opacity', absoluteDistance > 1.5 ? '0' : Math.max(.26, 1 - absoluteDistance * .5).toFixed(2));
    });
    if (nextActive !== activeProject) {
      activeProject = nextActive;
      const project = spatialProjects[activeProject];
      spatialProjects.forEach((item, index) => {
        const isCurrent = index === activeProject;
        item.classList.toggle('is-current', isCurrent);
        item.setAttribute('aria-hidden', String(!isCurrent));
        item.tabIndex = isCurrent ? 0 : -1;
      });
      archiveButtons.forEach((button, index) => button.classList.toggle('is-active', index === activeProject));
      archiveReadout.count.textContent = `${String(activeProject + 1).padStart(2, '0')} / ${String(spatialProjects.length).padStart(2, '0')}`;
      archiveReadout.name.textContent = project.dataset.name;
      archiveReadout.category.textContent = project.dataset.category;
      archiveReadout.location.textContent = project.dataset.location;
    }
  };
  let archiveFrame;
  window.addEventListener('scroll', () => {
    cancelAnimationFrame(archiveFrame);
    archiveFrame = requestAnimationFrame(updateSpatialArchive);
  }, { passive: true });
  archiveButtons.forEach((button) => button.addEventListener('click', () => {
    const index = Number(button.dataset.archiveTarget);
    const top = spatialStage.offsetTop + (spatialStage.offsetHeight - window.innerHeight) * (index / (spatialProjects.length - 1));
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' });
  }));
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.matchMedia('(pointer: fine)').matches) {
    spatialStage.addEventListener('pointermove', (event) => {
      const bounds = spatialStage.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / window.innerHeight - .5;
      const project = spatialProjects[activeProject];
      if (!project) return;
      project.style.setProperty('--camera-x', `${(x * 2.2).toFixed(2)}deg`);
      project.style.setProperty('--camera-y', `${(-y * 1.5).toFixed(2)}deg`);
    });
    spatialStage.addEventListener('pointerleave', () => {
      const project = spatialProjects[activeProject];
      if (!project) return;
      project.style.setProperty('--camera-x', '0deg');
      project.style.setProperty('--camera-y', '0deg');
    });
  }
  updateSpatialArchive();
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
