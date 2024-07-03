// Imports.
import { LOGO, NAME, TITLE } from '../data/topNavbarContent.mjs';

// Extend generic HTMLElement interface.
export class TopNavbar extends HTMLElement {
  // Constructor.
  constructor() {
    super();
  }

  // Add elements to the component.
  connectedCallback() {
    const logoSrc = this.getAttribute('logo-src') || LOGO,
    name = this.getAttribute('logo-name') || NAME,
    titleContent = this.getAttribute('logo-title') || TITLE || `Welcome to ${name || 'our website'}`,
    link = template || (template = createTemplate()),
    title = link.childNodes[0],
    img = logoSrc && link.appendChild(document.createElement('img'));
    link.setAttribute('href', this.getAttribute('logo-href') || '#');
    link.setAttribute('title', this.getAttribute('logo-title') || 'Website logo');
    title.innerHTML = titleContent;
    img && (
      img.setAttribute('src', logoSrc),
      img.classList.add('icon'),
      img.setAttribute('alt', 'Top navbar logo'),
      title.classList.add('invisible')
    );
  }
}

// Template.
let template;
const createTemplate = ({
  title = 'Website logo',
  href = '#',
  name = 'Welcome to our website'
} = {}) => {
  const template = document.createElement('a');
  template.classList.add('link');
  template.classList.add('cursor-n-resize');
  template.setAttribute('href', href);
  template.setAttribute('title', title);

  // Content.
  template.appendChild(document.createElement('h1')).innerHTML = name;

  // Output.
  return template;
}

// Default export.
export default TopNavbar;

// Register component.
customElements.define('top-navbar', TopNavbar);