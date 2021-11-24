import { useContext } from 'react';
import color from 'color';
import { AppContext } from '../state/AppContext';

const Cover = () => {
  const { selectedPage } = useContext(AppContext);

  const getTextColor = () => {
    if (!selectedPage) return 'white';
    const c = color(selectedPage.toLowerCase());
    if (c.isLight()) {
      return 'var(--black)';
    }
    return 'white';
  };
  return (
    <div className="cover">
      <div style={{ backgroundColor: selectedPage ?? 'var(--default-cover-color)' }} className="top">
        <div className="title">
          <h2 style={{ color: getTextColor() }}>COLORS OF THE WEB</h2>
          <h4 style={{ color: getTextColor() }}>Years and years</h4>
        </div>
        <p className="top-text">Colors of the web</p>
      </div>
      <div className="bottom">
        <h2 className="title">
          COTW<sup>&copy;</sup>
        </h2>

        <p>Lorem ipsum sic dolor amet blah blah</p>
        <div className="rivet" />
      </div>
    </div>
  );
};

export default Cover;
