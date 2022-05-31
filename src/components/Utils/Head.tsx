import HeadNext from "next/head";
import {defaultTitle,  defaultDescription,  defaultThumbnail, defaultUrl} from '../../../config/blog';

interface HeadProps{
  pageTitle: string | undefined,
  pageDescription: string | undefined,
  pageImage?: string | undefined,
  pageUrl?: string | undefined,
  pageType?: 'website' | 'article',
  titleComplet?: boolean
}


const Head = ({
  pageTitle, 
  pageDescription, 
  pageImage, 
  pageUrl,
  pageType = 'website',
  titleComplet = false
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

  const titleComplete = titleComplet === false ? `${pageTitle} | ${defaultTitle}` : pageTitle as string;
  const title = isUndefined(pageTitle) ? defaultTitle : titleComplete;

  const description = isUndefined(pageDescription) ? defaultDescription : pageDescription;
  const url = isUndefined(pageUrl) ? defaultUrl : `${defaultUrl}${pageUrl}`;
  const image = isUndefined(pageImage) ? defaultThumbnail : pageImage;

  return (
    <HeadNext>

      <title>{capitalizeFirstLetter(title)}</title>
      <meta name="google-site-verification" content="VL-1zomfyEJ4Cx6K-PXH0Djzhucd2Kr4qNrjE6o-PFk" />
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:locale" content="pt_BR" />
      <meta property="og:type" content={pageType} /> 
      <meta property="og:title" content={capitalizeFirstLetter(title)}/>
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content="Aeter" />
      <meta property="og:image" content={image} />


      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Aeter" />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:creator" content="@lucasfernandodev" />
  

    </HeadNext>
  )
}

export default Head;