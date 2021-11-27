import { motion } from 'framer-motion';
import { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import { getTextColor } from '../utils/color';

type Props = {
  handlePageSelect: (_page: string) => void;
  label: string;
  color: string;
};

const MenuItem = ({ handlePageSelect, label, color }: Props) => {
  const { selectedPage } = useContext(AppContext);
  return (
    <motion.div
      whileHover={{ scale: 1.2 }}
      className="menu-item"
      tabIndex={0}
      role="button"
      onClick={() => handlePageSelect(label)}
    >
      <div
        style={{
          color: selectedPage === label ? getTextColor(color) : 'var(--white)',
        }}
      >
        {label}
        {selectedPage === label && (
          <motion.div className="background-over" style={{ backgroundColor: color }} layoutId="backgorund" />
        )}
      </div>
    </motion.div>
  );
};

export default MenuItem;
