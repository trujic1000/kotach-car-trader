export const truncate = (text, max) =>
  text.length > max ? `${text.substring(0, 5)}...` : text;
