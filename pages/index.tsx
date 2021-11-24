import type { NextPage } from 'next';
import React, { useContext, useEffect } from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import { Page, Cover, colors, Details } from '../components';
import { AppContext } from '../state/AppContext';
import { Color } from '../types';
import { getColorStats } from '../utils';

const compile = (sourceColors: Color[]) => {
  const c: {
    [key: string]: Color[];
  } = {};
  const colorsR = sourceColors.map(color => {
    const [firstLetter, ...rest] = color.family;
    const family = [firstLetter.toUpperCase(), ...rest].join('');
    return {
      ...color,
      family,
    };
  });

  colorsR.forEach((col, idx) => {
    const newCol = {
      ...col,
      idx,
    };
    if (c[col.family]) {
      c[col.family].push(newCol);
    } else {
      c[col.family] = [newCol];
    }
  });
  const t: any = {};

  Object.keys(c).forEach(key => {
    if (c[key].length > 12) {
      t[key] = {
        page1: c[key].slice(0, 12),
        page2: c[key].slice(12),
      };
    } else {
      t[key] = {
        page1: c[key],
      };
    }
  });

  return t;
};

type Props = {
  stats: any;
};

const Home: NextPage<Props> = ({ stats }) => {
  const { setSelectedPage, selectedPage, setStats } = useContext(AppContext);

  const c: {
    [key: string]: {
      page1: Color[];
      page2?: Color[];
    };
  } = compile(colors);

  const handlePageSelect = (page: string) => {
    if (setSelectedPage) {
      if (selectedPage === page) {
        setSelectedPage(null);
      } else {
        setSelectedPage(page);
      }
    }
  };

  useEffect(() => {
    if (setStats) {
      setStats(stats);
    }
  }, [stats]);

  return (
    <div className="bg">
      <AnimateSharedLayout>
        <div className="main-container">
          <div className="menu-container">
            {Object.keys(c).map(key => (
              <button key={key} type="button" onClick={() => handlePageSelect(key)}>
                <h2>{key}</h2>
              </button>
            ))}
          </div>

          {Object.keys(c).map(key => (
            <React.Fragment key={key}>
              {c[key].page2 ? <Page colors={c[key].page2 ?? []} isActive={selectedPage === key} secondPage /> : null}
              <Page colors={c[key].page1} isActive={selectedPage === key} />
            </React.Fragment>
          ))}

          <Cover />
        </div>
        <Details />
      </AnimateSharedLayout>
    </div>
  );
};

export async function getStaticProps() {
  const stats = getColorStats();
  return {
    props: {
      stats,
    },
  };
}

export default Home;
