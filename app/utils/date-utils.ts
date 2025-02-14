const TOTAL_PSALMS = 150;
const PSALMS_PER_DAY = 5;

export function getTodaysPsalms(): string[] {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) /
      (1000 * 60 * 60 * 24)
  );

  const startingPsalm = (((dayOfYear - 1) * PSALMS_PER_DAY) % TOTAL_PSALMS) + 1;

  return Array.from({ length: PSALMS_PER_DAY }, (_, i) => {
    const psalmNumber =
      startingPsalm + i <= TOTAL_PSALMS
        ? startingPsalm + i
        : (startingPsalm + i) % TOTAL_PSALMS;
    return `PSA.${psalmNumber}`;
  });
}
