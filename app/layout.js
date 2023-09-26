import "./globals.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import { GA_TRACKING_ID, pageview } from "../utils/analytics";

const inter = Inter({ subsets: ["latin"] });
import { defaultSeoConfig } from "@/seoConfig";

export const metadata = {
  title: defaultSeoConfig.title,
  description: defaultSeoConfig.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <Head>
        <title>{defaultSeoConfig.title}</title>
        <meta name="description" content={defaultSeoConfig.description} />
        <meta property="og:title" content={defaultSeoConfig.title} />
        <meta
          property="og:description"
          content={defaultSeoConfig.description}
        />
        <meta property="og:image" content={defaultSeoConfig.imageUrl} />
        <link rel="canonical" href={`https://brasiliapp.com.br/`} />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
        />
        <script
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
           <script
          id="stripe"
          async
          src="https://js.stripe.com/v3/buy-button.js"
        />
      </Head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
