// One source of truth for project destinations.
window.STUDIO_PROJECTS = {
  hub: { local: './index.html', production: 'https://studio-hub-nu.vercel.app' },
  'gitsis-real-estate': { local: '../gitsis-real-estate/index.html', production: 'https://gitsis-real-estate.vercel.app' },
  lidorprivatejets: { local: '../lidorprivatejets/dist/index.html', production: 'https://lidorprivatejets.vercel.app' },
  venizio: { local: '../venizio/site/index.html', production: 'https://site-gamma-nine-25.vercel.app' },
};

const projectDirectory = [
  { key: 'gitsis-real-estate', name: 'Gitsis Real Estate', type: 'Real estate', image: 'https://gitsis-real-estate.vercel.app/assets/web/hero.jpg' },
  { key: 'lidorprivatejets', name: 'Lidor Private Jets', type: 'Aviation', image: 'https://lidorprivatejets.vercel.app/images/hero-golden.jpg' },
  { key: 'venizio', name: 'Venizio', type: 'Hospitality', image: 'https://site-gamma-nine-25.vercel.app/assets/og-card.jpg' },
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
