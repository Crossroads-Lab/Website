import PARTNERS from '../data/partnerData.mjs';
import LINKS from '../data/links.mjs';

// Extend generic HTMLElement interface.
export class PartnerList extends HTMLElement {
  // Constructor.
  constructor() {
    super();

    // Create template if needed.
    template || (template = createTemplate());

    // Attach shadow DOM to element.
    const shadow = this.attachShadow({mode: 'open'});
    shadow.appendChild(template.cloneNode(true));
  }
}

// Template.
let template;
const createTemplate = () => {
  const template = document.createDocumentFragment();

  // Linked style.
  const externalStyle = template.appendChild(document.createElement('link'));
  externalStyle.setAttribute('rel', 'stylesheet');
  externalStyle.setAttribute('href', LINKS.CSS || LINKS.STYLES);
  externalStyle.setAttribute('type', 'text/css');

  // Style.
  template.appendChild(document.createElement('style')).innerHTML = `
  :host {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: var(--gap);
    color: var(--light);
    background: var(--blueberry);
    padding: var(--padding) var(--padding-width-90-percent);
  }

  :host > div {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: var(--gap);
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 20%;
  }

  a img {
    width: 100%;
    height: 100%;
    max-height: var(--size-48-64);
    object-fit: contain;
    z-index: 0;
    filter: invert(1);
  }

  a div {
    display: none;
  }

  @media (hover: hover) and (pointer: fine), (-ms-high-contrast: active), (forced-colors: active) {
    :host > div {
      display: -webkit-grid;
      display: -moz-grid;
      display: -ms-grid;
      display: grid;
      grid-template-columns: repeat( 5, -webkit-minmax( 150px, 1fr ) );
      grid-template-columns: repeat( 5, minmax( 150px, 1fr ) );
      -ms-grid-columns: repeat( 5, minmax( 150px, 1fr ) );
      grid-template-rows: repeat( auto-fit, -webkit-minmax( 150px, 1fr ) );
      grid-template-rows: repeat( auto-fit, minmax( 150px, 1fr ) );
      -ms-grid-rows: repeat( auto-fit, minmax( 150px, 1fr ) );
      gap: var(--gap-half);
      grid-gap: var(--gap-half);
      min-height: 300px;
      box-sizing: border-box;
    }

    a {
      position: relative;
      aspect-ratio: 1/1;
      max-width: none;
      min-width: 150px;
      min-height: 150px;
    }

    a div {
      display: flex;
      flex-direction: column;
      position: absolute;
      width: 100%;
      height: 100%;
      align-items: center;
      justify-content: center;
      padding: calc(0.5 * var(--padding-half));
      gap: var(--gap-half);
      background: #FFFFFFD8;
      color: var(--dark);
      opacity: 0;
      --_blur: 0px;
      -webkit-backdrop-filter: blur(var(--_blur));
      -moz-backdrop-filter: blur(var(--_blur));
      backdrop-filter: blur(var(--_blur));
      transform: scale(0.8);
      transition: var(--transition-time);
      z-index: 1;
      border-radius: 16px;
    }
    a div span {
      color: var(--dark);
      text-align: center;
      line-height: 140%;
    }
    a div span:first-of-type {
      font-weight: 600;
      font-size: var(--size-16-18);
    }
    a div span:last-of-type {
      font-weight: 400;
      font-size: var(--size-12-14);
    }

    a:hover div {
      opacity: 1;
      transform: none;
      --_blur: 15px;
      border-radius: 2px;
    }
  }

  @media only screen and (max-width: 900px) {
    :host > div {
      grid-template-columns: repeat( 4, -webkit-minmax( 150px, 1fr ) );
      grid-template-columns: repeat( 4, minmax( 150px, 1fr ) );
      -ms-grid-columns: repeat( 4, minmax( 150px, 1fr ) );
    }
  }

  @media only screen and (max-width: 720px) {
    :host > div {
      grid-template-columns: repeat( 3, -webkit-minmax( 150px, 1fr ) );
      grid-template-columns: repeat( 3, minmax( 150px, 1fr ) );
      -ms-grid-columns: repeat( 3, minmax( 150px, 1fr ) );
    }
  }

  @media only screen and (max-width: 540px) {
    :host > div {
      grid-template-columns: repeat( 2, -webkit-minmax( 150px, 1fr ) );
      grid-template-columns: repeat( 2, minmax( 150px, 1fr ) );
      -ms-grid-columns: repeat( 2, minmax( 150px, 1fr ) );
    }
  }

  @media only screen and (max-width: 300px) {
    :host > div {
      grid-template-columns: -webkit-minmax( 150px, 1fr );
      grid-template-columns: minmax( 150px, 1fr );
      -ms-grid-columns: minmax( 150px, 1fr );
    }
  }
  `;

  // headline.
  const title = template.appendChild(document.createElement('span'));
  title.innerHTML = 'portfolio';
  title.classList.add('text-transform-capitalize');
  title.classList.add('text-wrap-balance');
  title.classList.add('text-align-center');

  // Title.
  const headline = template.appendChild(document.createElement('h1'));
  headline.innerHTML = `
    We made it <span class="text-transform-capitalize color-purple-orange-diagonal">happen with you</span>
  `;
  headline.classList.add('text-transform-capitalize');
  headline.classList.add('text-wrap-balance');
  headline.classList.add('text-align-center');

  // Grid.
  const content = template.appendChild(document.createElement('div'));
  for (let i = 0, p = PARTNERS || [], l = p.length, partner, el, name, href; i !== l; ++i) {
    partner = p[i];
    name = partner.name || partner.value || partner.title || partner.alt;
    href = partner.href || partner.url || partner.link;
    el = content.appendChild(document.createElement('a'));
    el.setAttribute('title', `Go to ${partner.title || name || href || 'partner\'s page'}`);
    href && (el.setAttribute('href', href));
    el.setAttribute('target', '_blank');
    el.classList.add('xlarge');
    el.classList.add('link');

    el = el.appendChild(document.createElement('div'));
    el.appendChild(document.createElement('span')).innerHTML = name;
    el.appendChild(document.createElement('span')).innerHTML = partner.description || '';

    el = el.parentNode.appendChild(document.createElement('img'));
    el.setAttribute('src', partner.src);
    el.setAttribute('alt', partner.alt || name);
  }

  // Output.
  return template;
}

// Default export.
export default PartnerList;

// Register component.
customElements.define('partner-list', PartnerList);