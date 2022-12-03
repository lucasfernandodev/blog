import style from './style.module.css';
import { Clock } from '../../../../lib/icons';
import { BlogPost } from '@/types/post';
import Tags from '@/Atons/Tags';
import Image from '@/infra/Image';
import Link from '@/infra/Link';
import { cloudinaryImages } from '@/services/cloudinaryImages';
import { Description } from './Description';

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
              <Image
                src={cloudinaryImages(post.cover)}
                alt={post.title}
                width={550}
                height={354}
                priority={index === 0 ? true : false}
              />
            </div>
            <div className={style.cardMain}>
              <Link href={`/post/${post.slug}`}>
                <h3>{post.title} </h3>
              </Link>

              <Description>
                {post.description}
              </Description>

              {widthStyle === 'long' ? (
                <div className={style.tags}>
                  <Tags tags={post.tags} />
                </div>
              ) : null}

              <p className={style.time}>
                <Clock size={18} />
                {post.timeago}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PostCards;
