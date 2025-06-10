import { POLISH_MONTHS } from './constants';

export function getRandomDate(minYear, maxYear) {
  const year = Math.floor(Math.random() * (maxYear - minYear + 1)) + minYear;
  const month = Math.floor(Math.random() * 12) + 1;

  let maxDays;
  const pushDiff = (POLISH_MONTHS[month + 1]?.push || 0) - POLISH_MONTHS[month].push;

  if (Math.abs(pushDiff) === 3) maxDays = 31;
  else if (Math.abs(pushDiff) === 2) maxDays = 30;
  else if (year % 4 !== 0) maxDays = 28;
  else maxDays = 29;

  const day = Math.floor(Math.random() * maxDays) + 1;

  return { year, month, day };
}

export function getDayOfWeek({ day, month, year }) {
  let pushDayYear = year + Math.floor(year / 4);
  if (year % 4 === 0 && (month === 1 || month === 2)) {
    pushDayYear--;
  }
  return (day + POLISH_MONTHS[month].push + pushDayYear + 6) % 7;
}


