const TOTAL_PSALMS = 150;
const PSALMS_PER_DAY = 5;

export function getTodaysPsalms(): string[] {
  const today = new Date();
  const dayOfMonth = today.getDate(); // Gets 1-31

  if (dayOfMonth == 31) {
    return [`Psalm.119`];
  } else {
    return [
      `Psalm.${0 + dayOfMonth}`,
      `Psalm.${30 + dayOfMonth}`,
      `Psalm.${60 + dayOfMonth}`,

      `Psalm.${90 + dayOfMonth}`,

      `Psalm.${120 + dayOfMonth}`,
    ];
  }
}
