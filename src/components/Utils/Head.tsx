import HeadNext from 'next/head';
import { canonicalUrl, siteName } from '../../../site.config';

export interface HeadProps{
  title: string,
  type?: 'website' | 'article',
  description: string,
  image: string,
  url: string,
  canonical?: boolean
  article?: {
    published_time: string,
    section:string
    autor: string,
    tag: string
  }
}


const Head = ({
  title,
  type = 'website',
  image,
  url,
  description,
  canonical = false,
  article
}: HeadProps) => {

  return (
    <HeadNext>

      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="google-site-verification" content="zKJh2tua7iegbZmW4zkKlSlSVoU5QGH0mOMp6H9NYQ8" />
      

      {article && (
        <>
          <meta property='article:published_time' content={article.published_time}/>
          <meta property='article:author' content={article.autor}/>
          <meta property='article:section' content={article.section}/>
          <meta property='article:tag' content={article.tag}/>
        </>
      )}


      {/* Canonical link */}
      {canonical && <link rel="canonical" href={canonicalUrl} />}


      {/* OG Tags */}
      <meta property="og:title" content={title}/>
      <meta property="og:image" content={image} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} /> 
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={siteName} />
      


      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@lucasfernandodev" />
  

    </HeadNext>
  );
};

export default Head;