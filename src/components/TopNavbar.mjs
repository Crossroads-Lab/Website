// Imports.
import { LOGO } from '../data/topNavbarContent.mjs';

// Extend generic HTMLElement interface.
export class TopNavbar extends HTMLElement {
  // Constructor.
  constructor() {
    super();
  }

  // Add elements to the component.
  connectedCallback() {
    const logoSrc = this.getAttribute('logo-src') || LOGO;
    if (logoSrc) {
      const link = this.appendChild(document.createElement('a')),
      img = link.appendChild(document.createElement('img'));
      link.classList.add('link');
      link.classList.add('cursor-n-resize');
      link.setAttribute('href', this.getAttribute('logo-href') || '#');
      link.setAttribute('title', this.getAttribute('logo-title') || 'Logo');
      img.setAttribute('src', logoSrc);
      img.classList.add('icon');
    }
  }
}

// Default export.
export default TopNavbar;

// Register component.
customElements.define('top-navbar', TopNavbar);