export function getTodaysPsalms(dayOfMonth?: number): string[] {
  const todayOnServer = new Date(new Date());
  const day = dayOfMonth ?? todayOnServer.getDate();
  //   const day = 1;

  if (day == 31) {
    return [`119`];
  } else {
    return [
      `${0 + day}`,
      `${30 + day}`,
      `${60 + day}`,
      `${90 + day}`,
      `${120 + day}`,
    ].filter(Boolean);
  }
}

export function getOrdinalSuffix(day: number): string {
  if (day > 3 && day < 21) return "th";
  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
