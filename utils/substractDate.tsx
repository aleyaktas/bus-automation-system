const findSubtractDate = (date: any) => {
  const today = new Date();
  const voyageDate = new Date(date);
  const diffTime = voyageDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};

// const res = findSubtractDate("2022-12-29");

export default findSubtractDate;
