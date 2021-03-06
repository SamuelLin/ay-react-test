// https://getridbug.com/reactjs/what-is-the-best-way-to-trigger-onchange-event-in-react-js/

const inputTypes = [window.HTMLInputElement, window.HTMLSelectElement, window.HTMLTextAreaElement];

const triggerInputChange = (node, value = '') => {
  // only process the change on elements we know have a value setter in their constructor
  if (inputTypes.indexOf(node.__proto__.constructor) > -1) {
    const setValue = Object.getOwnPropertyDescriptor(node.__proto__, 'value').set;
    const event = new Event('change', { bubbles: true });

    setValue.call(node, value);
    node.dispatchEvent(event);
  }
};

export default triggerInputChange;
