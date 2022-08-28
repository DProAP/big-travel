import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createMainMenuTemplate} from "./view/main-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createTripBoardTemplate} from "./view/trip-board.js";
import {createNewPointTemplate} from "./view/new-point.js";
import {createEditPointTemplate} from "./view/edit-point.js";
import {createPointTemplate} from "./view/point.js";


const POINT_COUNT = 3;

const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripInfoElement = siteHeaderElement.querySelector('.trip-main');
const navigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(tripInfoElement, createTripInfoTemplate(), 'afterbegin');
const routeInfoElement = tripInfoElement.querySelector('.trip-main__trip-info');
render(routeInfoElement, createTripCostTemplate(), 'beforeend');

render(navigationElement, createMainMenuTemplate(), 'beforeend');

render(filterElement, createFilterTemplate(), 'beforeend');

render(tripEventsElement, createTripBoardTemplate(), 'beforeend');

const tripListElement = tripEventsElement.querySelector('.trip-events__list');
render(tripListElement, createEditPointTemplate(), 'beforeend');
for(let i=0; i < POINT_COUNT; i++){
    render(tripListElement, createPointTemplate(), 'beforeend');
}
render(tripListElement, createNewPointTemplate(), 'beforeend');