import TEAM from '../data/teamData.mjs';

// Extend generic HTMLElement interface.
export class TeamMembers extends HTMLElement {
  // Constructor.
  constructor() {
    super();
  }

  connectedCallback() {
    let innerHTML = '', team = TEAM || [];
    for (let i = 0, l = team.length; i !== l; ++i) {
      innerHTML+= `<team-member ${Object.entries(team[i]).map(([k, v]) => `${k}="${v}"`).join(' ')}></team-member>`
    }
    this.innerHTML = (this.innerHTML || '') + innerHTML;
  }
}

// Default export.
export default TeamMembers;

// Register component.
customElements.define('team-members', TeamMembers);