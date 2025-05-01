import React from 'react';
import { Helmet } from 'react-helmet';

interface SeoProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

const defaultProps: SeoProps = {
  title: 'Pase y GOL - Noticias de Fútbol Ecuatoriano',
  description: 'Portal de noticias del fútbol ecuatoriano. Serie A, Serie B, Copa Libertadores, Copa Sudamericana, selección nacional y más.',
  keywords: 'fútbol ecuatoriano, serie a, serie b, libertadores, sudamericana, selección ecuador',
  image: '/og-image.png',
  url: 'https://paseyGOL.com',
  type: 'website',
  author: 'Pase y GOL Team'
};

export const SEO: React.FC<SeoProps> = (props) => {
  const { title, description, keywords, image, url, type, author } = { ...defaultProps, ...props };
  
  const siteName = 'Pase y GOL';
  const twitterHandle = '@paseyGOL';
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:site_name" content={siteName} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Other important meta tags */}
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <meta name="theme-color" content="#1E1E48" />
    </Helmet>
  );
};

export default SEO;
