// Extend generic HTMLElement interface
export class FrontPageSlideShow extends HTMLElement {
  #shadowRoot;
  #styleNode;
  #slotNode;

  constructor() {
    super();

    // Create template if needed.
    FrontPageSlideShow.template || (FrontPageSlideShow.template = FrontPageSlideShow.createTemplate());

    // Attach shadow DOM to element.
    const shadow = this.#shadowRoot = this.attachShadow({mode: 'open'});
    shadow.appendChild(FrontPageSlideShow.template.cloneNode(true));

    this.#styleNode = shadow.childNodes[0];
    this.#slotNode = shadow.childNodes[1];
    const children = (this.#slotNode = shadow.childNodes[1]).assignedElements(),
      [t, u = 'ms'] = (this.getAttribute('ms') || this.getAttribute('time') || '10000').split(/(ms|s)/),
      ms = parseFloat(t) * (u.trim().toLowerCase() === 's' && 1000 || 1),
      l = children.length;
    let index = (this.getAttribute('startIndex') || Math.floor(Math.random() * l)) % l;
    for (let i = 0, c; i !== l; ++i) {
      c = children[i];
      c.style.position = 'absolute';
      c.style.top = c.style.left = 0;
      c.style.transition = '3s';
      i === index && (
        c.startAnimation(),
        c.style.opacity = 1
      ) || (c.style.opacity = 0);
    }

    setInterval(() => {
      const cur = children[index],
        next = children[index = (index + 1) % l];
      cur.style.opacity = 0;
      setTimeout(() => cur.cancelAnimation(), (~~ms) >> 1);
      next.style.opacity = 1;
      next.startAnimation();
    }, ms);
  }
}

// Template.
FrontPageSlideShow.createTemplate = () => {
  const template = document.createDocumentFragment();
  template.appendChild(document.createElement('style')).innerHTML = `
  :host {
    position: relative;
    width: 100%;
    height: 100%;
    display: block;
  }
  `;
  template.appendChild(document.createElement('slot'));
  return template;
}

// Default export.
export default FrontPageSlideShow;

// Register component.
customElements.define('front-page-slide-show', FrontPageSlideShow);