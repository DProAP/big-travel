import {formatDate} from '../utils.js'
import {DESCRIPTIONS} from '../const.js';
import {TYPES} from '../const.js';
import {DESTINATIONS} from '../const.js';



export const createNewPointTemplate = (point = {}, offers) => {
  
  const {
    type = 'Flight', 
    destination = '', 
    startDate = Date.now(), 
    endDate = Date.now(), 
    description = '', 
    photos = [], 
    isFavorite = false, 
    options = new Set(), 
    price = 0
  } = point;
  
  const createEventTypesTemplate = () => {
    let result = '';
    for (let type of TYPES){
      result += `<div class="event__type-item">
        <input id="event-type-${type.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type.toLowerCase()}">
        <label class="event__type-label  event__type-label--${type.toLowerCase()}" for="event-type-${type.toLowerCase()}-1">${type}</label>
      </div>`
    }
    return result;
  }
  
  const createDestinationListTemplate = () => {
    let result = '';
    for (let destination of DESTINATIONS){
      result += `<option value="${destination}"></option>`
    }
    return result;
  }
  
  const createOffersTemplate = () => {
    let result = '';
    const thisTypeOffers = offers.get(type);
    
    for (let i = 0; i < thisTypeOffers.length-1; i++){
      const titleTail = thisTypeOffers[i].title.split(' ').slice(-1);
      const isChecked = options.has(i) ? 'checked' : '';
      result += `<div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${titleTail}-1" type="checkbox" name="event-offer-${titleTail}" ${isChecked}>
        <label class="event__offer-label" for="event-offer-${titleTail}-1">
          <span class="event__offer-title">${thisTypeOffers[i].title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${thisTypeOffers[i].price}</span>
        </label>
      </div>`
    }
    return result;
  }

  const isHidden = photos.length == 0 ? 'visually-hidden' : '';
  
  const createPhotosTemplate = () => {
    let result = '';
    for (let photo of photos){
      result += `<img class="event__photo" src=${photo} alt="Event photo">`
    }
    return result;
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
            ${createEventTypesTemplate()}
          </fieldset>
        </div>
      </div>

      <div class="event__field-group  event__field-group--destination">
        <label class="event__label  event__type-output" for="event-destination-1">
          ${type}
        </label>
        <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination" value="${destination}" list="destination-list-1">
        <datalist id="destination-list-1">
          ${createDestinationListTemplate()}
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
      <section class="event__section  event__section--offers">
        <h3 class="event__section-title  event__section-title--offers">Offers</h3>

        <div class="event__available-offers">
          ${createOffersTemplate()}
        </div>

      </section>

      <section class="event__section  event__section--destination">
        <h3 class="event__section-title  event__section-title--destination">Destination</h3>
        <p class="event__destination-description">${description}</p>

        <div class="event__photos-container ${isHidden}" >
          <div class="event__photos-tape">
            ${createPhotosTemplate()}
          </div>
        </div>
      </section>
    </section>
  </form>
  </li>`;
};