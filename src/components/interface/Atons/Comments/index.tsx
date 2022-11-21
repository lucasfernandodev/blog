import style from './style.module.css';
import React, { useEffect, useState } from 'react';
import { DiscussionEmbed } from 'disqus-react';

interface commentsProps {
  title: string;
}
const Comments: React.FC<commentsProps> = ({title }) => {
  const [url, setUrl] = useState('');
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  return (
    <div className={style.comment}>
      <button
        className={style.comment_action}
        onClick={() => setIsVisible(!isVisible)}
      >
        {!isVisible ? 'Ver comentarios' : 'Ocultar comentarios'}
      </button>
      {isVisible && (
        <div className={style.comment_content}>
          <DiscussionEmbed
            shortname='blog-do-lucas-fernando'
            config={{
              url: url,
              identifier: title.replace(' ', '-'),
              title: title,
              language: 'pt', //e.g. for Traditional Chinese (Taiwan)
            }}
          />
        </div>
      )}
    </div>
  );
};

export default Comments;
