import AbstractView from './abstract.js';
import {SORT_TYPES} from "../const.js";

const sortHeaders = [
  'day',
  'event',
  'time',
  'price',
  'offers'
];

const createSortItemTemplate = (name, isChecked) => {

  return (
    `<div class="trip-sort__item  trip-sort__item--${name}">
      <input id="sort-${name}" 
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

const createSortTemplate = () => {
  const sortItemsTemplate = sortHeaders
    .map((name, index) => createSortItemTemplate(name, index === 0))
    .join('');
  return `<form class="trip-events__trip-sort  trip-sort" action="#" method="get">
  ${sortItemsTemplate}
  </form>`;
};

export default class Sort extends AbstractView{
  constructor() {
    super();
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createSortTemplate();
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== 'LABEL') {
      return;
    }

    evt.preventDefault();
    const sortHeader = evt.target.innerText;
    
    if (sortHeader in SORT_TYPES) {
      const radioButton = evt.target.previousElementSibling;
      radioButton.checked = true;
      this._callback.sortTypeChange(sortHeader);
    }
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener('click', this._sortTypeChangeHandler);
  }

}