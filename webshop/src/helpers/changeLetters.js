export const changeLetters = (value) => {
  value = value.toLowerCase();
  value = value.replace(/ä/g, "a");
  value = value.replace(/ö/g, "o");
  value = value.replace(/å/g, "a");
  return value;
};
