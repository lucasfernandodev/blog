import Image from '@/infra/Image';
import style from './style.module.css';

export interface HeroProps {
  image?: string;
  alt: string;
  title?: string;
  description?: string;
  customCoverColor?: string;
  height?: number;
}

const Hero: React.FC<HeroProps> = ({
  image,
  title,
  description,
  alt,
  customCoverColor,
  height,
  ...args
}) => {
  const bgStyle = {
    backgroundColor: 'var(--color-dark-400)',
    backgroundImage: 'unset',
    backgroundAttachment: 'unset',
    height: height ? `calc(${height}vh - 64px)` : 'undefined',
  };

  const customBackground = customCoverColor || image ? bgStyle : {};

  return (
    <div
      className={[style.hero, image ? style.contentImage : ''].join(' ')}
      style={customBackground}
      {...args}
    >
      {image && (
        <Image
          src={image}
          alt={alt}
          aria-hidden={!alt}
          priority
          sizes='(max-width: 1440px) 100vw,
              (max-width: 375px) 375px'
        />
      )}
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
    </div>
  );
};

export default Hero;
