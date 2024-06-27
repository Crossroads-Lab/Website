// Imports.
import { COMPANY_INFORMATION, LINKS } from '../data/index.mjs';
import setLinks from './setLinks.mjs';
import setMetas from './setMetas.mjs';

// Init head.
setMetas(COMPANY_INFORMATION);
setLinks(LINKS);