import { Tag } from '@/types/post';
import Link from '@/infra/Link';
import style from './style.module.css';

interface TagsProps {
  tags: Tag[];
}
const Tags = ({ tags }: TagsProps) => {
  return (
    <div className={style.tags}>
      {tags.length > 0 &&
        tags.map((tag) => {
          const href = `/tags/${tag.slug}`;

          return (
            <Link
              prefetch={false}
              className={style.tag}
              href={href}
              key={tag.name}
              data-color={tag.color}
            >
              {tag.name}
            </Link>
          );
        })}
    </div>
  );
};

export default Tags;
