import AbstractView from './abstract.js';

const createSortItemTemplate = (name, isChecked) => {

  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name} " 
        class="trip-sort__input  visually-hidden" 
        type="radio" 
        name="trip-sort" 
        value="sort-${name}"
        ${isChecked ? 'checked' : ''}>
      <label 
        class="trip-sort__btn" 
        for="sort-${name}">
          ${name}
      </label>
    </div>`
  )
}

const createSortTemplate = (sortTypes) => {
  const sortItemsTemplate = sortTypes
    .map((name, index) => createSortItemTemplate(name, index === 0))
    .join('');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sortItemsTemplate}
  </form>`;
};

export default class Sort extends AbstractView{
  constructor(sortTypes) {
    super();
    this._sortTypes = sortTypes;
  }

  getTemplate() {
    return createSortTemplate(this._sortTypes);
  }
}