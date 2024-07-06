import { FRONT_PAGE_SLIDE_SHOW_CONTENT } from '../data/index.mjs';
import { detectScroll, removeScriptNode } from 'https://crossroads-lab.github.io/Client/src/index.mjs';

// Populate slide show.
const slideShow = document.getElementById('front-page-slide-show');
slideShow.innerHTML = (slideShow.innerHTML || '')
  + FRONT_PAGE_SLIDE_SHOW_CONTENT.map(props => props && (
    `<front-page
        background-hidden="true"
        ${Object.entries(props).map(([k, v]) => `${k}="${v}"`).join('\n')}
      ></front-page>`
  )
).join('\n');

// Detect scrolling, for nav.
detectScroll();

// Remove unecessary nodes.
removeScriptNode(import.meta.url);