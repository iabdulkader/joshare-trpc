export const generatePin = (): string => {
  const pin = Math.floor(Math.random() * 100000000).toString();

  // Pad the number with leading zeros if necessary
  return pin.padStart(8, "0");
};
