import style from './style.module.css';
import { BlogPost } from '@/types/post';
import { PostCard } from '../PostCard';

interface PostCardCollection {
  posts: BlogPost[];
  compact?: 'long' | 'small';
}

const PostCardCollection = ({ posts, compact }: PostCardCollection) => {
  return (
    <div className={style.wrapper}>
      {posts !== null &&
        posts.map((post, index) => (
          <PostCard
            compact={compact === 'long' ? true : false}
            thumbnail={post.cover}
            key={post.title}
            tags={post.tags}
            href={`/post/${post.slug}`}
            description={post.description}
            title={post.title}
            priority={index === 0 ? true : false}
          />
        ))}
    </div>
  );
};

export default PostCardCollection;
