/* app/layout.js */
import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import PWAProvider from './components/PWAProvider';

export const metadata = {
  metadataBase: new URL('https://zorkojiyanpur.vercel.app'),
  title: 'Zorko Jiyanpur | Brand of Food Lovers',
  description: 'ZORKO JIYANPUR – Brand of Food Lovers. Doharighat Road, near Hydel, in front of Shiv Mandir, Jiyanpur, Azamgarh, UP 276140. Open daily 11:00 AM – 10:00 PM. Call: +91 92781 40402.',
  keywords: 'Zorko Jiyanpur, Zorko Azamgarh, Fast Food Jiyanpur, Burger Jiyanpur, Pizza Jiyanpur, Mojito Jiyanpur, Best Cafe in Jiyanpur, Food Lovers Jiyanpur',
  alternates: {
    canonical: 'https://zorkojiyanpur.vercel.app',
  },
  openGraph: {
    title: 'Zorko Jiyanpur | Brand of Food Lovers',
    description: 'Fast food cafe in Jiyanpur, Azamgarh. Good Food • Good Mood • Great Moments. Call +91 92781 40402.',
    url: 'https://zorkojiyanpur.vercel.app',
    siteName: 'Zorko Jiyanpur',
    images: [
      {
        url: 'https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png',
        width: 1200,
        height: 630,
        alt: 'Zorko Jiyanpur - Brand of Food Lovers',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Zorko Jiyanpur | Brand of Food Lovers',
    description: 'Fast food cafe in Jiyanpur, Azamgarh. Good Food • Good Mood • Great Moments.',
    images: ['https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    title: 'Zorko Jiyanpur',
    statusBarStyle: 'default',
    capable: true,
  },
  icons: {
    icon: 'https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png',
    apple: 'https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png',
  },
};

export const viewport = {
  themeColor: '#EE7F1A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Zorko Jiyanpur" />
        <meta name="application-name" content="Zorko Jiyanpur" />
        <link rel="apple-touch-icon" href="https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png" />
        
        {/* Google Fonts: Bricolage Grotesque, Plus Jakarta Sans, Caveat */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Caveat:wght@600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Restaurant",
              "name": "Zorko Jiyanpur",
              "image": "https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png",
              "url": "https://zorkojiyanpur.vercel.app",
              "telephone": "+919278140402",
              "email": "zorkojiyanpur1@gmail.com",
              "servesCuisine": ["Fast Food", "Cafe", "Burgers", "Pizza", "Mojitos"],
              "priceRange": "₹",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Doharighat Road, near Hydel, in front of Shiv Mandir",
                "addressLocality": "Jiyanpur",
                "addressRegion": "UP",
                "postalCode": "276140",
                "addressCountry": "IN"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": 26.155,
                "longitude": 83.332
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                  "opens": "11:00",
                  "closes": "22:00"
                }
              ],
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "5.0",
                "reviewCount": "5"
              }
            })
          }}
        />
      </head>
      <body>
        <PWAProvider />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
