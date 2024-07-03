import { NAME, TAGLINE } from '../data/companyInformation.mjs';

// Extend generic HTMLElement interface.
export class FrontPage extends HTMLElement {
  #background;
  #animation;

  // Constructor.
  constructor() {
    super();
  }

  // Helper function to start background animation.
  startAnimation() {
    this.classList.add('anim');
    this.#background && this.#background.classList.add(this.#animation);
    return this;
  }

  // Helper function to cancel background animation.
  cancelAnimation() {
    this.classList.remove('anim');
    this.#background && this.#background.classList.remove(this.#animation);
    return this;
  }

  connectedCallback() {
    // Create template if needed.
    this.appendChild(template || (template = createTemplate()));
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
    background = this.getAttribute('src'),
    img;

    // Button.
    href && href !== 'undefined' && href !== 'null' && button.setAttribute('href', href);
    target && target !== 'undefined' && target !== 'null' || (target = '_blank');
    button.setAttribute('target', target);

    // Animation.
    kf || (
      kf = `zoom-${~~(Math.random() * 2) && 'in' || 'out'}`,
      kf += ['', '-top', '-left', '-bottom', '-right'][~~(Math.random() * 5)]
    );
    this.#animation = kf.replace('-animation', '') + '-animation';

    // Background image.
    background || (
      background = this.getAttribute('background'),
      background && (background = `assets/backgrounds/${background}`)
    );
    background && (
      this.#background = img = this.appendChild(document.createElement('img')),
      img.setAttribute('alt', 'Background image'),
      img.setAttribute('src', background)
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

// Helper function to create keyframe.
const createKeyframes = input => Object.defineProperty(input || {}, 'toString', {
  value: function() {
    return Object.entries(this).map(([key, value]) => (
      `${key} {\n${
        Object.entries(value || {}).map(([k, v]) => `${k}: ${v};`).join('\n')
      }\n}`
    )).join('\n');
  }
});

// Define keyframes.
const keyframes = {
  'zoom-out': createKeyframes({
    from: {
      transform: 'scale(1.1)'
    },
    to: {
      transform: 'none'
    }
  }),
  'zoom-out-top-left': createKeyframes({
    from: {
      transform: 'scale(1.1)',
      'transform-origin': 'top left'
    },
    to: {
      transform: 'none'
    }
  }),
  'zoom-out-top-right': createKeyframes({
    from: {
      transform: 'scale(1.1)',
      'transform-origin': 'top right'
    },
    to: {
      transform: 'none'
    }
  }),
  'zoom-out-top': createKeyframes({
    from: {
      transform: 'scale(1.1)',
      'transform-origin': 'top'
    },
    to: {
      transform: 'none'
    }
  }),
  'zoom-out-bottom-left': createKeyframes({
    from: {
      transform: 'scale(1.1)',
      'transform-origin': 'bottom left'
    },
    to: {
      transform: 'none'
    }
  }),
  'zoom-out-bottom-right': createKeyframes({
    from: {
      transform: 'scale(1.1)',
      'transform-origin': 'bottom right'
    },
    to: {
      transform: 'none'
    }
  }),
  'zoom-out-bottom': createKeyframes({
    from: {
      transform: 'scale(1.1)',
      'transform-origin': 'bottom'
    },
    to: {
      transform: 'none'
    }
  }),
  'zoom-out-left': createKeyframes({
    from: {
      transform: 'scale(1.1)',
      'transform-origin': 'left'
    },
    to: {
      transform: 'none'
    }
  }),
  'zoom-out-right': createKeyframes({
    from: {
      transform: 'scale(1.1)',
      'transform-origin': 'right'
    },
    to: {
      transform: 'none'
    }
  })
};

// Default export.
export default FrontPage;

// Register component.
customElements.define('front-page', FrontPage);