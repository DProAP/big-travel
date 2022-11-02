import AbstractView from './abstract.js';
import {formatDuration, formatDate} from '../utils.js';

const createPointTemplate = (point, offers) => {
  const {type, destination, startDate, endDate, isFavorite, options, price} = point;

  const createCheckedOffersItemTemplate = (offer) => {
    return (
      `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`
    )
  }

  const createCheckedOffersTemplate = (offers, options) => {
    const checkedOffersTemplate = Array.from(options.values())
      .map((index) => createCheckedOffersItemTemplate(offers.get(type)[index]))
      .join('');

    return checkedOffersTemplate;
  }
  
  const duration = formatDuration(endDate - startDate);
  const favoriteClass = isFavorite ? 'event__favorite-btn--active' : '';

  return `<li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${formatDate(startDate, 'YYYY-MM-DD')}">${formatDate(startDate, 'MMM D')}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${type}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${type} ${destination}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${formatDate(startDate, 'YYYY-MM-DDTHH:mm')}">${formatDate(startDate, 'HH:mm')}</time>
          &mdash;
          <time class="event__end-time" datetime="${formatDate(endDate, 'YYYY-MM-DDTHH:mm')}">${formatDate(endDate, 'HH:mm')}</time>
        </p>
        <p class="event__duration">${duration}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${price}</span>
      </p>
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${createCheckedOffersTemplate(offers, options)}
      </ul>
      <button class="event__favorite-btn ${favoriteClass}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>`;
};

export default class Point extends AbstractView{
  constructor(point, offers) {
    super();
    this._point = point;
    this._offers = offers;
    this._editClickHandler = this._editClickHandler.bind(this);
  }

  getTemplate() {
    return createPointTemplate(this._point, this._offers);
  }

  _editClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setEditClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector('.event__rollup-btn')
                      .addEventListener('click', this._editClickHandler);
  }

}

