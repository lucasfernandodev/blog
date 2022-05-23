import style from "./style.module.css";
import backgroundImage from "../../../../public/images/bg-hero.jpg";

interface heroProps {
  image?: string;
  title?: string | null;
  description?: string | null;
  color?: string 
}

const Hero = ({ image, title = null, description = null, color,...args}: heroProps) => {

  let background;
  let styleDefault = true


  if(typeof image === 'undefined' && typeof color === 'undefined'){
    background = `url(${backgroundImage.src})`;
  }

  if(typeof color !== 'undefined'){
    background = `${color}`;
    styleDefault = false;
  }

  if(typeof image !== 'undefined'){
    background = `url(${image})`;
    styleDefault = false
  }


  const heroStyle = {
    background: background,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover', 
  }

    return (
      <div {...args}
        data-image={typeof image === 'undefined' && styleDefault === true ? true : false} 
        className={style.hero} 
        style={heroStyle}
      >

        {title !== null && <h2>{title}</h2>}
        {description !== null && <p>{description}</p>}
      </div>
    );
  
};

export default Hero;
