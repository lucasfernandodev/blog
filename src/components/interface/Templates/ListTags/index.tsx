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
              border: `1px solid var(--color-${tag.color})`,
              borderTop: `12px solid var(--color-${tag.color})`,
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
