import {formatDate, createElement} from "../utils";

const createTripInfoTemplate = (points) => {

  const getTripTitle = (points) => {
    const destinations = Array.from(new Set(points.map((point) => point.destination)).keys());
    let tripTitle = '';
    switch(destinations.length){
      case 0:
        break;
      case 1:
        tripTitle = destinations[0];
        break;
      case 2:
      case 3:
        tripTitle = destinations.join(' &mdash; ');
        break;
      default:
        tripTitle = destinations[0] 
                    + ' &mdash; ... &mdash; ' 
                    + destinations[destinations.length-1];
    }
    return tripTitle;
  }

  const tripDates = points.length !== 0 ? 
    formatDate(points[0].startDate, 'MMM DD')
    + '&nbsp;&mdash;&nbsp;'
    + formatDate(points[points.length-1].endDate, 'MMM DD') : '';
  
  return `<section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${getTripTitle(points)}</h1>

      <p class="trip-info__dates">
        ${tripDates}
      </p>
    </div>
  </section>`;
};

export default class TripInfo {
  constructor(points) {
    this._points = points;
    this._element = null;
  }

  getTemplate() {
    return createTripInfoTemplate(this._points);
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