import SmartView from './smart.js';
import {formatDate, createRepitedTemplate} from '../utils/point.js';
import {TYPES, DESTINATIONS} from '../const.js';
import flatpickr from 'flatpickr';

import '../../node_modules/flatpickr/dist/flatpickr.min.css';

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

const pointDateFormat = 'd/m/y H:i';

const createEventTypesItemTemplate = (type, ...args) => {
  const currentType = args[1];
  const typeLowCase = type.toLowerCase();
  return ( 
    `<div class="event__type-item">
      <input 
        id="event-type-${typeLowCase}-1" 
        class="event__type-input  visually-hidden" 
        type="radio" name="event-type" 
        value="${typeLowCase}"
        ${type === currentType ? 'checked' : ''}>
      <label 
        class="event__type-label  event__type-label--${typeLowCase}" 
        for="event-type-${typeLowCase}-1">
        ${type}
      </label>
    </div>`
  )
}  

const createDestinationListItemTemplate = (destination) => {
  return`<option value="${destination}"></option>`;
}

const createOffersItemTemplate = (offer, offerIndex, checkedOptions) => {
    const titleTail = offer.title.split(' ').slice(-1);
    const isChecked = checkedOptions.has(offerIndex) ? 'checked' : '';
    return `<div class="event__offer-selector">
      <input 
        class="event__offer-checkbox  visually-hidden" 
        id="event-offer-${titleTail}-1" 
        type="checkbox" 
        name="event-offer-${titleTail}" 
        ${isChecked}>
      <label 
        class="event__offer-label" 
        for="event-offer-${titleTail}-1"
        data-index="${offerIndex}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
      </label>
    </div>`
}

const createPhotosItemTemplate = (photo) => {
  return `<img class="event__photo" src=${photo} alt="Event photo">`;
}

const createPointEditorTemplate = (pointState, offers) => {
  
  const {
      type, 
      destination, 
      startDate, 
      endDate, 
      description, 
      photos, 
      options: thisPointOffers, 
      price
    } = pointState;
  
  const thisTypeOffers = offers.get(type);
  const isEmptyPhotos = photos.length == 0 ? 'visually-hidden' : '';
  const isEmptyDestination = description == '' ? 'visually-hidden' : '';
  const isEmptyOffers = thisTypeOffers.length == 0 ? 'visually-hidden' : '';
  
  const eventTypesItemTemplate = 
    createRepitedTemplate(TYPES, createEventTypesItemTemplate, type);
  const destinationListItemTemplate = 
    createRepitedTemplate(DESTINATIONS, createDestinationListItemTemplate);
  const offersItemTemplate = 
    createRepitedTemplate(thisTypeOffers, createOffersItemTemplate, thisPointOffers);
  const photosItemTemplate = 
    createRepitedTemplate(photos, createPhotosItemTemplate);
  
  const isSubmitDisabled = 
    (!DESTINATIONS.includes(destination)) 
    || (price === 0) 
    || (startDate === null) 
    || (endDate === null)
    || (startDate > endDate);

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
            ${eventTypesItemTemplate}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${destinationListItemTemplate}
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

      <button class="event__save-btn  btn  btn--blue" type="submit" ${isSubmitDisabled ? 'disabled' : ''}>Save</button>
      <button class="event__reset-btn" type="reset">Delete</button>
      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </header>
    <section class="event__details">
      <section class="event__section  event__section--offers ${isEmptyOffers}">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${offersItemTemplate}
        </div>

      </section>

      <section class="event__section  event__section--destination ${isEmptyDestination}">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container ${isEmptyPhotos}" >
          <div class="event__photos-tape">
            ${photosItemTemplate}
          </div>
        </div>
      </section>
    </section>
  </form>
  </li>`;
};

export default class PointEditor extends SmartView{
  constructor(data = EMPTY_POINT, offers, descriptions) {
    super();
    this._state = PointEditor.parseDataToState(data);
    this._offers = offers;
    this._descriptions = descriptions;
    this._startDatepicker = null;
    this._endDatepicker = null;
    
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._rollupButtonClickHandler = this._rollupButtonClickHandler.bind(this);
    this._typeChangeHandler = this._typeChangeHandler.bind(this);
    this._destinationChangeHandler = this._destinationChangeHandler.bind(this);
    this._priceChangeHandler = this._priceChangeHandler.bind(this);
    this._offersToggleHandler = this._offersToggleHandler.bind(this);
    this._startDateChangeHandler = this._startDateChangeHandler.bind(this);
    this._endDateChangeHandler = this._endDateChangeHandler.bind(this);
    
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
  }

  getTemplate() {
    return createPointEditorTemplate(this._state, this._offers);
  }

  _formSubmitHandler(evt) {
    evt.preventDefault();
    this._callback.formSubmit(PointEditor.parseStateToData(this._state));
  }

  setFormSubmitHandler(callback) {
    this._callback.formSubmit = callback;
    this.getElement().querySelector('form').addEventListener('submit', this._formSubmitHandler);
  }

  _rollupButtonClickHandler(evt) {
    evt.preventDefault();
    this._callback.formReset();
  }

  setRollupButtonClickHandler(callback) {
    this._callback.formReset = callback;
    this.getElement().querySelector('.event__rollup-btn').addEventListener('click', this._rollupButtonClickHandler);
  }

  _typeChangeHandler(evt) {
    evt.preventDefault();
    if (evt.target.tagName !== 'LABEL') {
      return;
    }
    this.updateState(
      {
        type: evt.target.innerText,
        options: new Set(),
      }
    );

  }

  _destinationChangeHandler(evt) {
    evt.preventDefault();
    const newDestination = evt.target.value
    let updatedDestination = {};
    updatedDestination = DESTINATIONS.includes(newDestination) ?
      { 
        destination: newDestination,
        description: this._descriptions[newDestination].description,
        photos: this._descriptions[newDestination].photos 
      } : { 
            destination: newDestination,
            description: '',
            photos: [] 
          }
    this.updateState(updatedDestination);
  }

  _priceChangeHandler(evt) {
    evt.preventDefault();
    this.updateState(
      {
        price: +evt.target.value
      }
    );
    console.log(this._state);
  }

  _offersToggleHandler(evt) {
    evt.preventDefault();
    const label = evt.target.closest('LABEL');
    if (!label) {
      return;
    }
    const checked = label.previousElementSibling.checked;
    const index = +label.dataset.index;
    const updatedOptions = new Set(this._state.options);
    if (checked) {
      updatedOptions.delete(index);
    } else {
      updatedOptions.add(index);
    }
    this.updateState(
      {
        options: updatedOptions
      }
    );
  }

  _startDateChangeHandler([userDate]) {
    this.updateState({
      startDate: userDate,
    }, true);
  }

  _endDateChangeHandler([userDate]) {
    this.updateState({
      endDate: userDate,
    }, true);
  }

  restoreHandlers() {
    this._setInnerHandlers();
    this._setStartDatepicker();
    this._setEndDatepicker();
    this.setFormSubmitHandler(this._callback.formSubmit);
    this.setRollupButtonClickHandler(this._callback.formReset);
  }

  _setInnerHandlers() {
    this.getElement()
      .querySelector('.event__type-list')
      .addEventListener('click', this._typeChangeHandler);
    this.getElement()
      .querySelector('#event-destination-1')
      .addEventListener('change', this._destinationChangeHandler);
    this.getElement()
      .querySelector('#event-price-1')
      .addEventListener('change', this._priceChangeHandler);
    this.getElement()
      .querySelector('.event__available-offers')
      .addEventListener('click', this._offersToggleHandler);
  }

  static parseDataToState(data) {
    return Object.assign({}, data);
  }
  
  static parseStateToData(state) {
    return Object.assign({}, state);
  }

  reset(data) {
    this.updateState(
      PointEditor.parseDataToState(data)
    );
  }

  _setStartDatepicker() {
    if (this._startDatepicker) {
      this._startDatepicker.destroy();
      this._startDatepicker = null;
    }
    this._startDatepicker = flatpickr(
      this.getElement().querySelector('#event-start-time-1'),
      {
        enableTime: true,
        dateFormat: pointDateFormat,
        defaultDate: this._state.startDate,
        onChange: this._startDateChangeHandler,
      },
    );
  }

  _setEndDatepicker() {
    if (this._endDatepicker) {
      this._endDatepicker.destroy();
      this._endDatepicker = null;
    }
    this._endDatepicker = flatpickr(
      this.getElement().querySelector('#event-end-time-1'),
      {
        enableTime: true,
        dateFormat: pointDateFormat,
        minDate: this._state.startDate,
        defaultDate: this._state.endDate,
        onChange: this._endDateChangeHandler,
      },
    );
  }

}