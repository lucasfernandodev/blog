import NextImage from 'next/image';
import {ImageProps} from 'next/image'
import { HTMLProps, useState } from 'react';
import imageError from './imageError';

interface imageProps extends ImageProps {
  src: string,
  alt: string,
  width?: number,
  height?: number,
  className?: string,
  priority?: boolean,
}

const Image = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  ...args
}: imageProps) => {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    <div style={{ width: '100%', height: '100%', position: 'relative' }}>
      <NextImage
        src={currentSrc}
        alt={alt}
        className={className}
        onError={() => setCurrentSrc(imageError)}
        priority={priority}
        width={width}
        height={height}
        fill
        {...args}
      />
    </div>
  );
};

export default Image;
