import SortView from "../view/sort.js";
import PointEditorView from "../view/point-editor.js";
import PointView from "../view/point.js";
import PointsListView from "../view/points-list.js";
import NoPointView from "../view/no-point.js";
// import {sortPointsByDay} from "./utils/point.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import {isEscKey} from "../utils/common.js";
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
    const pointComponent = new PointView(point, this._tripOffers);
    const pointEditComponent = new PointEditorView(point, this._tripOffers);
  
    const replaceFieldToForm = () => {
      replace(pointEditComponent, pointComponent);
    }
  
    const replaceFormToField = () => {
      replace(pointComponent, pointEditComponent);
    }
  
    const onEscKeyDown = (evt) => {
      if (isEscKey(evt)) {
        evt.preventDefault();
        replaceFormToField();
        document.removeEventListener('keydown', onEscKeyDown);
      }
    }
  
    pointComponent.setEditClickHandler(() => {
      replaceFieldToForm();
      document.addEventListener('keydown', onEscKeyDown);
    });
  
    pointEditComponent.setFormSubmitHandler(() => {
      replaceFormToField();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  
    pointEditComponent.setFormResetHandler(() => {
      replaceFormToField();
      document.removeEventListener('keydown', onEscKeyDown);
    });
  
    render(this._pointsListComponent, pointComponent);
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