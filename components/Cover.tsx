import { useContext } from 'react';
import { motion } from 'framer-motion';
import { AppContext } from '../state/AppContext';
import { getTextColor } from '../utils/color';

const Cover = () => {
  const { selectedPage } = useContext(AppContext);

  return (
    <div className="cover">
      <div
        style={{
          backgroundColor: selectedPage ?? 'var(--default-cover-color)',
        }}
        className="top"
      >
        <div className="title">
          <h2 style={{ color: getTextColor(selectedPage) }}>COLORS OF THE WEB</h2>
          <h4>Since 1999</h4>
        </div>
        <p className="top-text" style={{ color: getTextColor(selectedPage) }}>
          Colors of the web
        </p>
      </div>
      <div className="bottom">
        <h2 className="title">
          COTW<sup>&copy;</sup>
        </h2>

        <p>Lorem ipsum sic dolor amet blah blah</p>
        <motion.div className="rivet" animate={{ rotate: selectedPage ? 90 : 0 }} />
      </div>
    </div>
  );
};

export default Cover;
