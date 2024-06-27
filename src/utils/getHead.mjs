// Create head node if needed.
export const getHead = document.head || (document.appendChild(document.createElement('head')));
export default getHead;