/* eslint-disable react/require-default-props */
import { motion } from 'framer-motion';
import { Color } from '../types';
import Swatch from './Swatch';

type Props = {
  colors: Color[];
  isActive: boolean;
  secondPage?: boolean;
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
  openPartial: { rotate: 60, transition: { delay: 0.1 } },
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
      return 'partial';
    }
    return 'open';
  }
  return 'closed';
};

const Page = ({ colors, isActive, secondPage = false }: Props) => (
  <motion.div className="page" animate={getClass(isActive, secondPage)} variants={variants}>
    <div className="header">
      <h2>COTW - {String(isActive)}</h2>
    </div>
    {colors.map((_, i) =>
      !isOdd(i) ? (
        <div className="row" key={colors[i].color}>
          <Swatch color={colors[i]} />
          {colors[i + 1] && <Swatch color={colors[i + 1]} />}
        </div>
      ) : null
    )}
  </motion.div>
);

export default Page;
