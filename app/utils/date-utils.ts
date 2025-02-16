export function getTodaysPsalms(dayOfMonth?: number): string[] {
  const todayOnServer = new Date(new Date());
  const day = dayOfMonth ?? todayOnServer.getDate();
  //   const day = 1;

  if (day == 31) {
    return [`Psalm.119`];
  } else {
    return [
      `Psalm.${0 + day}`,
      `Psalm.${30 + day}`,
      `Psalm.${60 + day}`,
      `Psalm.${90 + day}`,
      `Psalm.${120 + day}`,
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
