export type Color = {
  color: string;
  category: string;
  hex: string;
  family: string;
  idx?: number;
};

export type ColorPages = {
  [key: string]: {
    page1: Color[];
    page2?: Color[];
  };
};
