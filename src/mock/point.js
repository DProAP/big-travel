import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const generateDescription = () => {
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

  const randomCount = getRandomInteger(1, 5);

  let description = '';

  for(let i = 0; i < randomCount; i++){
    description += descriptions[getRandomInteger(0, descriptions.length - 1)];
  };

  return description;
};

const generateDates = () => {
  const maxDaysGap = 7;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const duration = getRandomInteger(6, 576) * 5;
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
  const types = ['Taxi', 'Bus', 'Train', 'Ship', 'Transport', 'Drive', 'Flight', 'Check-in', 'Sightseeng', 'Restaurant'];
  const randomIndex = getRandomInteger(0, types.length-1);

  return types[randomIndex];
};

const generateDestination = () => {
  const destinations = ['Moskow', 'Omsk', 'St. Petersburg', 'Dombay', 'Surgut', 'Anadyr'];
  const randomIndex = getRandomInteger(0, destinations.length-1);

  return destinations[randomIndex];
};

const generateOptions = (type) => {

  const offers = new Map([
    ['Taxi', [
      {title: 'Order Uber', price: 20},
      {title: 'Upgrade to a business class', price:  120},
      {title: 'Choose the radio station', price:  60},
      ]],
    ['Bus', []],
    ['Train', []],
    ['Ship', []],
    ['Transport', []],
    ['Drive', [
        {title: 'Rent a car', price: 200}
     ]],
    ['Flight', [
        {title: 'Add luggage', price: 50},
        {title: 'Switch to comfort class', price:  80},
        {title: 'Add meal', price:  15},
        {title: 'Choose seats', price:  5},
        {title: 'Travel by train', price:  40}
      ]],
    ['Check-in', [
        {title: 'Add breakfast', price: 50}
      ]],
    ['Sightseeng', [
        {title: 'Book tickets', price:  40},
        {title: 'Lunch in city', price:  30}
      ]],
    ['Restaurant', [
      {title: 'Leave a tip', price:  20}
    ]],
  ])

  const randomCount = getRandomInteger(0, offers.get(type).length || 0);

  let options = [];

  for(let i = 0; i < randomCount; i++){
    const option = {
      title: offers[getRandomInteger(0, options.length - 1)],
      price: getRandomInteger(1, 10) * 5 
    }
    options.push(option);
  };

  return options;
};

const generatePhotos = () => {
  const randomCount = getRandomInteger(1, 5);

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
  return {
    type: generateType(),
    destination: generateDestination(),
    startDate: start,
    endDate: end,
    description: generateDescription(),
    photos: generatePhotos(),
    isFavorite: generateFavorite(),
    options: generateOptions(),
  };
};
