import {isPointFuture, isPointPast} from '../utils.js';

const pointToFilterMap = {
  everything: (points) => points.length,
  future: (points) => points.filter((point) => isPointFuture(point.endDate)).length,
  past: (points) => points.filter((point) => isPointPast(point.startDate)).length
};

export const generateFilter = (points) => {
  return Object.entries(pointToFilterMap).map(([filterName, countPoints]) => {
    return {
      name: filterName,
      count: countPoints(points),
    };
  });
};