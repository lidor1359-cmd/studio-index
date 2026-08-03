const projects = [
  ['hub', 'Studio Index', 'https://studio-hub-nu.vercel.app'],
  ['gitsis', 'Gitsis Real Estate', 'https://gitsis-real-estate.vercel.app'],
  ['jets', 'Lidor Private Jets', 'https://lidorprivatejets.vercel.app'],
  ['venizio', 'Venizio', 'https://site-gamma-nine-25.vercel.app'],
];

class ProjectMenu extends HTMLElement {
  connectedCallback() {
    if (this.shadowRoot) return;
    const current = this.getAttribute('current');
    const links = projects.map(([id, name, url], index) => `
      <a href="${url}" ${id === current ? 'aria-current="page"' : ''}>
        <span>${String(index + 1).padStart(2, '0')}</span>${name}<b aria-hidden="true">↗</b>
      </a>`).join('');

    const root = this.attachShadow({ mode: 'open' });
    root.innerHTML = `<style>
      :host { position: fixed; z-index: 1000; top: 22px; right: 24px; font-family: Arial, sans-serif; }
      button { display: flex; gap: 12px; align-items: center; padding: 10px 12px; color: #f5f3ec; border: 1px solid rgba(245,243,236,.45); border-radius: 999px; background: rgba(10,12,12,.3); backdrop-filter: blur(12px); font: 600 11px/1 Arial, sans-serif; letter-spacing: .08em; text-transform: uppercase; cursor: pointer; }
      button i { font-size: 17px; font-style: normal; font-weight: 400; line-height: .5; } .panel { position: fixed; inset: 0; display: grid; place-items: center; padding: 28px; color: #f5f3ec; background: rgba(9,10,10,.97); opacity: 0; pointer-events: none; transition: opacity .25s ease; } .panel.open { opacity: 1; pointer-events: auto; }
      .top { position: absolute; top: 26px; right: 28px; left: 28px; display: flex; justify-content: space-between; color: #9b9d98; font: 600 10px/1 Arial, sans-serif; letter-spacing: .1em; } .close { border: 0; background: none; color: inherit; backdrop-filter: none; }
      nav { width: min(800px, 100%); } a { display: flex; align-items: center; gap: 20px; padding: 16px 0; color: inherit; border-bottom: 1px solid rgba(245,243,236,.24); text-decoration: none; font-size: clamp(30px, 6vw, 68px); letter-spacing: -.055em; } a:first-child { border-top: 1px solid rgba(245,243,236,.24); } a span { width: 35px; color: #9b9d98; font: 600 10px Arial, sans-serif; letter-spacing: .08em; } a b { margin-left: auto; font-size: 22px; font-weight: 400; } a[aria-current="page"] { color: #9b9d98; pointer-events: none; } @media (max-width: 600px) { :host { top: 16px; right: 16px; } .panel { padding: 20px; } .top { top: 21px; right: 20px; left: 20px; } }
    </style><button type="button" aria-expanded="false">Projects <i>+</i></button><section class="panel" aria-hidden="true"><div class="top"><span>ALL PROJECTS</span><button class="close" type="button">Close <i>×</i></button></div><nav>${links}</nav></section>`;
    const button = root.querySelector('button');
    const panel = root.querySelector('.panel');
    const close = root.querySelector('.close');
    const setOpen = (open) => { panel.classList.toggle('open', open); panel.setAttribute('aria-hidden', String(!open)); button.setAttribute('aria-expanded', String(open)); };
    button.addEventListener('click', () => setOpen(true));
    close.addEventListener('click', () => setOpen(false));
    root.addEventListener('keydown', (event) => { if (event.key === 'Escape') setOpen(false); });
  }
}
customElements.define('project-menu', ProjectMenu);
