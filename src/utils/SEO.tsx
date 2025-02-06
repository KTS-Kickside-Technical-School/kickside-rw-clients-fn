import Logo from '/logo.svg';
import { Helmet } from 'react-helmet-async';

const SEO = ({
  title = 'Kickside Rw: Best of Tech, Sports and Showbizz. All trending news in Rwanda and East Africa in one place',
  description = 'Default Description',
  keywords = 'News, Rwanda, Tech, technologies, Sports, Talents, Startups, Kigali, Hub of Innovation',
  author = 'Kickside Rwanda',
  ogTitle,
  ogDescription,
  ogImage,
  ogUrl,
  ogType = 'website',
  twitterCard = Logo,
  twitterCreator = '@kickside_rw',
  canonicalUrl,
}: any) => {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': ogType,
    headline: title,
    description: description,
    author: {
      '@type': 'Person',
      name: `${author}`,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Kickside Rwanda',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.svg',
      },
    },
    mainEntityOfPage: window.location.href,
    image: ogImage || '/logo.svg',
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
