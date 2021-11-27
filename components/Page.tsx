/* eslint-disable react/require-default-props */
import { motion } from 'framer-motion';
import { Color } from '../types';
import Swatch from './Swatch';

type Props = {
  colors?: Color[];
  isActive: boolean;
  secondPage?: boolean;
  hasChildren?: boolean;
};

const isOdd = (num: number) => num % 2 === 1;

const variants = {
  open: {
    rotate: 90,
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

const getClass = (isActive: boolean, secondPage: boolean) => {
  if (isActive) {
    if (secondPage) {
      return 'openPartial';
    }
    return 'open';
  }
  return 'closed';
};

const Page: React.FC<Props> = ({ colors = [], isActive, secondPage = false, hasChildren = false, children }) => (
  <motion.div
    className={`page ${isActive && 'isactive'} ${secondPage && 'secondpage'}`}
    animate={getClass(isActive, secondPage)}
    variants={variants}
  >
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
);

export default Page;
