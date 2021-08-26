export const toPrice = (number) => {
  if (number) {
    return number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
  }
};
