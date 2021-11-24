/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

type Props = {
  placeholder: string;
  src: string;
  alt: string;
};

const ProgressiveImage = ({ placeholder, src, alt }: Props) => {
  const [_, setLoading] = useState(true);
  const [currentSrc, setCurrentSrc] = useState(placeholder);

  useEffect(() => {
    const imageToLoad = new Image();
    imageToLoad.src = src;
    imageToLoad.onload = () => {
      setLoading(false);
      setCurrentSrc(src);
    };
  }, []);
  return <img src={currentSrc} alt={alt} />;
};

export default ProgressiveImage;
