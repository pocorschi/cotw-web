import React, { useContext } from 'react';
import { AppContext } from '../state/AppContext';
import { ColorPages } from '../types';
import MenuItem from './MenuItem';

type Props = {
  colors: ColorPages;
};

const Menu = ({ colors }: Props) => {
  const { selectedPage, setSelectedPage } = useContext(AppContext);
  const handlePageSelect = (page: string) => {
    if (setSelectedPage) {
      if (selectedPage === page) {
        setSelectedPage(null);
      } else {
        setSelectedPage(page);
      }
    }
  };

  return (
    <nav className="menu-container">
      <MenuItem label="About" color="white" handlePageSelect={handlePageSelect} />
      {Object.keys(colors).map(key => (
        <MenuItem key={key} label={key} color={key} handlePageSelect={handlePageSelect} />
      ))}
    </nav>
  );
};

export default Menu;
