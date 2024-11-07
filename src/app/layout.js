import localFont from "next/font/local";
import "./globals.css";
import { GranjaProvider } from './context/GranjaContext';

const minhaFonte = localFont({
  src: [
    {
      path: "/fonts/Quicksand/static/Quicksand-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "/fonts/Quicksand/static/Quicksand-Light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "/fonts/Quicksand/static/Quicksand-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "/fonts/Quicksand/static/Quicksand-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "/fonts/Quicksand/static/Quicksand-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },

  ],
  variable: "--font-minhaFonte", // nome da variável CSS para a fonte
});

export const metadata = {
  title: "Granjas",
  description: "Sistema de busca de granja",

};

export default function RootLayout({ children }) {
  return (
    <GranjaProvider>
      <html lang="en">
        <head>
          <link rel="icon" href="/ico.svg" sizes="any" />
          <title>{metadata.title}</title>
          <meta name="description" content={metadata.description} />
        </head>
        <body className={minhaFonte.variable}>
          {children}
        </body>
      </html>
    </GranjaProvider>
  );
}
