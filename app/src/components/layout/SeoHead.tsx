import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  type?: 'website' | 'article';
}

const SITE_URL = 'https://learning-hub-3gw.pages.dev';
const DEFAULT_OG = `${SITE_URL}/og-default.png`;

export function SeoHead({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG,
  type = 'article',
}: SeoHeadProps) {
  const fullUrl = canonical ? `${SITE_URL}${canonical}` : SITE_URL;

  return (
    <Helmet>
      <title>{title}</title>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={fullUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:url" content={fullUrl} />
      {description && <meta property="og:description" content={description} />}
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Porhi" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}
