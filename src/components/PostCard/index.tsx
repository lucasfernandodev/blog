import Link from 'next/link';
import style from './style.module.css';
import { ViewsDisplay } from '../client/views';

interface IProps {
  title: string;
  url: string;
  description: string;
  date: string;
}

export const PostCard = ({ title, url,date, description }: IProps) => {
  return (
    <div className={style.post_card}>
      <h2 className={style.title}>
        <Link href={url}>
          {title}
        </Link>
      </h2>
      <p className={style.description}>{description}</p>
      <div className={style.container}>
        <span>{date}</span>
        <span className={style.countView}><ViewsDisplay slug={url}/></span>
      </div>
    </div>
  )
}