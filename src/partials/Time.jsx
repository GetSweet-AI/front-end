import { format, isToday, isTomorrow, isYesterday } from "date-fns";

export function dateUpdate(date) {
  if (isToday(date)) {
    return "Today";
  } else if (isYesterday(date)) {
    return "Yesterday";
  } else if(isTomorrow(date)){
    return "Tomorrow"
  }else {
    return format(date, "E, MMM d, 'at' h:mm a");
  }
}
