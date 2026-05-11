/* app/layout.js */
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  metadataBase: new URL('https://zorkojiyanpur.vercel.app'),
  title: 'ZORKO JIYANPUR | Brand of Food Lovers',
  description: 'ZORKO JIYANPUR – Brand of Food Lovers 🍔 Enjoy burgers, sandwiches, mojitos, pizza, desserts & more at Doharighat Road, Jiyanpur, Azamgarh. Amazing taste, chill vibes & student offers available.',
  keywords: 'Zorko Jiyanpur, Zorko Azamgarh, Burger in Jiyanpur, Best Cafe in Jiyanpur, Mojito in Azamgarh, Fast Food Jiyanpur, Pizza Jiyanpur, Restaurant in Azamgarh, Cafe Near Me, Food Lovers',
  alternates: {
    canonical: 'https://zorkojiyanpur.vercel.app',
  },
  openGraph: {
    title: 'ZORKO JIYANPUR 🍔 | Brand of Food Lovers',
    description: 'Amazing burgers, mojitos, sandwiches & chill vibes ❤️ Visit ZORKO JIYANPUR today!',
    url: 'https://zorkojiyanpur.vercel.app',
    siteName: 'ZORKO JIYANPUR',
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
    title: 'ZORKO JIYANPUR 🍔 | Brand of Food Lovers',
    description: 'Amazing burgers, mojitos, sandwiches & chill vibes ❤️',
    images: ['https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
  appleWebApp: {
    title: 'ZORKO JIYANPUR',
    statusBarStyle: 'default',
    capable: true,
  },
  icons: {
    icon: 'https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png',
    apple: 'https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png',
  },
};

export const viewport = {
  themeColor: '#ee7f1a',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Restaurant",
                  "name": "ZORKO JIYANPUR",
                  "image": "https://ik.imagekit.io/DEMOPROJECT/b9e93af6-869f-444a-9940-7d87a43b6b45.png",
                  "url": "https://zorkojiyanpur.vercel.app",
                  "telephone": "+919278140402",
                  "address": {
                    "@type": "PostalAddress",
                    "streetAddress": "Doharighat Road, near Hydel, in front of Shiv Mandir, Jiyanpur",
                    "addressLocality": "Azamgarh",
                    "addressRegion": "UP",
                    "postalCode": "276140",
                    "addressCountry": "IN"
                  },
                  "geo": {
                    "@type": "GeoCoordinates",
                    "latitude": 26.155,
                    "longitude": 83.332
                  },
                  "openingHoursSpecification": {
                    "@type": "OpeningHoursSpecification",
                    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
                    "opens": "10:00",
                    "closes": "22:00"
                  },
                  "servesCuisine": "Fast Food, Cafe",
                  "priceRange": "₹",
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "5",
                    "reviewCount": "150"
                  }
                },
                {
                  "@type": "Menu",
                  "name": "ZORKO JIYANPUR Menu",
                  "mainEntityOfPage": "https://zorkojiyanpur.vercel.app/#menu",
                  "hasMenuSection": [
                    {
                      "@type": "MenuSection",
                      "name": "Burgers",
                      "hasMenuItem": {
                        "@type": "MenuItem",
                        "name": "Mexican King Burger",
                        "offers": { "@type": "Offer", "price": "89", "priceCurrency": "INR" }
                      }
                    },
                    {
                      "@type": "MenuSection",
                      "name": "Pizza",
                      "hasMenuItem": {
                        "@type": "MenuItem",
                        "name": "Veg Exotica Pizza",
                        "offers": { "@type": "Offer", "price": "159", "priceCurrency": "INR" }
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
