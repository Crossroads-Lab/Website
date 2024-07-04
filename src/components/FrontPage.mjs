import { NAME, TAGLINE } from '../data/companyInformation.mjs';

// Extend generic HTMLElement interface.
export class FrontPage extends HTMLElement {
  #background;
  #animation;
  #origin;

  // Constructor.
  constructor() {
    super();
  }

  // Helper function to start background animation.
  startAnimation() {
    this.#origin && this.#background.classList.add(this.#origin);
    this.#background && this.#background.classList.add(this.#animation);
    this.classList.add('anim');
    console.log('start', this.#background.getAttribute('src'), this.#animation, this.#origin);
    return this;
  }

  // Helper function to cancel background animation.
  cancelAnimation() {
    this.#origin && this.#background.classList.remove(this.#origin);
    this.#background && this.#background.classList.remove(this.#animation);
    this.classList.remove('anim');
    console.log('end', this.#background.getAttribute('src'), this.#animation, this.#origin);
    return this;
  }

  connectedCallback() {
    // Create template if needed.
    this.appendChild((template || (template = createTemplate())).cloneNode(true));
    const title = this.getAttribute('title')
      || `Welcome to ${[NAME, TAGLINE].filter(x => x).join(' | ') || 'our website'}`,
    headline = this.childNodes[0],
    description = this.childNodes[1],
    button = this.childNodes[2];

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
    position = this.getAttribute('position'),
    img;

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
    origin && (this.#origin = 'origin-' + origin.replace('origin-', ''));

    // Background image.
    background || (
      background = this.getAttribute('background'),
      background && (background = `assets/backgrounds/${background}`)
    );
    background && (
      this.#background = img = this.appendChild(document.createElement('img')),
      img.setAttribute('alt', 'Background image'),
      img.setAttribute('src', background),
      img.setAttribute('width', 'var(--viewport-width)'),
      img.setAttribute('height', 'var(--viewport-height)'),
      position && (img.style.objectPosition = position)
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

  // Output.
  return template;
}

// Default export.
export default FrontPage;

// Register component.
customElements.define('front-page', FrontPage);