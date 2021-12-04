import { useContext } from 'react';
import { motion } from 'framer-motion';
import { isMobile } from 'react-device-detect';
import { AppContext } from '../state/AppContext';
import { getTextColor } from '../utils/color';

const variants = {
  open: {
    rotate: isMobile ? -90 : 90,
    transition: {
      duration: 0.5,
      type: 'spring',
      bounce: 0.4,
    },
  },
  closed: {
    rotate: 0,
    transition: {
      duration: 0.5,
      type: 'spring',
      bounce: 0,
    },
  },
};

const Cover = () => {
  const { selectedPage } = useContext(AppContext);

  const getAnimationState = () => {
    if (isMobile) {
      return selectedPage === null ? 'closed' : 'open';
    }
    return 'closed';
  };

  const getTopColor = () => {
    if (selectedPage === 'About') {
      return 'var(--default-cover-color';
    }
    return selectedPage ?? 'var(--default-cover-color)';
  };

  return (
    <motion.div className="cover" variants={variants} animate={getAnimationState()}>
      <div
        style={{
          backgroundColor: getTopColor(),
        }}
        className="top"
      >
        <div className="title">
          <h2 style={{ color: getTextColor(selectedPage) }}>COLORS OF THE WEB</h2>
          <h4 style={{ color: getTextColor(selectedPage) }}>Since 1999</h4>
        </div>
        <p className="top-text" style={{ color: getTextColor(selectedPage) }}>
          Colors of the web
        </p>
      </div>
      <div className="bottom">
        <h2 className="title">
          COTW<sup>&copy;</sup>
        </h2>

        <p>140 colors.</p>
        <p>Find your own!</p>
        <motion.div className="rivet" animate={{ rotate: selectedPage ? 90 : 0 }} />
      </div>
    </motion.div>
  );
};

export default Cover;
