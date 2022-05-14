import { Tag } from "../../types/post";
import Link from "../Utils/Link";
import style from "./style.module.css";

interface TagsProps {
  tags: Tag[];
}
const Tags = ({ tags }: TagsProps) => {

  return (
    <div className={style.tags}>
      {tags.map((tag, index) => {

        return (<Link className={style.tag} href={tag.slug} key={tag.name} data-color={tag.color}>
          {tag.name}
        </Link>);
      })}
    </div>
  );
};

export default Tags;
