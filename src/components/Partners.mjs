import PARTNERS from '../data/partnerData.mjs';

// Extend generic HTMLElement interface.
export class Partners extends HTMLElement {
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

  // Output.
  return template;
}

// Default export.
export default Partners;

// Register component.
customElements.define('partners', Partners);