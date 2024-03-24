'use client';
import Image from 'next/image';
import style from './style.module.css';
import { useState } from "react";
import cover from "/public/cover.svg"

interface IProps {
  src: string | null;
  alt: string;
}

export const Thumbnail = ({ src, alt }: IProps) => {
  const [isError, setIsError] = useState(false);

  return (
    <div className={style.container_thumbnail}>
      <Image
        src={!isError && src ? src : cover}
        width={0}
        height={0}
        alt={alt}
        onError={() => setIsError(true)}
        layout='responsive'
      />
    </div>
  )
}