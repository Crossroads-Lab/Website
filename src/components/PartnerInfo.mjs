// Extend generic HTMLElement interface.
export class PartnerInfo extends HTMLElement {
  // Constructor.
  constructor() {
    super();
  }

  connectedCallback() {
    // Create template if needed.
    this.appendChild((template || (template = createTemplate())).cloneNode(true));

    // Get attributes.
    const alt = this.getAttribute('alt'),
    _title = this.getAttribute('title'),
    name = this.getAttribute('name') || this.getAttribute('value')
      || _title || alt,
    href = this.getAttribute('href') || this.getAttribute('url') || this.getAttribute('link'),
    title = `Go to ${_title || name || href || 'partner\'s page'}`,
    description = this.getAttribute('desc') || this.getAttribute('description'),
    src = this.getAttribute('src') || this.getAttribute('img') || this.getAttribute('logo');

    // Get elements.
    const a = this.childNodes[0],
    div = a.childNodes[0],
    h3 = div.childNodes[0],
    p = div.childNodes[1],
    img = a.childNodes[1];

    // Set attributes.
    href && a.setAttribute('href', href);
    a.setAttribute('title', title);
    h3.innerHTML = name || '';
    p.innerHTML = description || '';
    img.setAttribute('src', src);
    img.setAttribute('alt', alt || `${name}\'s logo`);
  }
}

// Template.
let template;
const createTemplate = () => {
  const template = document.createElement('a');
  template.setAttribute('target', '_blank');
  template.classList.add('xlarge');
  template.classList.add('link');

  // Content.
  const info = template.appendChild(document.createElement('div'));
  info.appendChild(document.createElement('h3'));
  info.appendChild(document.createElement('p'));

  // Image / logo.
  const img = template.appendChild(document.createElement('img'));
  img.setAttribute('loading', 'lazy');
  img.setAttribute('src', 'data:,');
  img.setAttribute('alt', 'Company logo');

  // Output.
  return template;
}

// Default export.
export default PartnerInfo;

// Register component.
customElements.define('partner-info', PartnerInfo);