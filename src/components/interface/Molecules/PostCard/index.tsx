import { FC } from 'react';
import style from './style.module.css';
import { Thumbnail } from '../../Atons/Thumbnail';
import Link from '@/infra/Link';
import { Description } from '../../Atons/Description';
import Tags from '@/Atons/Tags';
import { Tag } from '@/types/post';

interface Props {
  thumbnail: string;
  href: string;
  title: string;
  description: string;
  tags: Tag[];
  compact: boolean;
  priority?: boolean;
}

const PostCard: FC<Props> = ({
  description,
  href,
  thumbnail,
  title,
  tags,
  compact = false,
  priority = false,
}) => {
  return (
    <div className={style.card} data-compact={compact}>
      <Thumbnail
        href={href}
        className={style.thumb}
        alt={title}
        url={thumbnail}
        priority={priority}
      />

      <div className={style.cardMain}>
        <Link href={href}>
          <h3>{title} </h3>
        </Link>

        <Description>{description}</Description>

        {compact && (
          <div className={style.tags}>
            <Tags tags={tags} />
          </div>
        )}
      </div>
    </div>
  );
};

export { PostCard };
