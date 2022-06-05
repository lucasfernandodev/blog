import NextImage from 'next/image';
import {useState } from 'react';
import imageError from './imageError';

interface ImageProps {
  src: string,
  alt: string,
  width?: number,
  className?: string | undefined,
  priority?: boolean,
}

const Image = ({src, alt, className,priority = false}: ImageProps) => {

  const [currentSrc, setCurrentSrc] = useState(src);

  return(
    <div style={{width: '100%', height: '100%', position: 'relative'}}>
      <NextImage 
        src={currentSrc}
        alt={alt}
        layout='fill'
        className={className}
        onError={() => setCurrentSrc(imageError)}
        priority={priority}
      />
    </div>
  );
};

export default Image;