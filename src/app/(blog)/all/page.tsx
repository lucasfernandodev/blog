import style from './style.module.css';
import { getAllPublishedPost } from '@/utils/get-all-published-post';
import { PostCard } from '@/components/PostCard';
import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Todas as publicações',
  }
}

const AllPostPage = async () => {

  let results = []
  let data = await getAllPublishedPost({});

  results = [...data.posts]

  while (data.has_more) {
    data = await getAllPublishedPost({ next_cursor: data.next_cursor })
    results = [...results, ...data.posts]
  }

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.section_header}>
          <h2>Todas as publicações</h2>
        </div>

        <div className={style.container}>
          {results.length === 0 && results.length === 0 && <p>Não exite publicações.</p>}
          {results && results.length > 0 && results.map(({ title, date, description, id, slug }) => (
            <PostCard
              key={id}
              title={title}
              description={description}
              date={date}
              url={`/post/${slug}`}
            />))}
        </div>
      </div>
    </>
  )
}

export default AllPostPage