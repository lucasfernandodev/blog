import style from './style.module.css';
import { IconClock } from '@tabler/icons';
import { BlogPost } from '../../types/post';
import Tags from '../Tags';
import Image from '../Utils/Image';
import Link from '../Utils/Link';
import Summary from '../Utils/Summary';
import TimeAgo from '../Utils/TimeAgo';


interface PostCards {
  posts: BlogPost[];
  widthStyle?: 'long' | 'small';
}

const PostCards = ({ posts, widthStyle }: PostCards) => {
  return (
    <div className={style.wrapper}>
      {posts !== null &&
        posts.map((post, index: number) => (
          <div className={style.card} key={index} data-style={widthStyle}>
            <div className={style.cardHeader}>
              <Image src={post.cover} alt={post.title} />
            </div>
            <div className={style.cardMain}>
              <h3>
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </h3>

              <Summary content={post.description} />

              {widthStyle === 'long' ? (
                <div className={style.tags}>
                  <Tags tags={post.tags} />
                </div>
              ) : null}

              <p className={style.time}>
                <IconClock size={18} />
                <TimeAgo date={post.date} />
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostCards;
