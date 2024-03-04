const getMoneyString = (number: number): string => {
  return number.toLocaleString("en-MX", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

export default getMoneyString;
