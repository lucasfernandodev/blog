/* eslint-disable react/jsx-props-no-spreading */
import style from './style.module.css';
import backgroundImage from '../../../../public/images/bg.webp';

interface heroProps {
  image?: string | undefined;
  title?: string | null;
  description?: string | null;
  color?: string;
}

const Hero = ({
  image,
  title,
  description,
  color,
  ...args
}: heroProps) => {
  let background;
  let styleDefault = true;

  if (typeof image === 'undefined' && typeof color === 'undefined') {
    background = `url(${backgroundImage.src})`;
  }

  if (typeof color !== 'undefined') {
    background = `${color}`;
    styleDefault = false;
  }

  if (typeof image !== 'undefined') {
    background = `url(${image})`;
    styleDefault = false;
  }

  const heroStyle = {
    background,
    backgroundPosition: 'top center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
  };

  return (
    <div
      {...args}
      data-image={typeof image === 'undefined' && styleDefault === true}
      className={style.hero}
      style={heroStyle}
    >
      {title !== null && <h2>{title}</h2>}
      {description !== null && <p>{description}</p>}
    </div>
  );
};

Hero.defaultProps = {
  image: undefined,
  title: null,
  description: null,
  color: undefined,
};

export default Hero;
