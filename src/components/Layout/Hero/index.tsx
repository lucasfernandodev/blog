import Image from '../../Utils/Image';
import style from './style.module.css';

export interface HeroProps {
  image?: string;
  alt?: string;
  title?: string;
  description?: string;
  customCoverColor?: string;
}

const Hero: React.FC<HeroProps> = ({
  image,
  title,
  description,
  alt,
  customCoverColor,
  ...args
}) => {

  const customBackground = customCoverColor ? { 
    backgroundColor: customCoverColor,
    backgroundImage: 'unset'
  } : {};

  return (
    <div
      className={style.hero}
      style={customBackground}
      {...args}
    >
      {image && <Image 
        src={image} alt={alt || ''} 
        aria-hidden={!alt} 
        sizes="(max-width: 1440px) 100vw,
              (max-width: 375px) 375px"
      />}
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}
    </div>
  );
};

export default Hero;
