/* app/layout.js */
import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'ZORKO JIYANPUR – Brand of Food Lovers',
  description: 'Jiyanpur\'s favorite food spot — bold flavors, chill vibes, and unforgettable bites. Come hungry, leave happy. 😊',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&family=Be+Vietnam+Pro:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
