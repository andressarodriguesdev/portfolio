import "./globals.css";
import Head from 'next/head';

export const metadata = {
  title: "Andressa Rodrigues",
  description: "Portfolio de Andressa Rodrigues",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-br">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap" rel="stylesheet" />
        <link rel="icon" href="/avatar.png" />
      </Head>
      <body>
        {children}
      </body>
    </html>
  );
}
