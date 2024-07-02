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
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: var(--gap);
    flex-wrap: wrap;
    color: var(--light);
    background: var(--blueberry);
    padding: var(--padding) var(--padding-width-90-percent);
  }
  img {
    filter: saturate(0) brightness(2);
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
    el.classList.add('large');

    el = el.appendChild(document.createElement('img'));
    el.classList.add('icon');
    el.setAttribute('src', partner.src);
    el.setAttribute('alt', partner.alt || name);
  }

  // Output.
  return template;
}

// Default export.
export default PartnerList;

// Register component.
customElements.define('partner-list', PartnerList);