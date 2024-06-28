import { FRONT_PAGE_SLIDE_SHOW_CONTENT } from '../data/index.mjs';

document.getElementById('front-page-slide-show').innerHTML
  = FRONT_PAGE_SLIDE_SHOW_CONTENT.map(props => props && (
    `<front-page
        ${Object.entries(props).map(([k, v]) => `${k}="${v}"`).join('\n')}
      ></front-page>`
  )
).join('\n');

const getScriptNode = src => {
  if (!src) {
    try {
      src = import.meta.url;
    } catch {
      return document.currentScript;
    }
  }

  const scripts = document.getElementsByTagName('script');
  for (let i = 0, l = scripts.length, s; i !== l; ++i) {
    if (src === (s = scripts[i]).src || s.getAttribute('src')) return s;
  }

  return null;
}

console.log('createContent', getScriptNode());