import head from './head.mjs';

// Create head node if needed.
export const style = (head.getElementsByTagName() || [])[0]
  || (head.appendChild(document.createElement('style')));
export default style;