import { useLingui } from '@lingui/react/macro';

/**
 * Calculates the time remaining until a specified date.
 *
 * @param {Date} endDate - The target date to calculate time until.
 * @returns {string} A string representation of the time remaining in the format "Xh Ym".
 */
export const timeUntil = (endDate: Date): string => {
  const now = new Date();
  const timeLeft = endDate.getTime() - now.getTime();

  if (timeLeft <= 0) {
    return '0h 0m';
  }

  const hours = Math.floor(timeLeft / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}h ${minutes}m`;
};

export const getTimeUntilNextDay = (): string => {
  const now = new Date();
  const nextDay = new Date(now);
  nextDay.setUTCHours(24, 0, 0, 0);
  return timeUntil(nextDay);
};

/**
 * Format the date text based on the current date and the question date.
 *
 * @param {Date} currentDate - The current date being displayed
 * @param {Date} today - The current date
 * @returns {string} The formatted date text
 */
export const useFormatDateText = () => {
  const { t } = useLingui();

  return (currentDate: Date, today: Date): string => {
    const diff = calculateDayDiff(today, currentDate);

    if (diff === 0) return t`Today`;
    if (diff === 1) return t`Yesterday`;

    return currentDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    });
  };
};

/**
 * Calculate the day difference between the question date and today.
 *
 * @param {Date} questionDate - The date of the question
 * @param {Date} today - The current date
 * @returns {number} The difference in days
 */

export const calculateDayDiff = (questionDate: Date, today: Date): number => {
  const questionDateUTC = new Date(questionDate);
  questionDateUTC.setUTCHours(0, 0, 0, 0);
  const timeDiff = questionDateUTC.getTime() - today.getTime();
  return timeDiff / (1000 * 3600 * 24);
};
