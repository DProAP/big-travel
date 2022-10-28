import {createElement} from "../utils.js";

const createTripCostTemplate = (points, offers) => {
  const getTotalCost = (points, offers) => {
    let totalCost = 0;
    for (let point of points) {
      totalCost += point.price;
      for (let index of point.options){
        totalCost += offers.get(point.type)[index].price;
      }
    }
    return totalCost;
  }

  return `<p class="trip-info__cost">
      Total: &euro;&nbsp;
      <span class="trip-info__cost-value">
        ${getTotalCost(points, offers)}
      </span>
    </p>`;
};

export default class TripCost {
  constructor(points, offers) {
    this._points = points;
    this._offers = offers;
    this._element = null;
  }

  getTemplate() {
    return createTripCostTemplate(this._points, this._offers);
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