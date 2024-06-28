// Extend generic HTMLElement interface.
export class FrontPage extends HTMLElement {
  // Constructor.
  constructor() {
    super();

    // Create template if needed.
    template || (template = createTemplate());

    // Attach shadow DOM to element.
    const shadow = this.attachShadow({mode: 'open'});

    // Attach template to shadow DOM.
    shadow.appendChild(template.cloneNode(true));

    // Get individual components.
    const style = shadow.childNodes[0],
      headline = shadow.childNodes[1],
      description = shadow.childNodes[2],
      link = shadow.childNodes[3];

    // Get properties and set attributes.
    this.setAttribute('title', 'Welcome to Crossroads Venture Studio, the venture that incubate your ideas');
    headline.setAttribute('title', headline.innerHTML = this.getAttribute('headline'));
    description.setAttribute('title', description.innerHTML = this.getAttribute('description'));
    link.setAttribute('title', link.innerHTML = this.getAttribute('link'));
    let href = this.getAttribute('href'), target = this.getAttribute('href');
    href && href !== 'undefined' && href !== 'null' && link.setAttribute('href', href);
    target && target !== 'undefined' && target !== 'null' || (target = '_blank');
    link.setAttribute('target', target);
    let kf = this.getAttribute('anim')
      || this.getAttribute('animation')
      || this.getAttribute('keyframes');
    kf && (kf = kf[keyframe]) || (
      kf = Object.values(keyframes),
      kf = kf[~~(Math.random() * kf.length)]
    );
    style.sheet.insertRule(`@keyframes background {
      ${kf}
    }`);
    style.sheet.insertRule(`
    :host:before {
      content: ' ';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.5;
      background-image: url('assets/backgrounds/${this.getAttribute('background')}');
      background-position: ${this.getAttribute('position') || 'center'};
      background-repeat: no-repeat;
      background-size: cover;
      z-index: 0;
      overflow: hidden;
    }
    `);

    style.sheet.insertRule(`    
    :host(.anim):before {
      animation: background 20s;
      transition: 1s;
    }`);
  }

  // Helper function to start background animation.
  startAnimation() {
    this.classList.add('anim');
  }

  // Helper function to cancel background animation.
  cancelAnimation() {
    this.classList.remove('anim');
  }
}

// Template.
let template;
const createTemplate = () => {
  const template = document.createDocumentFragment();

  // Style.
  template.appendChild(document.createElement('style')).innerHTML = `
  :host {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: var(--text-gap-2x);
    align-items: flex-start;
    justify-content: flex-end;
    padding-top: var(--padding-2x);
    padding-left: var(--padding-width-90-percent);
    padding-bottom: var(--padding-2x);
    padding-right: var(--padding-width-70-percent);
    overflow: hidden !important;
  }

  * {
    color: var(--light);
    z-index: 1;
  }

  h1 {
    font-size: var(--size-40-64);
    font-weight: 900;
    letter-spacing: .1rem;
    text-wrap: balance;
    margin: 0;
    padding: 0;
    line-height: 110%;
  }

  h2 {
    font-size: var(--size-20-28);
    font-weight: 500;
    text-wrap: balance;
    margin: 0;
    padding: 0;
  }

  a, button {
    border: 0;
    font-size: var(--size-16-18);
    font-weight: 500;
    text-shadow: 0 0 10px #00000087;
    margin-top: var(--gap-half);
    background: var(--purple-orange-diagonal);
    padding: 10px 14px;
    border-radius: 2px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    -webkit-decoration: none;
    -webkit-text-decoration: none;
    text-decoration: none;
  }

  @media (hover: hover) and (pointer: fine), (-ms-high-contrast: active), (forced-colors: active) {
    a, button {
      transition: var(--transition-time);
      cursor: pointer;
      outline: 5px solid transparent;
      outline-offset: 10px;
    }
    button:hover, a:hover {
      --_color: var(--orange);
      outline: 1px solid var(--_color);
      outline-offset: 0px;
      background: none;
      --_shadow: 8px 8px 0px var(--_color);
      -webkit-box-shadow: var(--_shadow);
      -moz-box-shadow: var(--_shadow);
      box-shadow: var(--_shadow);
    }
  }
  `;

  // Content.
  template.appendChild(document.createElement('h1'));
  template.appendChild(document.createElement('h2'));
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