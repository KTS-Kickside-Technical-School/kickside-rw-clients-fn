import { Helmet } from 'react-helmet-async';

const SEO = ({
    title = "Kickside Rw: Best of Tech, Sports and Showbizz. All trending news in one place",
    description = "Default Description",
    keywords = "News, Rwanda, Tech, technologies, Sports, Talents, Startups, Kigali, Hub of Innovation",
    author = "Ndahimana Bonheur",
    ogTitle,
    ogDescription,
    ogImage,
    ogUrl,
    ogType = "website",
    twitterCard = "summary_large_image",
    twitterCreator = "@kickside_rw",
    canonicalUrl,
    structuredData, // Pass JSON-LD structured data for SEO
}: any) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />

            <meta property="og:title" content={ogTitle || title} />
            <meta property="og:description" content={ogDescription || description} />
            <meta property="og:image" content={ogImage || "/default-image.jpg"} />
            <meta property="og:url" content={ogUrl || window.location.href} />
            <meta property="og:type" content={ogType} />

            <meta name="twitter:card" content={twitterCard} />
            <meta name="twitter:title" content={ogTitle || title} />
            <meta name="twitter:description" content={ogDescription || description} />
            <meta name="twitter:image" content={ogImage || "/default-image.jpg"} />
            <meta name="twitter:creator" content={twitterCreator} />

            {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

            {structuredData && (
                <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
            )}
        </Helmet>
    );
};

export default SEO;
