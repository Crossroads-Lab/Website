import COMPANY_INFORMATION from './companyInformation.mjs';

const {
  NAME,
  LEGAL_NAME,
  TITTLE,
  DESCRIPTION,
  MEETING_LINK,
  EMAIL,
  PHONE,
  FOUNDER,
  LOGO,
  IMAGE,
  CREATION_YEAR,
  URL = `${window.location.protocol}//${window.location.hostname}`
} = COMPANY_INFORMATION;

// Fill data.
const url = URL || `${window.location.protocol}//${window.location.hostname}`;
export const STRUCTURED_DATA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  url,
};

NAME && (STRUCTURED_DATA.name = NAME);
IMAGE && (STRUCTURED_DATA.image = `${url}/${IMAGE}`);
LOGO && (STRUCTURED_DATA.logo = `${url}/${LOGO}`);
(EMAIL || PHONE) && (
  STRUCTURED_DATA.contactPoint = {
    '@type': 'ContactPoint'
  },
  EMAIL && (STRUCTURED_DATA.contactPoint.email = STRUCTURED_DATA.email = EMAIL),
  PHONE && (STRUCTURED_DATA.contactPoint.telephone = STRUCTURED_DATA.telephone = PHONE)
);
DESCRIPTION && (STRUCTURED_DATA.description = DESCRIPTION);
CREATION_YEAR && (STRUCTURED_DATA.foundingDate = CREATION_YEAR);
FOUNDER && (STRUCTURED_DATA.founder = FOUNDER);
LEGAL_NAME && (STRUCTURED_DATA.legalName = LEGAL_NAME);

// Default export.
export default STRUCTURED_DATA;