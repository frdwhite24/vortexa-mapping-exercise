export const getDataForChart = (data) => {
  if (!data) return;
  return Object.entries(data).map(([key, val]) => ({
    name: key,
    count: val,
  }));
};
