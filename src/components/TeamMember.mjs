// Extend generic HTMLElement interface.
export class TeamMember extends HTMLElement {
  // Constructor.
  constructor() {
    super();
  }

  connectedCallback() {
    // Create template if needed.
    this.appendChild((template || (template = createTemplate())).cloneNode(true));

    // Get attributes.
    const jobPosition = this.getAttribute('position') || this.getAttribute('title'),
      src = this.getAttribute('src') || this.getAttribute('pic') || this.getAttribute('imgSrc'),
      name = this.getAttribute('name'),
      linkedin = this.getAttribute('linkedin') || this.getAttribute('href');

    // Get nodes.
    const div = this.childNodes[0],
      h3 = this.childNodes[1],
      p = this.childNodes[2],
      a = this.childNodes[3];

    // Fill in the attributes.
    this.setAttribute('title', `${name} | ${jobPosition}`);
    div.style.backgroundImage = `url(${src})`;
    h3.innerHTML = name;
    p.innerHTML = jobPosition;
    linkedin && (
      a.setAttribute('href', linkedin), 
      a.style.backgroundImage = 'url(https://crossroads-lab.github.io/Design-System/icons/socials/linkedin-dark.svg)'
    );
  }
}

// Template.
let template;
const createTemplate = () => {
  const template = document.createDocumentFragment();

  // Content.
  template.appendChild(document.createElement('div'));
  template.appendChild(document.createElement('h3'));
  template.appendChild(document.createElement('p'));
  const a = template.appendChild(document.createElement('a'));
  a.classList.add('link');
  a.setAttribute('target', '_blank');

  // Output.
  return template;
}

// Default export.
export default TeamMember;

// Register component.
customElements.define('team-member', TeamMember);