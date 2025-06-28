import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  author?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  twitterCreator?: string;
  canonicalUrl?: string;
}
const SEO = ({
  title = 'Kickside Rw: Best of Technology, Sports and Showbizz. All trending news in Rwanda and East Africa in one place',
  description = 'Kickside Rw is the best of Tech, Sports and Showbizz. All trending news in Rwanda and East Africa in one place . We provide the hottest news and all trends in Rwanda and East Africa',
  keywords = 'News, Rwanda, Technology,Business, Technologies, Sports, Talents, Startups, Kigali, Hub of Innovation',
  author = 'Kickside Rwanda',
  ogTitle,
  ogDescription = description,
  ogImage = 'https://www.kickside.rw/logo.svg',
  ogUrl,
  ogType = 'website',
  twitterCard = ogImage ? 'summary_large_image' : 'summary',
  twitterCreator = '@kickside_rw',
  canonicalUrl = window.location.href,
}: SEOProps) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ogType,
    headline: title,
    description: description,
    author: {
      '@type': 'Organization',
      name: `${author}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kickside Rwanda',
      logo: {
        '@type': 'ImageObject',
        url: ogImage,
      },
    },
    mainEntityOfPage: window.location.href,
    image: ogImage,
  };

  const isStaffRoute = location.pathname.startsWith('/staff');

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />

      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage || '/default-image.jpg'} />
      <meta property="og:url" content={ogUrl || window.location.href} />
      <meta property="og:type" content={ogType} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage || '/default-image.jpg'} />
      <meta name="twitter:creator" content={twitterCreator} />

      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}

      {isStaffRoute && (
        <>
          <meta name="robots" content="noindex, nofollow" />
        </>
      )}
    </Helmet>
  );
};

export default SEO;
