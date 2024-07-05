import { FRONT_PAGE_SLIDE_SHOW_CONTENT } from '../data/index.mjs';
import { detectScroll, removeScriptNode, style } from 'https://crossroads-lab.github.io/Client/src/index.mjs';

// Populate slide show.
document.getElementById('front-page-slide-show').innerHTML
  = FRONT_PAGE_SLIDE_SHOW_CONTENT.map(props => props && (
    `<front-page
        background-hidden="true"
        ${Object.entries(props).map(([k, v]) => `${k}="${v}"`).join('\n')}
      ></front-page>`
  )
).join('\n');

// Detect scrolling, for nav.
detectScroll();

// Remove unecessary nodes.
// style.innerHTML.replace(/\s+/g, '') || style.remove();
removeScriptNode(import.meta.url);