import { Element } from '@angular/compiler';

/**
 * Checks the item is not missed or messed
 * @param {object|string[]|Element[]|HTMLElement|string} elem - element
 * @returns {boolean} true if element is correct
 * @private
 */
function _isNotMissed(
  elem: object | HTMLElement | string | string[] | Element[]
): boolean {
  return !(elem === undefined || elem === null);
}

/**
 * Create DOM element with set parameters
 * @param {string} tagName - Html tag of the element to be created
 * @param {string[]} cssClasses - Css classes that must be applied to an element
 * @param {object} attrs - Attributes that must be applied to the element
 * @param {Element[]} children - child elements of creating element
 * @returns {HTMLElement} the new element
 */

export function create(
  tagName: string,
  cssClasses: string[],
  attrs: Record<string, string | boolean> = {},
  children: (HTMLElement | Text)[] = []
) {
  const elem = document.createElement(tagName);

  if (_isNotMissed(cssClasses)) {
    for (let i = 0; i < cssClasses.length; i++) {
      if (_isNotMissed(cssClasses[i])) {
        elem.classList.add(cssClasses[i]);
      }
    }
  }
  if (_isNotMissed(attrs)) {
    for (const key in attrs) {
      elem.setAttribute(key, String(attrs[key]));
    }
  }
  if (_isNotMissed(children)) {
    for (let i = 0; i < children.length; i++) {
      if (_isNotMissed(children[i])) {
        elem.appendChild(children[i]);
      }
    }
  }
  return elem;
}
