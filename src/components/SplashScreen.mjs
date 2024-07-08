import { style } from 'https://crossroads-lab.github.io/Client/src/index.mjs';

// Extend generic HTMLElement interface.
export class SplashScreen extends HTMLElement {
  // Constructor.
  constructor() {
    super();

    // Create template if needed.
    template || (template = createTemplate());

    // Window load handler.
    const handler = () => {
      setTimeout(() => this.classList.add('loaded'), 100);
      window.removeEventListener('load', handler);
    };
    window.addEventListener('load', handler);

    // Style.
    style.sheet.insertRule(`
      body:not(:has(splash-screen.loaded)) :not(splash-screen) {
        display: none;
      }
    `);
    style.innerHTML = (style.innerHTML || '') + `
      body:has(splash-screen) {
        display: none;
        background: blue;
      }
    `;

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
    position: fixed;
    width: var(--viewport-width);
    height: var(--viewport-height);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: var(--z-index-max);
    background: var(--spash-screen-background, var(--background, black));
    opacity: 1;
    pointer-events: auto;
  }
  :host(.loaded) {
    pointer-events: none;
    opacity: 0;
    transition: 3s;
  }
  `;

  // Output.
  return template;
}

// Default export.
export default SplashScreen;

// Register component.
customElements.define('splash-screen', SplashScreen);