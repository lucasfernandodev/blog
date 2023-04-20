import style from './style.module.css';
import { BlogPost } from '@/types/post';
import Tags from '@/Atons/Tags';
import Link from '@/infra/Link';
import { Description } from './Description';
import { Thumbnail } from './Thumbnail';

interface PostCardCollection {
  posts: BlogPost[];
  widthStyle?: 'long' | 'small';
}

const PostCardCollection = ({ posts, widthStyle }: PostCardCollection) => {
  return (
    <div className={style.wrapper}>
      {posts !== null &&
        posts.map((post, index: number) => (
          <div className={style.card} key={index} data-style={widthStyle}>
            <Thumbnail
              href={`/post/${post.slug}`}
              className={style.thumb}
              alt={post.title}
              url={post.cover}
            />

            <div className={style.cardMain}>
              <Link href={`/post/${post.slug}`}>
                <h3>{post.title} </h3>
              </Link>

              <Description>{post.description}</Description>

              {widthStyle === 'long' && (
                <div className={style.tags}>
                  <Tags tags={post.tags} />
                </div>
              )}
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostCardCollection;
