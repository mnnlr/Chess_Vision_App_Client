import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
export const SIZE = width / 8;

export const toTranslation = (to) => {
  const tokens = to.split("");
  const col = tokens[0];
  const row = tokens[1];
  const indexes = {
    x: col.charCodeAt(0) - "a".charCodeAt(0),
    y: parseInt(row, 10) - 1,
  };
  return {
    x: indexes.x * SIZE,
    y: 7 * SIZE - indexes.y * SIZE,
  };
};

export const toPosition = ({ x, y }) => {
  const col = String.fromCharCode(97 + Math.round(x / SIZE));
  const row = `${8 - Math.round(y / SIZE)}`;
  return `${col}${row}`;
};
