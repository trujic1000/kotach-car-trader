export const toPrice = (number) =>
  number.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
