export const getFormattedPercentage = (
  percentage: number,
  precision: number = 2
) => {
  const str = percentage.toPrecision(precision);
  if (str.includes('e')) {
    return parseFloat(str).toString();
  }
  return str;
};
