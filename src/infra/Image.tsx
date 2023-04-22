import NextImage from 'next/image';
import { ImageProps } from 'next/image';
import { useState } from 'react';

interface imageProps extends ImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
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

  const imageError =
    'https://res.cloudinary.com/lucasfernandodev/image/upload/v1653322546/blog/Cover_default_fyuwgl.svg';

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
        fill={width || height ? false : true}
        {...args}
      />
    </div>
  );
};

export default Image;
