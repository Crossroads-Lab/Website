// Imports.
import head from './head.mjs';

// Helper function to set the meta tags in the document head.
export const setMetas = ({
  companyName,
  COMPANY_NAME = companyName,
  name = COMPANY_NAME,
  NAME = name,
  title = NAME,
  companyDescription,
  COMPANY_DESCRIPTION = companyDescription,
  description = COMPANY_DESCRIPTION,
  DESCRIPTION = description,
  content = DESCRIPTION,
  companyLogo,
  COMPANY_LOGO = companyLogo,
  companyImage = COMPANY_LOGO,
  COMPANY_IMAGE = companyImage,
  logo = COMPANY_IMAGE,
  LOGO = logo,
  image = LOGO,
  IMAGE = image,
  img = IMAGE,
  charset = 'utf-8',
  viewport = 'width=device-width, initial-scale=1, minimum-scale=1, maximum-scale=1, viewport-fit=cover, user-scalable=no'
} = {}) => {
  // Set title.
  title && (
    head.appendChild(document.createComment('TITLE')),
    (head.title || head.appendChild(document.createElement('title'))).innerHTML = title
  );
  
  // Set basic meta.
  let meta;
  (charset || viewport || title || content || img) && (
    head.appendChild(document.createComment('METATAGS'))
  );
  
  // Set charset.
  charset && (
    meta = head.appendChild(document.createElement('meta')),
    meta.setAttribute('charset', charset)
  );

  // Set viewport.
  viewport && (
    meta = head.appendChild(document.createElement('meta')),
    meta.setAttribute('name', 'viewport'),
    meta.setAttribute('content', viewport)
  );

  // SEO | Open Graph metatags.
  title && (
    meta = head.appendChild(document.createElement('meta')),
    meta.setAttribute('property', 'og:title'),
    meta.setAttribute('content', title)
  );

  content && (
    meta = head.appendChild(document.createElement('meta')),
    meta.setAttribute('property', 'og:description'),
    meta.setAttribute('content', content)
  );

  img && (
    meta = head.appendChild(document.createElement('meta')),
    meta.setAttribute('property', 'og:image'),
    meta.setAttribute('content', img)
  );
  
}

// Default exports.
export default setMetas;