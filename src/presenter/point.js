import PointEditorView from "../view/point-editor.js";
import PointView from "../view/point.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";
import {isEscKey} from "../utils/common.js";

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class Point {
  constructor(pointsListContainer, changeData, changeMode) {
    this._pointsListContainer = pointsListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;

    this._pointComponent = null;
    this._pointEditComponent = null;
    this._mode = Mode.DEFAULT;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleRollupButtonClick = this._handleRollupButtonClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
  };

  init(point, tripOffers, tripDestinations){
    this._point = point;

    const prevPointComponent = this._pointComponent;
    const prevPointEditComponent = this._pointEditComponent;

    this._pointComponent = new PointView(point, tripOffers);
    this._pointEditComponent = new PointEditorView(point, tripOffers, tripDestinations);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointComponent.setFavoriteClickHandler(this._handleFavoriteClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setRollupButtonClickHandler(this._handleRollupButtonClick);

    if (prevPointComponent === null || prevPointEditComponent === null) {
      render(this._pointsListContainer, this._pointComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._mode === Mode.DEFAULT) {
      replace(this._pointComponent, prevPointComponent);
    } else {
      if (this._mode === Mode.EDITING) {
        replace(this._pointEditComponent, prevPointEditComponent);
      }
    }


    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  destroy(){
    remove(this._pointComponent);
    remove(this._pointEditComponent);
  }
  
  resetView() {
    if (this._mode !== Mode.DEFAULT) {
      this._replaceFormToField();
    }
  }

  _replaceFieldToForm() {
    replace(this._pointEditComponent, this._pointComponent);
    document.addEventListener('keydown', this._escKeyDownHandler);
    this._changeMode();
    this._mode = Mode.EDITING;
  }

  _replaceFormToField(){
    replace(this._pointComponent, this._pointEditComponent);
    document.removeEventListener('keydown', this._escKeyDownHandler);
    this._mode = Mode.DEFAULT;
  }

  _escKeyDownHandler(evt){
    if (isEscKey(evt)) {
      evt.preventDefault();
      this._pointEditComponent.reset(this._point);
      this._replaceFormToField();
    }
  }

  _handleEditClick(){
    this._replaceFieldToForm();
  };

  _handleFormSubmit(point){
    this._changeData(point);
    this._replaceFormToField();
  };

  _handleRollupButtonClick(){
    this._pointEditComponent.reset(this._point);
    this._replaceFormToField();
  }; 
  
  _handleFavoriteClick() {
    this._changeData(Object.assign({}, this._point, {isFavorite: !this._point.isFavorite}));
  }
}