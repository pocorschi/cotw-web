/* eslint-disable jsx-a11y/click-events-have-key-events */
import type { NextPage } from 'next';
import Head from 'next/head';
import React, { useContext, useEffect } from 'react';
import { AnimateSharedLayout } from 'framer-motion';
import useSound from 'use-sound';
import { useKonami } from 'react-konami-code';
import { BrowserView, MobileView } from 'react-device-detect';
import {
  Page,
  Cover,
  colors,
  Details,
  Menu,
  SubPageSelector,
  FavIcon,
  OpenSea,
  BottomRight,
  EasterEgg,
} from '../components';
import { AppContext } from '../state/AppContext';
import { ColorPages } from '../types';
import { getColorStats } from '../utils';
import sfx from '../components/sfx1.mp3';
import { compileColors } from '../utils/color';
import * as ga from '../lib/ga';

type Props = {
  stats: any;
};

const Home: NextPage<Props> = ({ stats }) => {
  const { selectedPage, setSelectedPage, selectedColor, setSelectedColor, setStats } = useContext(AppContext);

  const [play] = useSound(sfx, { volume: 0.1 });

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
    ga.pageview('/');
    ga.event({ action: 'homepage', params: {} });
    setTimeout(() => {
      if (setSelectedPage) {
        setSelectedPage('About');
      }
    }, 1000);
  }, []);

  const activate = () => {
    if (setSelectedColor) {
      setSelectedColor({
        category: 'special',
        color: 'Transparent',
        family: 'Transparent',
        hex: '#00000000',
        idx: 140,
      });
    }
  };
  useKonami(activate);

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
              <div className="about-page about-page-second">
                <h2>START HERE</h2>
              </div>
            </Page>
            <Page isActive={selectedPage === 'About'}>
              <div className="about-page">
                <h2>
                  <span>&quot;Colors Of The Web&quot;</span> is a NFT collection created by <span>InnocentPixel</span>,
                  part of the <span>TC community</span>. Paying homage to how the usage of colors online has evolved
                  throughout the years.
                </h2>
                <h2>
                  140 colors were minted and now available to be collected. Phase 2 is in progress, pending on the
                  interest of the community. Stay tuned.
                </h2>
              </div>
            </Page>
            {Object.keys(c).map(key => (
              <React.Fragment key={key}>
                {c[key].page2 ? <Page colors={c[key].page2 ?? []} isActive={selectedPage === key} secondPage /> : null}
                <Page colors={c[key].page1} isActive={selectedPage === key} />
              </React.Fragment>
            ))}
            <BottomRight>
              <SubPageSelector active={Boolean(selectedPage && c[selectedPage]?.page2)} />
              <MobileView style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <OpenSea />
              </MobileView>
            </BottomRight>
            <Cover />
          </div>
          <Details />
          <EasterEgg />
          <BrowserView className="footer">
            <OpenSea />
          </BrowserView>
        </AnimateSharedLayout>
      </div>
      <FavIcon />
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
