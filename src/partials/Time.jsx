import { format, isToday, isYesterday } from "date-fns";

export function dateUpdate(date) {
  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else {
    return format(date, "E, MMM d, 'at' h:mm a");
  }
}
