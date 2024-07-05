import {
  CREATION_YEAR,
  DESCRIPTION,
  LOGO,
  SOCIALS
} from '../data/companyInformation.mjs';
import LINKS from '../data/links.mjs';

// Extend generic HTMLElement interface.
export class FooterInfo extends HTMLElement {
  // Constructor.
  constructor() {
    super();

    // Create template if needed.
    template || (template = createTemplate());

    // Attach shadow DOM to element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(template.cloneNode(true));
  }
}

// Template.
let template;
const createTemplate = () => {
  const template = document.createDocumentFragment();

  // Style.
  template.appendChild(document.createElement('style')).innerHTML = `
  :host {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--gap);
    color: var(--light);
    background: var(--blueberry);
    padding: var(--padding) var(--padding-width-90-percent);
  }
  img {
    filter: saturate(0) brightness(2);
  }
  `;

  // Linked style.
  const externalStyle = template.appendChild(document.createElement('link'));
  externalStyle.setAttribute('rel', 'stylesheet');
  externalStyle.setAttribute('href', LINKS.CSS || LINKS.STYLES);
  externalStyle.setAttribute('type', 'text/css');

  // Content.
  const logoLink = template.appendChild(document.createElement('a')),
    logoImg = logoLink.appendChild(document.createElement('img')),
    description = template.appendChild(document.createElement('span')),
    socials = template.appendChild(document.createElement('div')),
    copyright = template.appendChild(document.createElement('span'));

  // Logo.
  logoLink.classList.add('link');
  logoLink.classList.add('cursor-n-resize');
  logoLink.setAttribute('href', '#front-page-slide-show');
  logoLink.setAttribute('title', 'Go to top of the page');
  logoImg.setAttribute('src', LOGO);
  logoImg.setAttribute('loading', 'lazy');
  logoImg.setAttribute('alt', 'Company logo');
  logoImg.classList.add('icon');

  // Description.
  description.setAttribute('title', description.innerHTML = DESCRIPTION);
  description.classList.add('font-size-12-14');
  description.classList.add('width-50-percent');
  description.classList.add('line-height-170-percent');
  description.classList.add('text-align-center');

  // Socials.
  socials.classList.add('socials');
  socials.classList.add('row');
  socials.classList.add('middle');
  socials.classList.add('center');
  socials.classList.add('gap');
  for (let i = 0, s = SOCIALS || [], l = s.length, link, img, n, social; i !== l; ++i) {
    link = socials.appendChild(document.createElement('a'));
    img = link.appendChild(document.createElement('img'));
    social = s[i];
    n = social.value || social.name || social.title || '';
    link.setAttribute('title', `Go to our ${n || 'social'} page`);
    link.setAttribute('target', '_blank');
    link.setAttribute('href', social.url || social.href || social.link);
    link.classList.add('link');
    link.classList.add('icon-container');
    img.classList.add('icon');
    img.setAttribute('src', social.src || social.img || social.icon || `https://crossroads-lab.github.io/Design-System/icons/socials/${n.toLowerCase()}-light.svg`);
    img.setAttribute('alt', `${n || 'Social'} logo`);
    img.setAttribute('loading', 'lazy');
  }

  // Copyright.
  copyright.classList.add('text-align-center');
  copyright.classList.add('text-wrap-balance');
  copyright.classList.add('font-size-12-14');
  const year = new Date(Date.now()).getFullYear();
  copyright.setAttribute('title', copyright.innerHTML = `Copyright © ${CREATION_YEAR && CREATION_YEAR != year && `${CREATION_YEAR}-`}${year} all rights reserved`);

  // Output.
  return template;
}

// Default export.
export default FooterInfo;

// Register component.
customElements.define('footer-info', FooterInfo);