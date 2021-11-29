import color from 'color';
import { useContext, useEffect } from 'react';
import { AppContext } from '../state/AppContext';

const FavIcon = () => {
  const { selectedPage } = useContext(AppContext);

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const width = 128;
    const height = 128;
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    img.src = '/favicon.ico';
    img.onload = () => {
      const bgColor = CSS.supports('color', String(selectedPage)) ? String(selectedPage).toLowerCase() : '#000000';
      const c = color(bgColor);
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = bgColor;
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = c.isLight() ? '#000000' : '#FFFFFF';
        ctx.font = 'bold 100px sans-serif';
        const textSize = ctx.measureText('C');
        const textHeight = textSize.actualBoundingBoxAscent + textSize.actualBoundingBoxDescent;
        ctx.textAlign = 'center';
        ctx.fillText('C', width / 2, height / 2 + textHeight / 2);

        const link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        link.href = canvas.toDataURL('image/x-icon');
        document.getElementsByTagName('head')[0].appendChild(link);
      }
    };
  }, [selectedPage]);

  return null;
};

export default FavIcon;
