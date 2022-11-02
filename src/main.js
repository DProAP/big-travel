import TripInfoView from "./view/trip-info.js";
import TripCostView from "./view/trip-cost.js";
import MainMenuView from "./view/main-menu.js";
import FilterView from "./view/filter.js";
import SortView from "./view/sort.js";
import PointEditorView from "./view/point-editor.js";
import PointView from "./view/point.js";
import PointsListView from "./view/points-list.js";
import NoPointView from "./view/no-point.js";
import {generatePoint, generateOffersDict} from "./mock/point.js";
import {generateFilter} from './mock/filter.js';
import {sortPointsByDay} from "./utils/point.js";
import {render, RenderPosition, replace} from "./utils/render.js";
import {isEscKey} from "./utils/common.js";
import {SORT_TYPES, MENU_TABS} from "./const.js";

const POINT_COUNT = 15;

const offers = generateOffersDict();
const points = new Array(POINT_COUNT).fill().map(() => generatePoint(offers));
sortPointsByDay(points);
const filters = generateFilter(points);

const tripInfoElement = document.querySelector('.trip-main');
const navigationElement = document.querySelector('.trip-controls__navigation');
const filterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const renderPoint = (pointsListElement, point, offers) => {
    const pointComponent = new PointView(point, offers);
    const pointEditComponent = new PointEditorView(point, offers);

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

    render(pointsListElement, pointComponent);
  };
  
  const renderTrip = (tripContainer, tripPoints, tripOffers) => {
      if (tripPoints.length === 0) {
          render(tripContainer, new NoPointView());
          return;
      }
          render(tripContainer, new SortView(SORT_TYPES));
      
          const tripListComponent = new PointsListView();
          render(tripContainer, tripListComponent);
      
          for(const point of tripPoints){
            renderPoint(tripListComponent.getElement(), point, tripOffers);
          }
  }

const routeInfoComponent = new TripInfoView(points);
render(tripInfoElement, routeInfoComponent, RenderPosition.AFTERBEGIN);
render(routeInfoComponent, new TripCostView(points, offers));
render(navigationElement, new MainMenuView(MENU_TABS));
render(filterElement, new FilterView(filters));

renderTrip(tripEventsElement, points, offers);