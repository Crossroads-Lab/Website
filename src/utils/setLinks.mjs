// Imports.
import head from './head.mjs';

// Helper function to set the meta tags in the document head.
export const setLinks = ({
  COMPANY_FAVICON,
  companyFavicon = COMPANY_FAVICON,
  FAVICON = companyFavicon,
  favicon = FAVICON,
  COMPANY_CSS,
  companyCss = COMPANY_CSS,
  CSS = companyCss,
  css = CSS,
  COMPANY_STYLES = css,
  companyStyles = COMPANY_STYLES,
  STYLES = companyStyles,
  styles = STYLES
}) => {
  // Set links.
  let link;

  (favicon || styles) && head.appendChild(document.createComment('LINKS'));

  favicon && (
    link = head.appendChild(document.createElement('link')),
    link.setAttribute('rel', 'shortcut icon'),
    link.setAttribute('type', 'image/x-icon'),
    link.setAttribute('href', favicon)
  );

  styles && (
    link = head.appendChild(document.createElement('link')),
    link.setAttribute('rel', 'stylesheet'),
    link.setAttribute('type', 'text/css'),
    link.setAttribute('href', styles)
  );
}

// Default export.
export default setLinks;