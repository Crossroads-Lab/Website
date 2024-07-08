import PARTNERS from '../data/partnerData.mjs';

// Extend generic HTMLElement interface.
export class PartnerList extends HTMLElement {
  // Constructor.
  constructor() {
    super();
  }

  connectedCallback() {
    let innerHTML = '', partners = PARTNERS || [];
    for (let i = 0, l = partners.length; i !== l; ++i) {
      innerHTML+= `<partner-info ${Object.entries(team[i]).map(([k, v]) => `${k}="${v}"`).join(' ')}></partner-info>`
    }
    this.innerHTML = (this.innerHTML || '') + innerHTML;
  }
}

// Default export.
export default PartnerList;

// Register component.
customElements.define('partner-list', PartnerList);