/* eslint-disable no-console */
import colorLib from 'color';
import { Color } from '../types';

export const getTextColor = (col: string | null | undefined) => {
  if (!col) return 'white';
  if (!CSS.supports('color', col)) return 'white';
  try {
    const c = colorLib(col.toLowerCase());
    if (c.isLight()) {
      return 'var(--black)';
    }
  } catch (e) {
    console.log(`${col} - is not a color`);
  }
  return 'white';
};

export const compileColors = (sourceColors: Color[]) => {
  const c: {
    [key: string]: Color[];
  } = {};
  const colorsR = sourceColors.map(color => {
    const [firstLetter, ...rest] = color.family;
    const family = [firstLetter.toUpperCase(), ...rest].join('');
    return {
      ...color,
      family,
    };
  });

  colorsR.forEach((col, idx) => {
    const newCol = {
      ...col,
      idx: idx + 1,
    };
    if (c[col.family]) {
      c[col.family].push(newCol);
    } else {
      c[col.family] = [newCol];
    }
  });
  const t: any = {};

  Object.keys(c).forEach(key => {
    if (c[key].length > 12) {
      t[key] = {
        page1: c[key].slice(0, 12),
        page2: c[key].slice(12),
      };
    } else {
      t[key] = {
        page1: c[key],
      };
    }
  });

  return t;
};
