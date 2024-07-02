// Extend generic HTMLElement interface.
export class SplashScreen extends HTMLElement {
  // Constructor.
  constructor() {
    super();

    // Create template if needed.
    template || (template = createTemplate());

    // Attach shadow DOM to element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(template.cloneNode(true));

    const handler = () => {
      setTimeout(this.classList.add('hidden'), 100);
      window.removeEventListener('load', handler);
    };
    window.addEventListener('load', handler);
  }
}

// Template.
let template;
const createTemplate = () => {
  const template = document.createDocumentFragment();

  // Style.
  template.appendChild(document.createElement('style')).innerHTML = `
  :host {
    position: fixed;
    width: var(--viewport-width);
    height: var(--viewport-height);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--z-index-max);
    background: black;
    opacity: 1;
    pointer-events: auto;
    transition: 1s;
  }
  :host(.hidden) {
    pointer-events: none;
    opacity: 0;
  }
  `;

  // Content.
  template.appendChild(document.createElement('slot'));

  // Output.
  return template;
}

// Default export.
export default SplashScreen;

// Register component.
customElements.define('splash-screen', SplashScreen);