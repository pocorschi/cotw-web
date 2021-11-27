/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext, useEffect } from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import useSound from 'use-sound';
import { Page, Cover, colors, Details, Menu, SubPageSelector } from '../components';
import { AppContext } from '../state/AppContext';
import { ColorPages } from '../types';
import { getColorStats } from '../utils';
import sfx from '../components/sfx1.mp3';
import { compileColors } from '../utils/color';

type Props = {
  stats: any;
};

const Home: NextPage<Props> = ({ stats }) => {
  const { selectedPage, setSelectedPage, selectedColor, setStats } = useContext(AppContext);

  const [play] = useSound(sfx, { volume: 0.2 });

  const c: ColorPages = compileColors(colors);

  useEffect(() => {
    if (setStats) {
      setStats(stats);
    }
  }, [stats]);

  useEffect(() => {
    play();
  }, [selectedPage]);

  useEffect(() => {
    setTimeout(() => {
      if (setSelectedPage) {
        setSelectedPage('About');
      }
    }, 2000);
  }, []);

  const setScale = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    let scale = 1;
    if (width < 500) {
      scale = Math.min(Number(((height / 1200) * 0.85).toFixed(2)), 0.8);
      document.documentElement.style.setProperty('--container-width', `${width}px`);
    }
    if (width > 500) {
      scale = 0.7;
    }
    document.documentElement.style.setProperty('--scale', String(scale));
  };

  useEffect(() => {
    setScale();
  });

  return (
    <>
      <Head>
        <meta name="theme-color" content={selectedColor ? selectedColor.hex : '#ffff00'} />
      </Head>
      <div className="bg">
        <AnimateSharedLayout>
          <div className="main-container">
            <Menu colors={c} />
            <Page isActive={selectedPage === 'About'} secondPage>
              <div className="about-page">
                <h2>asdasdasdasda</h2>
              </div>
            </Page>
            <Page isActive={selectedPage === 'About'}>
              <div className="about-page">
                <h2>asdasdasdasda</h2>
              </div>
            </Page>
            {Object.keys(c).map(key => (
              <React.Fragment key={key}>
                {c[key].page2 ? <Page colors={c[key].page2 ?? []} isActive={selectedPage === key} secondPage /> : null}
                <Page colors={c[key].page1} isActive={selectedPage === key} />
              </React.Fragment>
            ))}
            <SubPageSelector active={Boolean(selectedPage && c[selectedPage]?.page2)} />
            <Cover />
          </div>
          <Details />
        </AnimateSharedLayout>
      </div>
    </>
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
