import style from "./style.module.css";
import { WithChildren } from "../../types/componentChildren";
import Container from "./Container";
import Header from "./Header";
import Hero from "./Hero";
import Footer from "./Footer";
import Head from "next/head";

interface LayoutProps {
  title?: string;
  description?: string;
  thumbnail?: string;
}

const Layout = ({
  children,
  title,
  description,
  thumbnail,
}: WithChildren<LayoutProps>) => {

  
  const siteTitle = "Eater - Um blog sobre desenvolvimento web";
  const siteDescription =
    "Um blog sobre desenvolvimento web, com publicações diárias de artigos sobre programação, css e bugs.";
  const siteThumbnail = "";

  const currentTitle =
    typeof title !== "undefined" ? title + " | " + siteTitle : siteTitle;
  const currentDescription =
    typeof description !== "undefined" ? description : siteDescription;
  const currentThumbnail =
    typeof thumbnail !== "undefined" ? thumbnail : siteThumbnail;
  const currentUrl = '';

  return (
    <>
      <Head>
        <title>{currentTitle}</title>
        <meta
          property="og:title"
          content="Eater - Um blog sobre desenvolvimento web."
          key="title"
        />
        <meta name="description" content={currentDescription}></meta>

        <meta property="og:site_name" content="Eater" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Eater" />
        <meta property="og:description" content={currentDescription} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:image" content={currentThumbnail} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Eater" />
        <meta name="twitter:description" content={currentDescription} />
        <meta name="twitter:url" content={currentUrl} />
        <meta name="twitter:image" content={currentThumbnail} />
        <meta name="twitter:site" content="@lucasfernandodev" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
      </Head>
      <div>
        <Header />
        <Hero />
        <Container width="sm">{children}</Container>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
