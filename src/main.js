import {createTripInfoTemplate} from "./view/trip-info.js";
import {createTripCostTemplate} from "./view/trip-cost.js";
import {createMainMenuTemplate} from "./view/main-menu.js";
import {createFilterTemplate} from "./view/filter.js";
import {createSortTemplate} from "./view/sort.js";
import {createEditPointTemplate} from "./view/edit-point.js";
import {createPointTemplate, createPointsListTemplate} from "./view/point.js";

import {generatePoint} from "./mock/point.js";
import {generateOffersDict} from "./mock/point.js";
import {generateFilter} from './mock/filter.js';

import {sortPointsByDay} from "./utils.js";

import {SORT_TYPES} from "./const.js";
import {MENU_TABS} from "./const.js";

const POINT_COUNT = 15;

const offers = generateOffersDict();
const points = new Array(POINT_COUNT).fill().map(() => generatePoint(offers));
sortPointsByDay(points);
const filters = generateFilter(points);


const render = (container, template, place) => {
    container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector('.page-header');
const siteMainElement = document.querySelector('.page-main');

const tripInfoElement = siteHeaderElement.querySelector('.trip-main');
const navigationElement = siteHeaderElement.querySelector('.trip-controls__navigation');
const filterElement = siteHeaderElement.querySelector('.trip-controls__filters');
const tripEventsElement = siteMainElement.querySelector('.trip-events');

render(tripInfoElement, createTripInfoTemplate(points), 'afterbegin');
const routeInfoElement = tripInfoElement.querySelector('.trip-main__trip-info');
render(routeInfoElement, createTripCostTemplate(points, offers), 'beforeend');

render(navigationElement, createMainMenuTemplate(MENU_TABS), 'beforeend');

render(filterElement, createFilterTemplate(filters), 'beforeend');

render(tripEventsElement, createSortTemplate(SORT_TYPES), 'beforeend');
render(tripEventsElement, createPointsListTemplate(), 'beforeend');
const tripListElement = tripEventsElement.querySelector('.trip-events__list');

render(tripListElement, createEditPointTemplate(points[0], offers), 'beforeend');
for(let i=1; i < POINT_COUNT; i++){
    render(tripListElement, createPointTemplate(points[i], offers), 'beforeend');
}