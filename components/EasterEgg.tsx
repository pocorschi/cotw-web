/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useContext } from 'react';
import color from 'color';
import { AnimatePresence, motion } from 'framer-motion';
import { AppContext } from '../state/AppContext';
import MetadataInfo from './MetadataInfo';
import ProgressiveImage from './ProgressiveImage';
import OpenSea from './OpenSea';

const bgVariants = {
  hidden: {
    opacity: 0,
    transition: {
      when: 'afterChildren',
    },
  },
  visible: (col: string | undefined) => ({
    opacity: 1,
    backgroundColor: col ?? '#fff',
  }),
  exit: {
    opacity: 0,
    transition: {
      delay: 0.3,
      when: 'afterChildren',
    },
  },
};

const imgCID = 'QmYpsPFiCGF7gqGfBqFYCmBMD55hJBgTrKvVRG3MnkNRYe';

const EasterEgg = () => {
  const { selectedColor, setSelectedColor } = useContext(AppContext);
  const imgBase = `https://gateway.pinata.cloud/ipfs/${imgCID}`;

  const getShadowColor = () => {
    if (!selectedColor) return '';

    const c = color(selectedColor.hex);
    let shadowColor;
    if (c.isLight()) {
      shadowColor = c.darken(0.4).desaturate(0.3).rgb().object();
    } else {
      shadowColor = c.lighten(0.8).rgb().object();
    }
    return `0px 0px 120px 30px rgba(${shadowColor.r},${shadowColor.g},${shadowColor.b}, ${
      c.isLight() ? '0.4' : '0.4'
    })`;
  };

  if (!setSelectedColor) return null;

  return (
    <AnimatePresence exitBeforeEnter>
      {selectedColor && selectedColor.idx === 140 ? (
        <motion.div
          variants={bgVariants}
          custom="#000000"
          animate="visible"
          initial="hidden"
          exit="exit"
          className="details-outside-container"
        >
          <motion.div
            className="details-container"
            initial={{ opacity: 0, top: '-500px' }}
            animate={{
              opacity: 1,
              top: '0px',
              transition: { duration: 0.2, delay: 0, type: 'spring', bounce: 0.8 },
            }}
            exit={{
              opacity: 0,
              top: '500px',
              transition: {
                delay: 0,
                duration: 0.2,
              },
            }}
          >
            <div
              className="photo"
              style={{
                boxShadow: getShadowColor(),
              }}
            >
              <ProgressiveImage
                src={`${imgBase}/${selectedColor.idx}.png`}
                alt="test"
                placeholder={`images/${selectedColor.idx}.png`}
              />
            </div>
            <MetadataInfo idx={selectedColor.idx ?? 0} />
            <div className="details-opensea-container">
              <button type="button" onClick={() => setSelectedColor(null)}>
                CLOSE
              </button>
              <OpenSea align="right" />
            </div>
          </motion.div>
          <div className="details-container-clickoutside" onClick={() => setSelectedColor(null)} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default EasterEgg;
