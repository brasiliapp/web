"use client";

import { useEffect } from "react";
import { useRouter } from "next/router";
import { GA_TRACKING_ID, pageview } from "../utils/analytics";
import Script from "next/script";

import "../app/globals.css";
import Head from "next/head";

import { NextUIProvider } from "@nextui-org/react";

import { defaultSeoConfig } from "../seoConfig";

import Header from "@/components/Header";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  const { title, description, imageUrl, url } = defaultSeoConfig;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          property="og:title"
          content={"BrasiliApp 2023 - Gastos dos deputados federais"}
        />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:url" content={imageUrl} />

        <meta name="robots" content="index, follow" />

        <link
          rel="canonical"
          href={`https://brasiliapp.com.br/deputado-federal`}
        />
      </Head>

      <NextUIProvider
        disabletransitiononchange="true"
        attribute="class"
        value={{ light: "light", dark: "dark" }}
      >
        <Header />
        <div className="mx-auto w-full max-w-screen-xl">
          <Script
            id="stripe"
            async
            src="https://js.stripe.com/v3/buy-button.js"
          />

          <Script
            id="gtag"
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
          />
          <Script
            id="analytics"
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
          <Component {...pageProps} />
        </div>
      </NextUIProvider>
    </>
  );
}

export default MyApp;
