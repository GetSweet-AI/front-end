import { format, isToday, isYesterday } from 'date-fns';

export function dateUpdate(unixTimestamp) {
  // Convert Unix timestamp to a number
  const timestamp = Number(unixTimestamp);

  // Check if the conversion resulted in a valid number
  if (isNaN(timestamp)) {
    return 'Invalid timestamp';
  }

  // Convert Unix timestamp to a Date object
  const date = new Date(timestamp);

  if (isToday(date)) {
    return 'Today';
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    // Formatting the date to include seconds
    return format(date, "E, MMM d, 'at' h:mm:ss a");
  }
}
