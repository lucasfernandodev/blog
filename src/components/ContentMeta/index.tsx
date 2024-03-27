import Link from 'next/link';
import style from './style.module.css';

interface IContentMetaProps {
  slug: string;
  date: string;
}

export const ContentMeta = ({ date }: IContentMetaProps) => {
  return (
    <div className={style.container}>
      <p>
        Por
        <Link target="_blank" href="https://lucasfernando.tech">
          Lucas Fernando
        </Link>
        •
        <span>{date}</span>
      </p>
    </div>
  )
}