export const createMainMenuItemTemplate = (name, isChecked) => {
  return (
    `<a 
      class="trip-tabs__btn  
      ${isChecked ? 'trip-tabs__btn--active' : ''}"
      href="#">
        ${name}
      </a>`)
}

export const createMainMenuTemplate = (menyTabs) => {
  const mainMenuItemsTemplate = menyTabs
    .map((name, index) => createMainMenuItemTemplate(name, index === 0))
    .join('');
  return `<nav class="trip-controls__trip-tabs  trip-tabs">
    ${mainMenuItemsTemplate}
  </nav>`;
};