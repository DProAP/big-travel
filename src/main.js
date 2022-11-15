import TripInfoView from "./view/trip-info.js";
import TripCostView from "./view/trip-cost.js";
import MainMenuView from "./view/main-menu.js";
import FilterView from "./view/filter.js";

import {generatePoint, generateOffersDict} from "./mock/point.js";
import {generateFilter} from './mock/filter.js';
import {sortPointsByDay} from "./utils/point.js";
import {render, RenderPosition, replace} from "./utils/render.js";
import {isEscKey} from "./utils/common.js";
import {SORT_TYPES, MENU_TABS} from "./const.js";

import TripPresenter from './presenter/trip.js'

const POINT_COUNT = 15;

const offers = generateOffersDict();
const points = new Array(POINT_COUNT).fill().map(() => generatePoint(offers));
points.sort(sortPointsByDay);
const filters = generateFilter(points);

const tripInfoElement = document.querySelector('.trip-main');
const navigationElement = document.querySelector('.trip-controls__navigation');
const filterElement = document.querySelector('.trip-controls__filters');
const tripEventsElement = document.querySelector('.trip-events');

const tripPresenter = new TripPresenter(tripEventsElement);

const routeInfoComponent = new TripInfoView(points);
render(tripInfoElement, routeInfoComponent, RenderPosition.AFTERBEGIN);
render(routeInfoComponent, new TripCostView(points, offers));
render(navigationElement, new MainMenuView(MENU_TABS));
render(filterElement, new FilterView(filters));

tripPresenter.init(points, offers);