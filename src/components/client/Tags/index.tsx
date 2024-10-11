'use client'
import { tagMapper } from '@/utils/tag-url-mapper';
import style from './style.module.css';
import { useSearchParams } from 'next/navigation';
import { Tag } from '../Tag'
interface IProps {
  tags: {
    label: string;
    value: string;
  }[],
  addTag: (tag: string) => void;
  removeTag: (tag: string) => void
}

export const Tags = ({ tags, addTag, removeTag }: IProps) => {

  const urlParams = useSearchParams();
  const urlTags = urlParams.get('tags')
  const activeTags = urlTags ? tagMapper.toLabel(urlTags) : []

  function addItemForParams(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const button = e.target as HTMLButtonElement;
    const value = button.dataset.value

    if (!value) return;

    const addItem = () => {
      addTag((value))
      button.setAttribute('data-active', "true")
    }

    const removeITem = () => {
      button.setAttribute('data-active', "false")
      removeTag((value))
    }

    button.dataset.active === "true" ? removeITem() : addItem();
  }


  return (
    <div className={style.tags}>
      {tags.length > 0 && tags.map((tag) =>
        <Tag
          data-active={!!activeTags?.includes(tag.label)}
          data-value={tag.value}
          onClick={addItemForParams}
          key={tag.value}
          className={style.tag_button}
        >
          {tag.label}
        </Tag>
      )}
    </div>
  )
}