import {createElement} from "../utils.js";

const createMainMenuItemTemplate = (name, isChecked) => {
  return (
    `<a 
      class="trip-tabs__btn  
      ${isChecked ? 'trip-tabs__btn--active' : ''}"
      href="#">
        ${name}
      </a>`)
}

const createMainMenuTemplate = (menyTabs) => {
  const mainMenuItemsTemplate = menyTabs
    .map((name, index) => createMainMenuItemTemplate(name, index === 0))
    .join('');
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${mainMenuItemsTemplate}
  </nav>`;
};

export default class MainMenu {
  constructor(menuTabs) {
    this._tabs = menuTabs;
    this._element = null;
  }

  getTemplate() {
    return createMainMenuTemplate(this._tabs);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}