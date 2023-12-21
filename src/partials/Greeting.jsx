export default function greeting() {
  const currentHour = new Date().getHours();
  const currentYear = new Date().getFullYear();
  const holidays = [
    `${currentYear}-12-25`,
    `${currentYear}-01-01`,
    `${currentYear}-07-04`,
    `${currentYear}-10-31`,
  ];
  const currentDate = new Date().toISOString().split("T")[0];

  if (holidays.includes(currentDate)) {
    return "Happy holidays ";
  } else if (currentHour >= 5 && currentHour < 12) {
    return "Good morning ";
  } else if (currentHour >= 12 && currentHour < 18) {
    return "Good afternoon ";
  } else {
    return "Good evening ";
  }
}