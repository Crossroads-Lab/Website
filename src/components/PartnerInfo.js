// Extend generic HTMLElement interface.
export class PartnerInfo extends HTMLElement {
  // Constructor.
  constructor() {
    super();
  }

  connectedCallback() {
    // Create template if needed.
    this.appendChild((template || (template = createTemplate())).cloneNode(true));

    
  }
}

// Template.
let template;
const createTemplate = () => {
  const template = document.createDocumentFragment();

  // Content.
  

  // Output.
  return template;
}

// Default export.
export default PartnerInfo;

// Register component.
customElements.define('team-member', PartnerInfo);