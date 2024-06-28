import { FRONT_PAGE_SLIDE_SHOW_CONTENT } from '../data/index.mjs';
import { getScriptNode } from 'https://crossroads-lab.github.io/Client/src/index.mjs';

document.getElementById('front-page-slide-show').innerHTML
  = FRONT_PAGE_SLIDE_SHOW_CONTENT.map(props => props && (
    `<front-page
        ${Object.entries(props).map(([k, v]) => `${k}="${v}"`).join('\n')}
      ></front-page>`
  )
).join('\n');

console.log('removed createContent', removeScriptNode(import.meta.url));