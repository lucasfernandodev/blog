'use client'
import { useRouter } from 'next/navigation'
import style from './style.module.css';
import { IconPrev } from '@/assets/icons/prev';

interface SelectData {
  value: string;
  data: { label: string, value: string }[]
}

export const Select = ({ data, value }: SelectData) => {
  const router = useRouter()

  const handleFilter = (ev: React.ChangeEvent<HTMLSelectElement>) => {
    const value = ev.target.value;
    if (value === '') {
      router.push(`/`)
    } else {
      router.push(`/?filter=${value}`)
    }
  }

  const toggleStateClass = (ev: React.MouseEvent<HTMLSelectElement, MouseEvent>) => {
    const select = ev.currentTarget
    select.classList.toggle(style.open)
    document.addEventListener('click', (event) => {
      if (event.target !== select) {
        select && select.classList.remove(style.open)
      }
    })
  }

  return (
    <div className={style.select_container}>
      <select
        onClick={toggleStateClass}
        data-active={!!data.find(t => t.value === value)}
        defaultValue={value}
        className={style.select}
        onChange={handleFilter}
      >
        <option value="">Selecionar conteúdo</option>
        {data.map(tag => (
          <option value={tag.value} key={tag.label}>
            {tag.label}
          </option>
        ))}
      </select>
      <IconPrev />
    </div>
  )
}