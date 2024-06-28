import { FRONT_PAGE_SLIDE_SHOW_CONTENT } from '../data/index.mjs';
import { removeScriptNode, style } from 'https://crossroads-lab.github.io/Client/src/index.mjs';

document.getElementById('front-page-slide-show').innerHTML
  = FRONT_PAGE_SLIDE_SHOW_CONTENT.map(props => props && (
    `<front-page
        ${Object.entries(props).map(([k, v]) => `${k}="${v}"`).join('\n')}
      ></front-page>`
  )
).join('\n');

style.innerHTML.replace(/\s+/g, '') || style.remove();
removeScriptNode(import.meta.url);