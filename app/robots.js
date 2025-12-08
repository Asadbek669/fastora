export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/_next/', '/api/private/'],
      },
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Googlebot-Image', allow: '/' },
      { userAgent: 'Googlebot-Video', allow: '/' },
      { userAgent: 'Googlebot-Mobile', allow: '/' },
      { userAgent: 'bingbot', allow: '/' },
      { userAgent: 'Yandex', allow: '/' },
    ],
    sitemap: 'https://fastora.uz/sitemap.xml',
    host: 'fastora.uz',
  };
}
