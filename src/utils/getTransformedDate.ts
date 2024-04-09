export const getTransformedDate = (date: Date) => {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  return `${year}/${month >= 10 ? month : '0' + month}/${
    day >= 10 ? day : '0' + day
  }`;
};
