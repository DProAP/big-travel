import dayjs from 'dayjs';

const OPTIONS_COUNT = 5;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const descriptions = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
  'Cras aliquet varius magna, non porta ligula feugiat eget.',
  'Fusce tristique felis at fermentum pharetra.',
  'Aliquam id orci ut lectus varius viverra.',
  'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
  'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
  'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
  'Sed sed nisi sed augue convallis suscipit in sed felis.',
  'Aliquam erat volutpat.',
  'Nunc fermentum tortor ac porta dapibus.',
  'In rutrum ac purus sit amet tempus.',
];

const generateDescription = () => {
  const maxDescriptionLength = 5;
  const randomCount = getRandomInteger(1, maxDescriptionLength);

  let description = '';

  for(let i = 0; i < randomCount; i++){
    description += descriptions[getRandomInteger(0, descriptions.length - 1)];
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

const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeng', 'Restaurant'];
const generateType = () => {
  const randomIndex = getRandomInteger(0, types.length-1);

  return types[randomIndex];
};

const destinations = ['Moskow', 'Omsk', 'St. Petersburg', 'Dombay', 'Surgut', 'Anadyr'];
const generateDestination = () => {
  const randomIndex = getRandomInteger(0, destinations.length-1);

  return destinations[randomIndex];
};

const offersTemplates = [
    {title: 'Order Uber', price: 20},
    {title: 'Upgrade to a business', price:  120},
    {title: 'Choose the radio station', price:  60},
    {title: 'Rent a car', price: 200},
    {title: 'Add luggage', price: 50},
    {title: 'Switch to comfort', price:  80},
    {title: 'Add meal', price:  15},
    {title: 'Choose seats', price:  5},
    {title: 'Travel by train', price:  40},
    {title: 'Add breakfast', price: 50},
    {title: 'Book tickets', price:  40},
]

const offersDict = new Map();
const maxOffersCount = 5;
for (let type of types) {
  const randomCount = getRandomInteger(0, maxOffersCount);
  let offersBuf = [];
  for(let i = 0; i < randomCount; i++){
    offersBuf.push(offersTemplates[getRandomInteger(0, offersTemplates.length - 1)]);
  };
  offersDict.set(type, offersBuf)
}


const generateOptions = (type) => {

  const randomCount = getRandomInteger(0, offersDict.get(type).length - 1);

  let options = [];

  for(let i = 0; i < randomCount; i++){
    let optionID = getRandomInteger(0, offersDict.get(type).length-1);
    options.push(optionID);
  };

  return options;
};

const generatePhotos = () => {
  const maxPhotosCount = 5;
  const randomCount = getRandomInteger(1, maxPhotosCount);

  let photos = [];

  for(let i = 0; i < randomCount; i++){
    const photo = `http://picsum.photos/248/152?r=${Math.random()}`
    photos.push(photo);
  };

  return photos;
}

const generateFavorite = () => {
  return Boolean(getRandomInteger(0, 1));
};


export const generatePoint = () => {
  const {start, end} = generateDates();
  const type = generateType();
  return {
    type: type,
    destination: generateDestination(),
    startDate: start,
    endDate: end,
    description: generateDescription(),
    photos: generatePhotos(),
    isFavorite: generateFavorite(),
    options: generateOptions(type),
  };
};
