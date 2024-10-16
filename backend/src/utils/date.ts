export const oneYearFromNow = () => {
  const date = new Date();
  date.setFullYear(date.getFullYear() + 1);
  return date;
};

export const thirtyDaysFromNow = () => {
  const date = new Date();
  date.setDate(date.getDate() + 30);
  return date;
};

export const fifteenMinutesFromNow = () => {
  const date = new Date();
  date.setMinutes(date.getMinutes() + 15);
  return date;
};
