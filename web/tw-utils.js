import Color from "color";

export const darken = (color, ratio) => Color(color).darken(ratio).string();

export const lighten = (color, ratio) => Color(color).lighten(ratio).string();

export const variant = (color, ratio = 0) => {
  if (ratio < 0) return lighten(color, -ratio);
  if (ratio > 0) return darken(color, ratio);
  return color;
};

export const scale = (color, ratio = 0) => ({
  DEFAULT: color,
  100: variant(color, ratio - .8),
  200: variant(color, ratio - .6),
  300: variant(color, ratio - .4),
  400: variant(color, ratio - .2),
  500: variant(color, ratio),
  600: variant(color, ratio + .2),
  700: variant(color, ratio + .4),
  800: variant(color, ratio + .6),
  900: variant(color, ratio + .8),
});
