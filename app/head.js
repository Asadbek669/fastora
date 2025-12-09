export default function Head() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Fastora",
            "url": "https://fastora.uz",
            "logo": "https://fastora.uz/icon.png",
            "sameAs": [
              "https://t.me/fastora",
              "https://instagram.com/fastora"
            ]
          }),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Fastora",
            "url": "https://fastora.uz",
            "publisher": {
              "@type": "Organization",
              "name": "Fastora",
              "logo": {
                "@type": "ImageObject",
                "url": "https://fastora.uz/icon.png",
                "width": 512,
                "height": 512
              }
            }
          }),
        }}
      />
    </>
  );
}
