import SortView from "../view/sort.js";
import PointsListView from "../view/points-list.js";
import NoPointView from "../view/no-point.js";

import PointPresenter from "./point.js"

import {sortPointsByDay, sortPointsByTime, sortPointsByPrice} from "../utils/point.js";
import {render, RenderPosition} from "../utils/render.js";
import {updateItem} from "../utils/common.js";
import {SORT_TYPES} from "../const.js";

export default class Trip {
  constructor(tripContainer) {
    this._tripContainer = tripContainer;
    this._pointPresenter = {};
    this._currentSortType = SORT_TYPES.DAY;

    this._sortComponent = new SortView();
    this._pointsListComponent = new PointsListView();
    this._noPointComponent = new NoPointView();

    this._handlePointChange = this._handlePointChange.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(tripPoints, tripOffers, tripDestinations) {
    this._tripPoints = tripPoints.slice();
    this._tripOffers = new Map(tripOffers);
    this._tripDestinations = Object.assign({}, tripDestinations);
    this._renderTrip();
  }
  
  _handleModeChange() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _handlePointChange(updatedPoint) {
    this._tripPoints = updateItem(this._tripPoints, updatedPoint);
    this._pointPresenter[updatedPoint.id].init(updatedPoint, this._tripOffers);
    console.log(this._tripPoints);
  }

  _sortPoints(sortType) {
    switch (sortType){
      case SORT_TYPES.DAY:
        this._tripPoints.sort(sortPointsByDay);
        break;
      case SORT_TYPES.TIME:
        this._tripPoints.sort(sortPointsByTime);
        break;
      case SORT_TYPES.PRICE:
        this._tripPoints.sort(sortPointsByPrice);
        break;
      default:
        throw new Error(`Unknown sort type.`);
    }
    this._currentSortType = sortType;
  }

  _renderNoPoints() {
    render(this._tripContainer, this._noPointComponent, RenderPosition.BEFOREEND);
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._sortPoints(sortType);
    this._clearPointsList();
    this._renderPoints();
  }

  _renderSort() {
    render(this._tripContainer, this._sortComponent);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _renderPointsList() {
    render(this._tripContainer, this._pointsListComponent);
  }

  _renderPoint(point) {
    const pointPresenter = new PointPresenter(this._pointsListComponent, this._handlePointChange, this._handleModeChange);
    pointPresenter.init(point, this._tripOffers, this._tripDestinations);
    this._pointPresenter[point.id] = pointPresenter;
  }

  _renderPoints() {
    this._tripPoints
      .forEach((tripPoint) => this._renderPoint(tripPoint));
  }

  _clearPointsList() {
    Object
      .values(this._pointPresenter)
      .forEach((presenter) => presenter.destroy());
    this._pointPresenter = {};
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