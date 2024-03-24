import Link from 'next/link';
import style from './style.module.css';
import { ViewsDisplay } from '../client/views';

interface IContentMetaProps {
  slug: string;
  date: string;
}

export const ContentMeta = ({ slug, date }: IContentMetaProps) => {
  return (
    <div className={style.container}>
      <p>
        Por
        <Link target="_blank" href="https://lucasfernandodev.github.io">
          Lucas Fernando
        </Link>
        •
        <span>{date}</span>
      </p>
      <ViewsDisplay slug={slug} />
    </div>
  )
}