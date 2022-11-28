import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import {OPTIONS_COUNT} from '../const.js';
import {DESCRIPTIONS} from '../const.js';
import {TYPES} from '../const.js';
import {DESTINATIONS, OFFERS_TEMPLATES} from '../const.js';

import {getRandomInteger} from '../utils/common.js';

const generateDescription = () => {
  const maxDescriptionLength = 5;
  const randomCount = getRandomInteger(0, maxDescriptionLength);
  let description = '';

  for(let i = 0; i < randomCount; i++){
    description += DESCRIPTIONS[getRandomInteger(0, DESCRIPTIONS.length - 1)];
  };

  return description;
};

const generateDates = () => {
  const maxDaysGap = 7;
  const maxDurationMinutes = 300;
  const minDurationMinutes = 20;
  const maxMinutesShift = 24 * 60;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const randomTimeShift = getRandomInteger(0, maxMinutesShift);
  const duration = getRandomInteger(minDurationMinutes, maxDurationMinutes);
  let start = dayjs().add(daysGap, 'day').add(randomTimeShift, 'minute');
  let end = start.add(duration, 'minute');
  start = start.toDate();
  end = end.toDate();
  
  return {
    start,
    end
  }
};

const generateType = () => {
  const randomIndex = getRandomInteger(0, TYPES.length-1);
  
  return TYPES[randomIndex];
};

const generateDestination = () => {
  const randomIndex = getRandomInteger(0, DESTINATIONS.length-1);

  return DESTINATIONS[randomIndex];
};

const generateOptions = (type, offersDict) => {
  const randomCount = getRandomInteger(0, offersDict.get(type).length - 1);
  let options = new Set();

  for(let i = 0; i < randomCount; i++){
    let optionID = getRandomInteger(0, offersDict.get(type).length-1);
    options.add(optionID);
  };

  return options;
};

const generatePhotos = () => {
  const maxPhotosCount = 5;
  const randomCount = getRandomInteger(0, maxPhotosCount);
  let photos = [];

  for(let i = 0; i < randomCount; i++){
    const photo = `https://loremflickr.com/248/152/architecture?random=${Math.random()}`;
    photos.push(photo);
  };

  return photos;
}

const generateFavorite = () => {
  return Boolean(getRandomInteger(0, 1));
};

export const generateOffersDict = () => {
  const offersDict = new Map();
  for (let type of TYPES) {
    const randomCount = getRandomInteger(0, OPTIONS_COUNT);
    let offersBuf = [];
    for(let i = 0; i < randomCount; i++){
      offersBuf.push(OFFERS_TEMPLATES[getRandomInteger(0, OFFERS_TEMPLATES.length - 1)]);
    };
    offersDict.set(type, offersBuf)
  }
  return offersDict;
}

export const generateDestinationsDict = () => {
  const destinationsDict = {};
  for (let destination of DESTINATIONS) {
    destinationsDict[destination] = {description: generateDescription(), photos: generatePhotos()};
  }
  return destinationsDict;
}

export const generatePoint = (offersDict, destinationsDict) => {
  const {start, end} = generateDates();
  const type = generateType();
  const destination = generateDestination();
  return {
    id: nanoid(),
    type: type,
    destination: destination,
    startDate: start,
    endDate: end,
    description: destinationsDict[destination].description,
    photos: destinationsDict[destination].photos,
    isFavorite: generateFavorite(),
    options: generateOptions(type, offersDict),
    price: getRandomInteger(10, 200)
  };
};
