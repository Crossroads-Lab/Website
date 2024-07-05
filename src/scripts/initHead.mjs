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
  addStructuredData,
  removeScriptNode
} from 'https://crossroads-lab.github.io/Client/src/index.mjs';

// Add create tags.
const title = COMPANY_INFORMATION.TITLE || [
  COMPANY_INFORMATION.NAME,
  COMPANY_INFORMATION.TAGLINE
].filter(x => x).join(' | '),
name = COMPANY_INFORMATION.NAME || title,
description = COMPANY_INFORMATION.DESCRIPTION || title,
image =  COMPANY_INFORMATION.IMAGE || COMPANY_INFORMATION.LOGO,
{ site: twitterSite, creator: twitterCreator = twitterSite} = COMPANY_INFORMATION.TWITTER_CARD || COMPANY_INFORMATION.TWITTER || {};

// Add title to head.
addTitle({title, comment: 'Document title'});

// Add default meta tags, i.e. charset and viewport.
addMetaTag({charset: 'utf-8', comment: 'Default meta tags'});
addMetaTag({name: 'viewport', content: 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no'});
addMetaTag({name: 'theme-color', content: '#000000'});
description && addMetaTag({name: 'description', content: description});
image && addMetaTag({name: 'image', content: image});

// Add SEO | Open Graph meta tags.
addMetaTag({property: 'og:locale', content: 'en_US', comment: 'SEO | Open Graph meta tags'});
addMetaTag({property: 'og:type', content: 'website'});
addMetaTag({property: 'og:url', content: window.location.href});
name && addMetaTag({property: 'og:site_name', content: name});
title && addMetaTag({property: 'og:title', content: title});
COMPANY_INFORMATION.DESCRIPTION && addMetaTag({property: 'og:description', content: COMPANY_INFORMATION.DESCRIPTION});
image && (
  addMetaTag({property: 'og:image', content: image}),
  addMetaTag({property: 'og:image:alt', content: 'Logo of the company'})
);

// Add SEO | Twitter card tags.
twitterSite && (
  addMetaTag({property: 'twitter:card', content: 'summary', comment: 'SEO | Twitter/X card tags'}),
  addMetaTag({property: 'twitter:site', content: twitterSite}),
  addMetaTag({property: 'twitter:creator', content: twitterCreator}),
  description && addMetaTag({property: 'twitter:description', content: description}),
  title && addMetaTag({property: 'twitter:title', content: title.substring(0, 70)}),
  image && (
    addMetaTag({property: 'twitter:image', content: image}),
    addMetaTag({property: 'twitter:image:alt', content: 'Logo of the company'})
  )
);

// Add canonical link.
addLink({href: window.location.href, rel: 'canonical', comment: 'Canonical url'});

// Add css.
const css = LINKS.CSS || LINKS.STYLES;
css && addLink({href: css, rel: 'stylesheet', type: 'text/css', comment: 'Styles'});

// Add favicon.
const favicon = LINKS.FAVICON || LINKS.ICON;
favicon && addLink({href: favicon, rel: 'shortcut icon', type: 'image/x-icon', comment: 'Favicon'});

// Preload images.
// addComment('Prefetch images');
// COMPANY_INFORMATION.LOGO
//   && addLink({href: COMPANY_INFORMATION.LOGO, rel: 'prefetch', as: 'image'});
// TOP_NAVBAR_CONTENT.LOGO
//   && TOP_NAVBAR_CONTENT.LOGO !== COMPANY_INFORMATION.LOGO
//   && addLink({href: TOP_NAVBAR_CONTENT.LOGO, rel: 'prefetch', as: 'image'});
// for (let i = 0, data = COMPANY_INFORMATION.SOCIALS || [], l = data.length, d, src; i !== l; ++i) {
//   d = data[i];
//   src = d.src || d.icon || `https://crossroads-lab.github.io/Design-System/icons/socials/${(d.value || d.name || d.title || '').toLowerCase()}-light.svg`;
//   src && addLink({href: src, rel: 'prefetch', as: 'image'});
// }
// for (let i = 0, data = FRONT_PAGE_SLIDE_SHOW_CONTENT || [], l = data.length, d, src; i !== l; ++i) {
//   d = data[i];
//   src = d.src || (d.background && `assets/backgrounds/${d.background}`);
//   src && addLink({href: src, rel: 'prefetch', as: 'image'});
// }
// for (let i = 0, data = PARTNERS || [], l = data.length, d, src; i !== l; ++i) {
//   d = data[i];
//   src = d.src || d.logo;
//   src && addLink({href: src, rel: 'prefetch', as: 'image'});
// }

// Add stuctured data.

// Remove script node.
removeScriptNode(import.meta.url);