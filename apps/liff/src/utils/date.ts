import { differenceInCalendarDays, isToday, parseISO } from 'date-fns';

export const getDateDifferenceLabel = (isoDateString: string): string => {
  const givenDate = parseISO(isoDateString);

  if (isToday(givenDate)) {
    return 'Today';
  }

  const diff = differenceInCalendarDays(givenDate, new Date());

  if (diff > 0) {
    return `In ${diff} day${diff !== 1 ? 's' : ''}`;
  } else {
    return `${Math.abs(diff)} day${Math.abs(diff) !== 1 ? 's' : ''} ago`;
  }
};
