import style from './style.module.css';
import Image from '@/infra/Image';
import { cloudinaryImages } from '@/services/cloudinaryImages';
import { FC } from 'react';

interface Props {
  url: string;
  alt: string;
  priority?: boolean;
  className?: string | undefined;
  href: string;
}

const Thumbnail: FC<Props> = ({
  href,
  url,
  alt,
  className,
  priority,
  ...args
}) => {
  return (
    <a
      href={href}
      className={[style.thumbnail, `${className}`].join(' ')}
      {...args}
    >
      <Image
        src={cloudinaryImages(url)}
        alt={alt}
        width={590}
        height={354}
        priority={priority}
      />
    </a>
  );
};

export { Thumbnail };
