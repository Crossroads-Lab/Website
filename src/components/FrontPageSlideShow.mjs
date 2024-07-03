// Extend generic HTMLElement interface.
export class FrontPageSlideShow extends HTMLElement {
  // Constructor.
  constructor() {
    super();
  }

  connectedCallback() {
    // Create template if needed, and get children.
    const children = this.appendChild(
      (template || (template = createTemplate())).cloneNode(true)
    ).assignedElements() || [],
    [t, u = 'ms'] = (this.getAttribute('ms') || this.getAttribute('time') || '10000').split(/(ms|s)/),
    ms = parseFloat(t) * (u.trim().toLowerCase() === 's' && 1000 || 1),
    l = children.length;
    let index = (this.getAttribute('startIndex') || Math.floor(Math.random() * l)) % l;

    // Create animation.
    for (let i = 0, c; i !== l; ++i) {
      c = children[i];
      c.classList.add('position-absolute');
      i === index && c.startAnimation() || c.classList.add('opacity-0-percent');
    }

    // Rotate slides.
    setInterval(() => {
      const cur = children[index],
        next = children[index = (index + 1) % l];
      cur.classList.add('opacity-0-percent');
      next.classList.remove('opacity-0-percent');
      setTimeout(() => cur.cancelAnimation(), (~~ms) >> 1);
      next.startAnimation();
    }, ms);

  }
}

// Template.
let template;
const createTemplate = () => {
  const template = document.createElement('slot');

  // Output.
  return template;
}

// Default export.
export default FrontPageSlideShow;

// Register component.
customElements.define('front-page-slide-show', FrontPageSlideShow);