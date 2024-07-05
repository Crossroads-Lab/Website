import { NAME, TAGLINE } from '../data/companyInformation.mjs';

// Extend generic HTMLElement interface.
export class FrontPage extends HTMLElement {
  #background;
  #backgroundSrc;
  #hidden;
  #animation;

  // Constructor.
  constructor() {
    super();
  }

  // Helper function to start background animation.
  startAnimation() {
    this.unhideBackground();
    this.#background.classList.add(this.#animation);
    this.classList.add('anim');
    return this;
  }

  // Helper function to cancel background animation.
  cancelAnimation() {
    this.#background.classList.remove(this.#animation);
    this.classList.remove('anim');
    return this;
  }

  hideBackground() {
    this.#hidden || (
      this.background.style.backgroundImage = '',
      this.background.classList.add('hidden'),
      this.setAttribute('background-hidden', true),
      this.#hidden = true
    );
    return this;
  }

  unhideBackground() {
    this.#hidden && (
      this.background.style.backgroundImage = `url(${this.#backgroundSrc})`,
      this.background.classList.remove('hidden'),
      this.removeAttribute('background-hidden'),
      this.#hidden = false
    );
    return this;
  }

  connectedCallback() {
    // Create template if needed.
    this.appendChild((template || (template = createTemplate())).cloneNode(true));
    const title = this.getAttribute('title')
      || `Welcome to ${[NAME, TAGLINE].filter(x => x).join(' | ') || 'our website'}`,
    headline = this.childNodes[0],
    description = this.childNodes[1],
    button = this.childNodes[2],
    img = this.#background = this.childNodes[3];

    // Content.
    title && this.setAttribute('title', title);
    headline.setAttribute('title', headline.innerHTML = this.getAttribute('headline'));
    description.setAttribute('title', description.innerHTML = this.getAttribute('description'));
    button.setAttribute('title', button.innerHTML = this.getAttribute('button') || this.getAttribute('link'));

    // Attributes.
    let href = this.getAttribute('href'),
    target = this.getAttribute('href'),
    kf = this.getAttribute('anim')
      || this.getAttribute('animation')
      || this.getAttribute('keyframes'),
    origin = this.getAttribute('origin'),
    background = this.getAttribute('src'),
    position = this.getAttribute('position');

    // Button.
    href && href !== 'undefined' && href !== 'null' && button.setAttribute('href', href);
    target && target !== 'undefined' && target !== 'null' || (target = '_blank');
    button.setAttribute('target', target);

    // Animation.
    kf || (
      kf = `zoom-${~~(Math.random() * 2) && 'in' || 'out'}`,
      origin || (origin = ['', 'top', 'left', 'bottom', 'right'][~~(Math.random() * 5)])
    );
    this.#animation = kf.replace('-animation', '') + '-animation';
    origin && (origin = 'origin-' + origin.replace('origin-', ''));

    // Background image.
    background || (
      background = this.getAttribute('background'),
      background && (background = `assets/backgrounds/${background}`)
    );
    (this.#backgroundSrc = background) && (
      (this.hasAttribute('background-hidden') && this.hideBackground())
        || (img.style.backgroundImage = `url(${background})`),
      origin && img.classList.add(origin),
      position && (img.style.backgroundPosition = position)
    );
  }
}

// Template.
let template;
const createTemplate = () => {
  const template = document.createDocumentFragment();

  // Content.
  template.appendChild(document.createElement('h2'));
  template.appendChild(document.createElement('p'));
  template.appendChild(document.createElement('a'));

  // Background.
  template.appendChild(document.createElement('div'));

  // Output.
  return template;
}

// Default export.
export default FrontPage;

// Register component.
customElements.define('front-page', FrontPage);