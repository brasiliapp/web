import Script from "next/script";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import Footer from "./components/Footer";

import { GA_TRACKING_ID } from "../utils/analytics";

import { defaultSeoConfig } from "@/seoConfig";

import "./globals.css";

const { title, description, url } = defaultSeoConfig;

export const metadata = {
  metadataBase: new URL("https://brasiliapp.com.br"),
  title,
  description,
  openGraph: {
    url,
    title,
    description,
    images: [
      {
        url: "/gastos-com-cota-parlamentar.png",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <Header />

        <main className="w-full max-w-screen-xl mx-auto">{children}</main>

        <Footer />
      </body>

      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />

      <Script
        id="analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      <Script
        id="stripe"
        strategy="lazyOnload"
        src="https://js.stripe.com/v3/buy-button.js"
      />
    </html>
  );
}
