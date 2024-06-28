// Imports.
import { COMPANY_INFORMATION, LINKS } from '../data/index.mjs';
import {
  addLink,
  addMetaTag,
  addTitle,
  removeScriptNode
} from 'https://crossroads-lab.github.io/Client/src/index.mjs';

// Add title to head.
addTitle(COMPANY_INFORMATION.NAME);

// Add default meta tags, i.e. charset and viewport.
addMetaTag({charset: 'utf-8', comment: 'DEFAULT META TAGS'});
addMetaTag({name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no'});

// Add SEO | Open Graph meta tags.
COMPANY_INFORMATION.NAME && addMetaTag({property: 'og:title', content: COMPANY_INFORMATION.NAME});
COMPANY_INFORMATION.DESCRIPTION && addMetaTag({property: 'og:description', content: COMPANY_INFORMATION.DESCRIPTION});
const image =  COMPANY_INFORMATION.LOGO || COMPANY_INFORMATION.IMAGE;
image && addMetaTag({property: 'og:image', content: image});

// Add css.
const css = LINKS.CSS || LINKS.STYLES;
css && addLink({href: css, rel: 'stylesheet', type: 'text/css'});

// Add favicon.
const favicon = LINKS.FAVICON || LINKS.ICON;
favicon && addLink({href: favicon, rel: 'shortcut icon', type: 'image/x-icon'});

console.log('removed initHead', removeScriptNode(import.meta.url));