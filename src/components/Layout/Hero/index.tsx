import style from "./style.module.css";
import backgroundImage from "../../../../public/images/bg-hero.jpg";

interface heroProps {
  image?: string;
  title?: string | null;
  description?: string | null;
  color?: string 
}

const Hero = ({ image, title = null, description = null, color }: heroProps) => {

  let background;

  if(typeof image === 'undefined' && typeof color === 'undefined'){
    background = `url(${backgroundImage.src})`;
  }

  if(typeof color !== 'undefined'){
    background = color;
  }

  if(typeof image !== 'undefined'){
    background = `url(${image})`;
  }



    return (
      <div className={style.hero} style={{ background: background, }}>
      {title !== null && <h2>{title}</h2>}
      {description !== null && <p>{description}</p>}
      </div>
    );
  
};

export default Hero;
