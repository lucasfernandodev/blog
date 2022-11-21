import style from './style.module.css';
import { Clock } from '../../lib/icons';
import { BlogPost } from '../../types/post';
import Tags from '../Tags';
import Image from '../../infra/Image';
import Link from '../../infra/Link';
import Summary from '../Utils/Summary';
import { cloudinaryImages } from '../../services/cloudinaryImages';


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
              <Image src={cloudinaryImages(post.cover)} alt={post.title} width={550} height={354}/>
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
