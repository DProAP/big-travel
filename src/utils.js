import dayjs from 'dayjs';

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
}

export const formatDuration = (durationMS) => {
  const bufDate = new Date(durationMS);
  const MS_PER_DAY = 24*60*60*1000;

  let minutes = bufDate.getMinutes();
  let hours = bufDate.getUTCHours();
  let days = Math.round(durationMS / MS_PER_DAY);
  
  const result = (days > 0 ? ('0' + String(days) + 'D ').slice(-4) : '') +
            ((hours > 0 || days > 0) ? ('0' + String(hours) + 'H ').slice(-4) : '') + 
            ('0' + String(minutes) + 'M').slice(-3);
  return result;
}

export const formatDate = (date,formatTemplate) => {
  return dayjs(date).format(formatTemplate);
}

export const isPointFuture = (endDate) => {
  return endDate >= Date.now();
}

export const isPointPast = (startDate) => {
  return startDate <= Date.now();
}

export const createRepitedTemplate = (items, callback) => {
  const result = items
    .map((item, i) => callback(item, i))
    .join('');
  return result;
}

export const sortPointsByDay = (points) => {
  points.sort((a, b) => a.startDate - b.startDate);
}

export const sortPointsByTime = (points) => {
  points.sort((a, b) => (b.endDate - b.startDate) - (a.endDate - a.startDate));
}

export const sortPointsByPrice = (points) => {
  points.sort((a, b) => b.price - a.price);
}