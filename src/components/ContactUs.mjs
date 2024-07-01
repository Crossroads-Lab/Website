import {
  CREATION_YEAR,
  DESCRIPTION,
  LOGO,
  SOCIALS
} from '../data/companyInformation.mjs';

// Extend generic HTMLElement interface.
export class ContactUs extends HTMLElement {
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
    filter: saturate(1) brightness(1);
  }
  `;

  // Content.
  const logoLink = template.appendChild(document.createElement('a')),
    logoImg = logoLink.appendChild(document.createElement('img')),
    description = template.appendChild(document.createElement('span')),
    socials = template.appendChild(document.createElement('div')),
    copyright = template.appendChild(document.createElement('span'));

  // Logo.
  logoLink.classList.add('link');
  logoLink.classList.add('cursor-n-resize');
  logoLink.classList.add('icon');
  logoLink.setAttribute('href', '#front-page-slide-show');
  logoLink.setAttribute('title', 'Go to top of the page');
  logoImg.setAttribute('src', LOGO);
  logoImg.classList.add('icon');

  // Description.
  description.setAttribute('title', description.innerHTML = DESCRIPTION);
  description.classList.add('font-size-12-14');
  description.classList.add('text-align-center');

  // Socials.
  socials.classList.add('socials');
  socials.classList.add('row');
  socials.classList.add('middle');
  socials.classList.add('center');
  socials.classList.add('gap-half');
  for (let i = 0, s = SOCIALS || [], l = s.length, link, img, social; i !== l; ++i) {
    link = socials.appendChild(document.createElement('a'));
    img = link.appendChild(document.createElement('img'));
    social = s[i];
    link.setAttribute('title', `Go to our ${social.value || social.name || social.title || 'social'} page`);
    link.setAttribute('target', '_blank');
    link.setAttribute('href', social.url || social.href || social.link);
    link.classList.add('link');
    img.classList.add('icon');
    img.setAttribute('src', social.src, social.img || social.icon);
    img.setAttribute('alt', `${social.value || social.name || social.title || 'Social'} logo`);
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
export default ContactUs;

// Register component.
customElements.define('contact-us', ContactUs);