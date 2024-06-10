import { format, isBefore, isAfter, isToday, addDays, isYesterday, isSameDay } from 'date-fns';

export function dateUpdate(unixTimestamp) {
  // Convert Unix timestamp to a number
  const timestamp = Number(unixTimestamp);

  // Check if the conversion resulted in a valid number
  if (isNaN(timestamp)) {
    return 'Invalid timestamp';
  }

  // Convert Unix timestamp to a Date object
  const date = new Date(timestamp);
  // Determine if the date is 'Tomorrow'
  const tomorrow = addDays(new Date(), 1);
  if (isToday(date)) {
    return 'Today';
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else if (isSameDay(date, tomorrow)) {
    return 'Tomorrow';
  } else {
    // Formatting the date to include seconds
    return format(date, "E, MMM d, 'at' h:mm:ss a");
  }
}

// Assuming current time and the state of user account connection is known
export function postStatus(unixTimestamp, isAccountConnected) {
  const timestamp = Number(unixTimestamp);
  const currentDate = new Date();

  // Check if the given timestamp is not a number
  if (isNaN(timestamp)) {
    return 'Invalid timestamp';
  }

  const postDate = new Date(timestamp);

  // Determine the post status based on the conditions provided
  if (isBefore(currentDate, postDate)) {
    return 'Post Scheduled';
  } else if (isAfter(currentDate, postDate)) {
    if (isAccountConnected) {
      return 'Successfully Posted';
    } else {
      return 'Skipped';
    }
  }
}
