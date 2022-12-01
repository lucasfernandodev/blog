import Link from '@/infra/Link';
import Container from '@/Organisms/Layout/Container';
import { Tag } from '@/types/post';
import style from './style.module.css';

export interface TemplateListTagsProps {
  tags: Tag[];
}

export function TemplateListTags({ tags }: TemplateListTagsProps) {
  return (
    <Container className={style.tags}>
      {tags &&
        tags.map((tag: Tag) => (
          <div
            className={style.card}
            key={tag.slug}
            style={{
              borderColor: `var(--color-tag-${tag.color})`,
              borderTopColor: `var(--color-tag-${tag.color})`,
            }}
          >
            <h3>{tag.name}</h3>
            <Link href={`/tags/${tag.slug}`} className={style.button}>
              Ver publicações
            </Link>
          </div>
        ))}
    </Container>
  );
}
