import PointEditorView from "../view/point-editor.js";
import PointView from "../view/point.js";
import {render, RenderPosition, replace} from "../utils/render.js";
import {isEscKey} from "../utils/common.js";

export default class Point {
  constructor(pointsListContainer) {
    this._pointsListContainer = pointsListContainer;

    this._pointComponent = null;
    this._pointEditComponent = null;

    this._escKeyDownHandler = this._escKeyDownHandler.bind(this);
    this._handleEditClick = this._handleEditClick.bind(this);
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._handleFormReset = this._handleFormReset.bind(this);
  };

  init(point, offers){
    this._point = point;
    this._tripOffers = new Map(offers);

    this._pointComponent = new PointView(point, this._tripOffers);;
    this._pointEditComponent = new PointEditorView(point, this._tripOffers);

    this._pointComponent.setEditClickHandler(this._handleEditClick);
    this._pointEditComponent.setFormSubmitHandler(this._handleFormSubmit);
    this._pointEditComponent.setFormResetHandler(this._handleFormReset);

    render(this._pointsListContainer, this._pointComponent);
  }
  
    _replaceFieldToForm() {
      replace(this._pointEditComponent, this._pointComponent, RenderPosition.BEFOREEND);
      document.addEventListener('keydown', this._escKeyDownHandler);
    }
  
    _replaceFormToField(){
      replace(this._pointComponent, this._pointEditComponent);
      document.removeEventListener('keydown', this._escKeyDownHandler);
    }
  
    _escKeyDownHandler(evt){
      if (isEscKey(evt)) {
        evt.preventDefault();
        this._replaceFormToField();
        document.removeEventListener('keydown', this._escKeyDownHandler);
      }
    }
  
    _handleEditClick(){
      this._replaceFieldToForm();
    };
  
    _handleFormSubmit(){
      this._replaceFormToField();
    };
  
    _handleFormReset(){
      this._replaceFormToField();
    };   
}