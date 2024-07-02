// Imports.
import {
  COMPANY_INFORMATION,
  LINKS,
  TOP_NAVBAR_CONTENT,
  FRONT_PAGE_SLIDE_SHOW_CONTENT,
  PARTNERS
 } from '../data/index.mjs';
import {
  addComment,
  addLink,
  addMetaTag,
  addTitle,
  removeScriptNode
} from 'https://crossroads-lab.github.io/Client/src/index.mjs';

// Add title to head.
addTitle({title: COMPANY_INFORMATION.NAME, comment: 'Document title'});

// Add default meta tags, i.e. charset and viewport.
addMetaTag({charset: 'utf-8', comment: 'Default meta tags'});
addMetaTag({name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no'});
addMetaTag({name: 'theme-color', content: '#000000'});

// Add SEO | Open Graph meta tags.
COMPANY_INFORMATION.NAME && addMetaTag({property: 'og:title', content: COMPANY_INFORMATION.NAME, comment: 'SEO | Open Graph meta tags'});
COMPANY_INFORMATION.DESCRIPTION && addMetaTag({property: 'og:description', content: COMPANY_INFORMATION.DESCRIPTION});
const image =  COMPANY_INFORMATION.LOGO || COMPANY_INFORMATION.IMAGE;
image && addMetaTag({property: 'og:image', content: image});

// Add css.
const css = LINKS.CSS || LINKS.STYLES;
css && addLink({href: css, rel: 'stylesheet', type: 'text/css', comment: 'Styles'});

// Add favicon.
const favicon = LINKS.FAVICON || LINKS.ICON;
favicon && addLink({href: favicon, rel: 'shortcut icon', type: 'image/x-icon', comment: 'Favicon'});

// Preload images.
addComment('Preload images');
COMPANY_INFORMATION.LOGO
  && addLink({href: COMPANY_INFORMATION.LOGO, rel: 'preload', as: 'image'});
TOP_NAVBAR_CONTENT.LOGO
  && TOP_NAVBAR_CONTENT.LOGO !== COMPANY_INFORMATION.LOGO
  && addLink({href: TOP_NAVBAR_CONTENT.LOGO, rel: 'preload', as: 'image'});
for (let i = 0, data = COMPANY_INFORMATION.SOCIALS || [], l = data.length, d, src; i !== l; ++i) {
  d = data[i];
  src = d.src || d.icon || `https://crossroads-lab.github.io/Design-System/icons/socials/${(d.value || d.name || d.title || '').toLowerCase()}-light.svg`;
  src && addLink({href: src, rel: 'preload', as: 'image'});
}
for (let i = 0, data = FRONT_PAGE_SLIDE_SHOW_CONTENT || [], l = data.length, d, src; i !== l; ++i) {
  d = data[i];
  src = d.src || d.background;
  src && addLink({href: src, rel: 'preload', as: 'image'});
}
for (let i = 0, data = PARTNERS || [], l = data.length, d, src; i !== l; ++i) {
  d = data[i];
  src = d.src || d.logo;
  src && addLink({href: src, rel: 'preload', as: 'image'});
}

// Remove script node.
removeScriptNode(import.meta.url);