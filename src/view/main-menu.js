import AbstractView from './abstract.js';

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

export default class MainMenu extends AbstractView {
  constructor(menuTabs) {
    super();
    this._tabs = menuTabs;
  }

  getTemplate() {
    return createMainMenuTemplate(this._tabs);
  }
}