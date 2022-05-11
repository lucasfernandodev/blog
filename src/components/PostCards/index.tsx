import { IconClock } from "@tabler/icons";
import Link from "../Utils/Link";
import TimeAgo from "../Utils/TimeAgo";
import style from "./style.module.css";

const PostCards = ({ posts }: { posts: any[] }) => {
  return (
    <div className={style.wrapper}>
      {posts !== null &&
        posts.map((post) => (
          <div className={style.card} key={post.id}>
            <div className={style.cardHeader}>
              <img src={post.cover} alt={post.title} />
            </div>
            <div className={style.cardMain}>
              <h3>
                {" "}
                <Link href={`/post/${post.slug}`}>{post.title}</Link>
              </h3>
              <p>{post.description}</p>
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
