import { useRouter } from 'next/router';
import React, { useEffect, useRef, useState } from 'react';
import { DiscussionEmbed } from 'disqus-react';
interface commentsProps{
    id: string,
    title: string
}
const Comments: React.FC<commentsProps> = ({
    id,
    title
}) => {
 
    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl(window.location.href)
    }, [])

  return (<DiscussionEmbed
  shortname='blog-do-lucas-fernando'
  config={
      {
          url: url,
          identifier: title.replace(" ", "-"),
          title: title,
          language: 'pt' //e.g. for Traditional Chinese (Taiwan)	
      }
  }
/>);
};




export default Comments;
