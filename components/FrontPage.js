// Extend generic HTMLElement interface
export class FrontPage extends HTMLElement {
  #shadowRoot;
  #styleNode;
  #headlineNode;
  #descriptionNode;
  #linkNode;

  constructor() {
    super();

    // Create template if needed.
    FrontPage.template || (FrontPage.template = FrontPage.createTemplate());

    // Attach shadow DOM to element
    const shadow = this.#shadowRoot = this.attachShadow({mode: 'open'});
    shadow.appendChild(FrontPage.template.cloneNode(true));
    this.#styleNode = shadow.childNodes[0];
    const style = this.#styleNode = shadow.childNodes[0],
    headline = this.#headlineNode = shadow.childNodes[1],
    description = this.#descriptionNode = shadow.childNodes[2],
    link = this.#linkNode = shadow.childNodes[3];

    // Get properties.
    this.setAttribute('title', 'Welcome to Crossroads Venture Studio, the venture that incubate your ideas');
    headline.setAttribute('title', headline.innerHTML = this.getAttribute('headline'));
    description.setAttribute('title', description.innerHTML = this.getAttribute('description'));
    link.setAttribute('title', link.innerHTML = this.getAttribute('link'));
    let href = this.getAttribute('href'), target = this.getAttribute('href');
    href && href !== 'undefined' && href !== 'null' && link.setAttribute('href', href);
    target && target !== 'undefined' && target !== 'null' || (target = '_blank');
    link.setAttribute('target', target);
    style.sheet.insertRule(`@keyframes background {
      ${FrontPage.keyframes[~~(Math.random() * FrontPage.keyframes.length)]}
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

  startAnimation() {
    this.classList.add('anim');
  }

  cancelAnimation() {
    this.classList.remove('anim');
  }
}

// Template.
FrontPage.createTemplate = () => {
  const template = document.createDocumentFragment();
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
    padding-left: max(var(--padding-2x), 10 * var(--vw));
    padding-bottom: var(--padding-2x);
    padding-right: max(var(--padding-2x), 20 * var(--vw));
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
    font-size: var(--size-20-32);
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
  template.appendChild(document.createElement('h1'));
  template.appendChild(document.createElement('h2'));
  template.appendChild(document.createElement('a'));
  return template;
}

FrontPage.createKeyframes = input => Object.defineProperty(input || {}, 'toString', {
  value: function() {
    return Object.entries(this).map(([key, value]) => (
      `${key} {\n${
        Object.entries(value || {}).map(([k, v]) => `${k}: ${v};`).join('\n')
      }\n}`
    )).join('\n');
  }
});

FrontPage.keyframes = [
  FrontPage.createKeyframes({
    from: {
      transform: 'scale(1.1)'
    },
    to: {
      transform: 'none'
    }
  }),
  FrontPage.createKeyframes({
    from: {
      transform: 'scale(1.1)',
      'transform-origin': 'top left'
    },
    to: {
      transform: 'none'
    }
  }),
  FrontPage.createKeyframes({
    from: {
      transform: 'scale(1.1)',
      'transform-origin': 'top right'
    },
    to: {
      transform: 'none'
    }
  }),
  FrontPage.createKeyframes({
    from: {
      transform: 'scale(1.1)',
      'transform-origin': 'bottom left'
    },
    to: {
      transform: 'none'
    }
  }),
  FrontPage.createKeyframes({
    from: {
      transform: 'scale(1.1)',
      'transform-origin': 'bottom right'
    },
    to: {
      transform: 'none'
    }
  })
];

// Default export.
export default FrontPage;

// Register component.
customElements.define('front-page', FrontPage);