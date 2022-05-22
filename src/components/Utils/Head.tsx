import HeadNext from "next/head";
import {defaultTitle, 
  defaultDescription, 
  defaultThumbnail,
  defaultUrl, 
  defaultSiteName}
from '../../../config/blog';

interface HeadProps{
  pageTitle: string | undefined,
  pageDescription: string | undefined,
  pageImage?: string | undefined,
  pageUrl?: string | undefined,
  pageType?: 'website' | 'article',
}



const Head = ({
  pageTitle, 
  pageDescription, 
  pageImage, 
  pageUrl,
  pageType = 'website'
}: HeadProps) => {

  function capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function isUndefined(value: string | undefined) : boolean{
    if(typeof value !== 'undefined' && value !== 'undefined'){
      return false
    }

    return true
  }

  const title = isUndefined(pageTitle) ? defaultTitle : `${pageTitle} | ${defaultTitle}`;
  const description = isUndefined(pageDescription) ? defaultDescription : pageDescription;
  const url = isUndefined(pageUrl) ? defaultUrl : `${defaultUrl}${pageUrl}`;
  const image = isUndefined(pageImage) ? defaultThumbnail : pageImage;

  return (
    <HeadNext>

      <title>{capitalizeFirstLetter(title)}</title>
 
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:locale" content="pt_BR" />


      {/* quem ser diferente caso esteja na home */}
      <meta property="og:type" content={pageType} /> 
      <meta property="og:title" content={capitalizeFirstLetter(title)}/>
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Aeter" />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />


      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Eater" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@lucasfernandodev" />
  

    </HeadNext>
  )
}

export default Head;