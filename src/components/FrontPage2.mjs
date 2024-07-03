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
    kf && (kf = keyframes[kf]) || (
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