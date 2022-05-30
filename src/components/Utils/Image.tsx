import NextImage from 'next/image';
import { useEffect, useState } from 'react';

interface ImageProps {
  src: string,
  alt: string,
  width?: number,
  className?: string | undefined,
}

const Image = ({src, alt, width, className}: ImageProps) => {

  return(
    <div style={{width: '100%', height: '100%', position: 'relative'}}>
     <NextImage 
      src={src}
      alt={alt}
      layout='fill'
      width={width ? width : '100vw'}
      className={className}
    />
    </div>
  )
};

export default Image;