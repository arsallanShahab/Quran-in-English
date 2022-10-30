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
  "gray",
  "slate",
  "zinc",
  "neutral",
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

export const default50 = `${colors["zinc"]["50"]}`;
export const default100 = `${colors["zinc"]["100"]}`;
export const default200 = `${colors["zinc"]["200"]}`;
export const default300 = `${colors["zinc"]["300"]}`;
export const default400 = `${colors["zinc"]["400"]}`;
export const default500 = `${colors["zinc"]["500"]}`;
export const default600 = `${colors["zinc"]["600"]}`;
export const default700 = `${colors["zinc"]["700"]}`;
export const default800 = `${colors["zinc"]["800"]}`;
export const default900 = `${colors["zinc"]["900"]}`;
