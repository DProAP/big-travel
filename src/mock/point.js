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
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const duration = getRandomInteger(minDurationMinutes, maxDurationMinutes);
  let start = dayjs().add(daysGap, 'day');
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
  const randomCount = getRandomInteger(1, offersDict.get(type).length - 1);
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
    const randomCount = getRandomInteger(1, OPTIONS_COUNT);
    let offersBuf = [];
    for(let i = 0; i < randomCount; i++){
      offersBuf.push(OFFERS_TEMPLATES[getRandomInteger(0, OFFERS_TEMPLATES.length - 1)]);
    };
    offersDict.set(type, offersBuf)
  }
  return offersDict;
}

export const generatePoint = (offersDict) => {
  const {start, end} = generateDates();
  const type = generateType();
  return {
    id: nanoid(),
    type: type,
    destination: generateDestination(),
    startDate: start,
    endDate: end,
    description: generateDescription(),
    photos: generatePhotos(),
    isFavorite: generateFavorite(),
    options: generateOptions(type, offersDict),
    price: getRandomInteger(10, 200)
  };
};
