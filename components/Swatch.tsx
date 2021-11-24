import ColorConverter from 'color';
import { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import { Color } from '../types';

type Props = {
  color: Color;
};

const Swatch = ({ color }: Props) => {
  const { setSelectedColor } = useContext(AppContext);
  const c = ColorConverter(color.hex);
  const cRGB = c.rgb().object();
  const cCMYK = c.cmyk().round().object();

  const handleClick = () => {
    if (setSelectedColor) {
      setSelectedColor(color);
    }
  };

  return (
    <div role="button" onKeyPress={handleClick} tabIndex={0} className="swatch" onClick={handleClick}>
      <div style={{ backgroundColor: color.hex }} className="color" />
      <div className="info">
        <h2>COTW-{color?.idx}</h2>
        <h3>{color.color}</h3>
        <div>
          <p>
            <span>R</span>
            {cRGB.r}
          </p>
          <p>
            <span>G</span>
            {cRGB.g}
          </p>
          <p>
            <span>B</span>
            {cRGB.b}
          </p>
        </div>
        <div>
          <p>
            <span>HTML</span>
            {color.hex}
          </p>
        </div>
        <div className="cmyk-row">
          <div className="cmyk-swatch">
            <div className="miniswatch cyan" />
            <p>{cCMYK.c}</p>
          </div>
          <div className="cmyk-swatch">
            <div className="miniswatch magenta" />
            <p>{cCMYK.m}</p>
          </div>
          <div className="cmyk-swatch">
            <div className="miniswatch yellow" />
            <p>{cCMYK.y}</p>
          </div>
          <div className="cmyk-swatch">
            <div className="miniswatch black" />
            <p>{cCMYK.k}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Swatch;
