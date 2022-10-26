import colors from "../asset/colors.json";

const colorsName = [
  "red",
  "orange",
  "purple",
  "amber",
  "pink",
  "blue",
  "slate",
  "stone",
  "yellow",
  "lime",
  "green",
  "emerald",
  "teal",
  "cyan",
  "sky",
  "indigo",
  "violet",
  "fuchsia",
  "rose",
];
const randomNumber = Math.floor(Math.random() * colorsName.length);
const colorName = colorsName[randomNumber];

export const primary50 = `${colors[`${colorName}`]["50"]}`;
export const primary100 = `${colors[`${colorName}`]["100"]}`;
export const primary200 = `${colors[`${colorName}`]["200"]}`;
export const primary300 = `${colors[`${colorName}`]["300"]}`;
export const primary400 = `${colors[`${colorName}`]["400"]}`;
export const primary500 = `${colors[`${colorName}`]["500"]}`;
export const primary600 = `${colors[`${colorName}`]["600"]}`;
export const primary700 = `${colors[`${colorName}`]["700"]}`;
export const primary800 = `${colors[`${colorName}`]["800"]}`;
export const primary900 = `${colors[`${colorName}`]["900"]}`;
