import { Tag } from '@/types/post';
import Link from '@/infra/Link';
import style from './style.module.css';

interface TagsProps {
  tags: Tag[];
}
const Tags = ({ tags }: TagsProps) => {
  return (
    <div className={style.tags}>
      {typeof tags !== 'undefined' && tags.length > 0 && tags.map((tag) => {
        return (
          <Link className={style.tag} href={`/tags/${tag.slug}`} key={tag.name} data-color={tag.color}>
            {tag.name}
          </Link>
        );
      })}
    </div>
  );
};

export default Tags;
