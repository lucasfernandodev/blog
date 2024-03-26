'use client';
import Image from 'next/image';
import style from './style.module.css';
import { useState } from "react";

interface IProps {
  src: string | null;
  alt: string;
}

export const Thumbnail = ({ src, alt }: IProps) => {
  const [isError, setIsError] = useState(false);

  return (
    <div className={style.container_thumbnail}>
      <Image
        src={!isError && src ? src : "/cover.svg"}
        width={0}
        height={0}
        alt={alt}
        onError={() => setIsError(true)}
      />
    </div>
  )
}