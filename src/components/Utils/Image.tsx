import NextImage from 'next/image';

interface ImageProps {
  src: string,
  alt: string,
  width?: number,
  height?: number,
  className?: string | undefined,
}

const Image = ({src, alt, width, height, className}: ImageProps) => {
  
  return(
    <div style={{width: '100%', height: '100%', position: 'relative'}}>
      <NextImage 
      src={src}
      alt={alt}
      layout='fill'
      objectFit='cover'
      width={width}
      height={height}
      className={className}
      priority={true}
    />
    </div>
  )
};

export default Image;