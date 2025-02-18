import Link from 'next/link';
import { FC, Suspense } from 'react';
import { PostsNavigation } from '../client/PostsNavigation';
import style from './style.module.css';
import { IDomainPost } from '@/types/domain-post';

interface ListCardPostsProps {
  posts: IDomainPost[];
  tags?: string[],
  config: {
    posts_per_page: number,
    page: number,
    posts_size: number,
    isPrevPage: boolean,
    queryCursor: string | null
  }
}

export const ListCardPosts: FC<ListCardPostsProps> = ({
  posts,
  tags,
  config
}) => {
  return (
    <section className={style.section} id={style.listContent}>
      <div className={style.header}>
        <h3>Publicações</h3>
        <div className={style.controller}>
          {!tags && <span className={style.label}>
            {config.posts_per_page * config.page} de {config.posts_size} Publicações
          </span>}
          <PostsNavigation page={config.page} isPrev={config.isPrevPage} has_more={config.queryCursor} />
        </div>
      </div>

      <Suspense fallback={<p>Caregando publicações...</p>}>
        {posts.length > 0 && <ul className={style.list}>
          {posts.map(post => {
            return (
              <li key={post.id}>
                <Link  href={`/post/${post.slug}`} className={style.cardPost}>
                  <h3>{post.title}</h3>
                  <p>{post.description}</p>
                </Link>
              </li>
            )
          })}
        </ul>}
        {posts.length === 0 && tags && (<p>Não existe publicação com a tag &quot;{tags[0]}&quot;.</p>)}
        {posts.length === 0 && !tags && <p>Não existe publicações.</p>}
      </Suspense>
    </section>
  )
}