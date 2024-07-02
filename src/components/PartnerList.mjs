import PARTNERS from '../data/partnerData.mjs';
import LINKS from '../data/links.mjs';

// Extend generic HTMLElement interface.
export class PartnerList extends HTMLElement {
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

  // Linked style.
  const externalStyle = template.appendChild(document.createElement('link'));
  externalStyle.setAttribute('rel', 'stylesheet');
  externalStyle.setAttribute('href', LINKS.CSS || LINKS.STYLES);
  externalStyle.setAttribute('type', 'text/css');

  // Style.
  template.appendChild(document.createElement('style')).innerHTML = `
  :host {
    width: 100%;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    align-items: center;
    justify-content: center;
    color: var(--light);
    background: var(--gray-5);
    padding: var(--padding) var(--padding-width-90-percent);
  }

  a {
    position: relative;
    aspect-ratio: 1/1;
  }
  a div {
    display: none;
  }

  @media (hover: hover) and (pointer: fine), (-ms-high-contrast: active), (forced-colors: active) {
    a div {
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      padding: var(--padding-half);
      gap: var(--gap-half);
      background: #000000A0;
      opacity: 0;
      backdrop-filter: blur(0);
      transform: scale(0.9);
      transition: var(--transition-time);
    }
    a div span {
      color: var(--light);
      text-align: center;
      line-height: 140%;
    }
    a div span:first-of-type {
      font-weight: 600;
      font-size: var(--size-16-18);
    }
    a div span:last-of-type {
      font-weight: 400;
      font-size: var(--size-12-14);
    }

    a:hover div {
      opacity: 1;
      transform: none;
      backdrop-filter: blur(15px);
    }
  }

  @media only screen and (max-width: 850px) {
    :host {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }

  @media only screen and (max-width: 720px) {
    :host {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media only screen and (max-width: 500px) {
    :host {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media only screen and (max-width: 300px) {
    :host {
      grid-template-columns: 1fr;
    }
  }
  `;

  for (let i = 0, p = PARTNERS || [], l = p.length, partner, el, name, href; i !== l; ++i) {
    partner = p[i];
    name = partner.name || partner.value || partner.title || partner.alt;
    href = partner.href || partner.url || partner.link;
    el = template.appendChild(document.createElement('a'));
    el.setAttribute('title', `Go to ${partner.title || name || href || 'partner\'s page'}`);
    href && (el.setAttribute('href', href));
    el.classList.add('icon-container');
    el.classList.add('xlarge');
    el.classList.add('link');

    el = el.appendChild(document.createElement('img'));
    el.classList.add('icon');
    el.setAttribute('src', partner.src);
    el.setAttribute('alt', partner.alt || name);

    el = el.parentNode.appendChild(document.createElement('div'));
    el.appendChild(document.createElement('span')).innerHTML = name;
    el.appendChild(document.createElement('span')).innerHTML = partner.description || '';
  }

  // Output.
  return template;
}

// Default export.
export default PartnerList;

// Register component.
customElements.define('partner-list', PartnerList);