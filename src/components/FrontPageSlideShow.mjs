// Extend generic HTMLElement interface.
export class FrontPageSlideShow extends HTMLElement {
  // Constructor.
  constructor() {
    super();

    // Create template if needed.
    template || (template = createTemplate());

    // Attach shadow DOM to element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(template.cloneNode(true));

    // Get slotted content and create animation.
    const children = shadow.childNodes[1].assignedElements(),
      [t, u = 'ms'] = (this.getAttribute('ms') || this.getAttribute('time') || '10000').split(/(ms|s)/),
      ms = parseFloat(t) * (u.trim().toLowerCase() === 's' && 1000 || 1),
      l = children.length;
    let index = (this.getAttribute('startIndex') || Math.floor(Math.random() * l)) % l;
    for (let i = 0, c; i !== l; ++i) {
      c = children[i];
      c.style.position = 'absolute';
      c.style.top = c.style.left = 0;
      i === index && (
        c.startAnimation(),
        c.style.transition = null,
        c.style.opacity = 1
      ) || (c.style.opacity = 0);
    }

    // Rotate slides.
    setInterval(() => {
      const cur = children[index],
        next = children[index = (index + 1) % l];
      cur.style.transition = next.style.transition = 'opacity 3s';
      cur.style.opacity = 0;
      setTimeout(() => cur.cancelAnimation(), (~~ms) >> 1);
      next.style.opacity = 1;
      next.startAnimation();
      setTimeout(() => cur.style.transition = next.style.transition = null, 3100);
    }, ms);
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
    display: block;
    background: black;
  }
  `;

  // Content.
  template.appendChild(document.createElement('slot'));

  // Output.
  return template;
}

// Default export.
export default FrontPageSlideShow;

// Register component.
customElements.define('front-page-slide-show', FrontPageSlideShow);