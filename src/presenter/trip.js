import SortView from "../view/sort.js";
import PointsListView from "../view/points-list.js";
import NoPointView from "../view/no-point.js";

import PointPresenter from "./point.js"

// import {sortPointsByDay} from "./utils/point.js";
import {render, RenderPosition} from "../utils/render.js";

import {SORT_TYPES} from "../const.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;

    this._sortComponent = new SortView(SORT_TYPES);
    this._pointsListComponent = new PointsListView();
    this._noPointComponent = new NoPointView();
  }

  init(tripPoints, tripOffers) {
    this._tripPoints = tripPoints.slice();
    this._tripOffers = new Map(tripOffers);
    this._renderTrip();
  }
  
  _renderNoPoints() {
    render(this._tripContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent);
  }

  _renderPointsList() {
    render(this._tripContainer, this._pointsListComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent);
    pointPresenter.init(point, this._tripOffers);
  }

  _renderPoints() {
    this._tripPoints
      .forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _renderTrip() {
    if (this._tripPoints.length === 0) {
      this._renderNoPoints();
      return;
    }
    this._renderSort();
    this._renderPointsList();
    this._renderPoints();
  }

}