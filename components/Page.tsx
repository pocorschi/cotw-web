/* eslint-disable react/require-default-props */
import { motion } from 'framer-motion';
import { useContext } from 'react';
import { isMobile } from 'react-device-detect';
import { AppContext } from '../state/AppContext';
import { Color } from '../types';
import Swatch from './Swatch';

type Props = {
  colors?: Color[];
  isActive: boolean;
  secondPage?: boolean;
};

const isOdd = (num: number) => num % 2 === 1;

const variants = {
  open: {
    rotate: isMobile ? -90 : 90,
    transition: {
      duration: 0.5,
      type: 'spring',
      bounce: 0.4,
    },
  },
  openPartial: { rotate: 55, transition: { delay: 0.1 } },
  closed: {
    rotate: 0,
    transition: {
      duration: 0.5,
      type: 'spring',
      bounce: 0,
    },
  },
};

const getClass = (
  isActive: boolean,
  secondPage: boolean,
  selectedPage: string | null | undefined,
  subPage: number | undefined
) => {
  if (isMobile) {
    if (selectedPage === null) {
      return 'closed';
    }
    if (!isActive) {
      return 'open';
    }
    if (isActive && secondPage && subPage === 2) {
      return 'closed';
    }
    if (isActive && secondPage && subPage === 1) {
      return 'open';
    }
    if (isActive && !secondPage && subPage === 1) {
      return 'closed';
    }
    if (isActive && !secondPage && subPage === 2) {
      return 'open';
    }
  } else {
    if (isActive) {
      if (secondPage) {
        return 'openPartial';
      }
      return 'open';
    }
    return 'closed';
  }
  return 'closed';
};

const Page: React.FC<Props> = ({ colors = [], isActive, secondPage = false, children }) => {
  const { selectedPage, subPage } = useContext(AppContext);
  return (
    <>
      <motion.div className="page" animate={getClass(isActive, secondPage, selectedPage, subPage)} variants={variants}>
        <div className="header">
          <h2>COTW</h2>
        </div>
        {!children &&
          colors.map((_, i) =>
            !isOdd(i) ? (
              <div className="row" key={colors[i].color}>
                <Swatch color={colors[i]} />
                {colors[i + 1] && <Swatch color={colors[i + 1]} />}
              </div>
            ) : null
          )}
        {children}
      </motion.div>
    </>
  );
};

export default Page;
