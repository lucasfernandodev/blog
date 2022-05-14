import { IconClock } from "@tabler/icons";
import { BlogPost } from "../../types/post";
import Link from "../Utils/Link";
import TimeAgo from "../Utils/TimeAgo";
import style from "./style.module.css";

interface PostCards{
  posts: BlogPost[],
  widthStyle?: "long" | 'small'
}

const PostCards = ({ posts,widthStyle }: PostCards) => {
  return (
    <div className={style.wrapper}>
      {posts !== null &&
        posts.map(post => (
          <div className={style.card} key={post.id} data-style={widthStyle}>
            <div className={style.cardHeader}>
              <img src={post.cover} alt={post.title} />
            </div>
            <div className={style.cardMain}>
              <h3>
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.description}</p>
              <p className="tags">
                {post.tags.map((tag, index) => {
                  return index === (post.tags.length - 1) ? <Link href={tag.name} key={tag.name}>{tag.name}</Link>:<Link href={tag.name} key={tag.name}>{tag.name} ,</Link>
                })}
              </p>
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
