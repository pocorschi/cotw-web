import React, { useContext } from 'react';
import { isMobile } from 'react-device-detect';
import { AnimatePresence, motion } from 'framer-motion';
import useSound from 'use-sound';
import { AppContext } from '../state/AppContext';
import sfx from './sfx1.mp3';

const SubPageSelector = ({ active }: { active: boolean }) => {
  const { subPage, setSubPage } = useContext(AppContext);
  const [play] = useSound(sfx, { volume: 0.2 });
  const handleSubPageChange = (page: number) => {
    if (setSubPage && page !== subPage) {
      setSubPage(page);
      play();
    }
  };
  return (
    <AnimatePresence>
      {isMobile && active && (
        <motion.div
          className="sub-page-selector"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button type="button" onClick={() => handleSubPageChange(1)}>
            <h2 style={{ color: subPage === 1 ? 'var(--black)' : 'var(--white)' }}>1</h2>
            {subPage === 1 && <motion.div className="selected" layoutId="subpageselector-selected" />}
          </button>
          <button type="button" onClick={() => handleSubPageChange(2)}>
            <h2 style={{ color: subPage === 2 ? 'var(--black)' : 'var(--white)' }}>2</h2>
            {subPage === 2 && <motion.div className="selected" layoutId="subpageselector-selected" />}
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SubPageSelector;
