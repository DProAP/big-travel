import AbstractView from './abstract.js';
import {formatDate, createRepitedTemplate} from '../utils/point.js';
import {TYPES, DESTINATIONS} from '../const.js';

const EMPTY_POINT = {
  type: 'Flight', 
  destination: '', 
  startDate: Date.now(), 
  endDate: Date.now(), 
  description: '', 
  photos: [], 
  isFavorite: false, 
  options: new Set(), 
  price: 0
}

const createPointEditorTemplate = (point, offers) => {
  
  const {type, destination, startDate, endDate, description, photos, options, price} = point;
  
  const thisTypeOffers = offers.get(type);
  const isEmptyPhotos = photos.length == 0 ? 'visually-hidden' : '';
  const isEmptyDestination = description == '' ? 'visually-hidden' : '';
  const isEmptyOffers = thisTypeOffers.length == 0 ? 'visually-hidden' : '';
  
  const createEventTypesItemTemplate = (type, index, currentType) => {
    return ( 
      `<div class="event__type-item">
        <input 
          id="event-type-${type.toLowerCase()}-1" 
          class="event__type-input  visually-hidden" 
          type="radio" name="event-type" 
          value="${type.toLowerCase()}"
          ${type === currentType ? 'checked' : ''}>
        <label 
          class="event__type-label  event__type-label--${type.toLowerCase()}" 
          for="event-type-${type.toLowerCase()}-1">
          ${type}
        </label>
      </div>`
    )
  }  
  
  const createDestinationListItemTemplate = (destination) => {
    return`<option value="${destination}"></option>`;
  }
  
  const createOffersItemTemplate = (offer, i, options) => {
      const titleTail = offer.title.split(' ').slice(-1);
      const isChecked = options.has(i) ? 'checked' : '';
      return `<div class="event__offer-selector">
        <input 
          class="event__offer-checkbox  visually-hidden" 
          id="event-offer-${titleTail}-1" 
          type="checkbox" 
          name="event-offer-${titleTail}" 
          ${isChecked}>
        <label 
          class="event__offer-label" 
          for="event-offer-${titleTail}-1">
            <span class="event__offer-title">${offer.title}</span>
            &plus;&euro;&nbsp;
            <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`
  }
  
  const createPhotosItemTemplate = (photo) => {
    return `<img class="event__photo" src=${photo} alt="Event photo">`;
  }

  return `<li class="trip-events__item">
  <form class="event event--edit" action="#" method="post">
    <header class="event__header">
      <div class="event__type-wrapper">
        <label class="event__type  event__type-btn" for="event-type-toggle-1">
          <span class="visually-hidden">Choose event type</span>
          <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
        </label>
        <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

        <div class="event__type-list">
          <fieldset class="event__type-group">
            <legend class="visually-hidden">Event type</legend>
            ${createRepitedTemplate(TYPES, createEventTypesItemTemplate, type)}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createRepitedTemplate(DESTINATIONS, createDestinationListItemTemplate)}
        </datalist>
      </div>

      <div class="event__field-group  event__field-group--time">
        <label class="visually-hidden" for="event-start-time-1">From</label>
        <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time" value="${formatDate(startDate, 'DD/MM/YY HH:mm')}">
        &mdash;
        <label class="visually-hidden" for="event-end-time-1">To</label>
        <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time" value="${formatDate(endDate, 'DD/MM/YY HH:mm')}">
      </div>

      <div class="event__field-group  event__field-group--price">
        <label class="event__label" for="event-price-1">
          <span class="visually-hidden">Price</span>
          &euro;
        </label>
        <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${price}">
      </div>

      <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
      <button class="event__reset-btn" type="reset">Cancel</button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers ${isEmptyOffers}">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createRepitedTemplate(thisTypeOffers, createOffersItemTemplate, options)}
        </div>

      </section>

      <section class="event__section  event__section--destination ${isEmptyDestination}">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container ${isEmptyPhotos}" >
          <div class="event__photos-tape">
            ${createRepitedTemplate(photos, createPhotosItemTemplate)}
          </div>
        </div>
      </section>
    </section>
  </form>
  </li>`;
};

export default class PointEditor extends AbstractView{
  constructor(point = EMPTY_POINT, offers) {
    super();
    this._point = point;
    this._offers = offers;
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._formResetHandler = this._formResetHandler.bind(this);
  }

  getTemplate() {
    return createPointEditorTemplate(this._point, this._offers);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(this._point);
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _formResetHandler(evt) {
    evt.preventDefault();
    this._callback.formReset();
  }

  setFormResetHandler(callback) {
    this._callback.formReset = callback;
    this.getElement().querySelector('form').addEventListener('reset', this._formResetHandler);
  }

}