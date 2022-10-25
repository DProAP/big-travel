import {isDateFuture, isDatePast} from '../utils.js';

const pointToFilterMap = {
  everything: (points) => points.length,
  future: (points) => points.filter((point) => isDateFuture(point.endDate)).length,
  past: (points) => points.filter((point) => isDatePast(point.startDate)).length
};

export const generateFilter = (points) => {
  return Object.entries(pointToFilterMap).map(([filterName, countPoints]) => {
    return {
      name: filterName,
      count: countPoints(points),
    };
  });
};