"use client";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import Script from "next/script";

import { defaultSeoConfig } from "@/seoConfig";
import { GA_TRACKING_ID } from "../utils/analytics";
import { Footer } from "@/components";

export default function Home() {
  const { title, description, imageUrl, url } = defaultSeoConfig;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />
        <meta name="twitter:url" content={imageUrl} />

        <meta name="robots" content="index, follow" />

        <link rel="canonical" href={`https://brasiliapp.com.br/`} />
      </Head>

      <main className="w-full max-w-screen-xl mx-auto">
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
        <section className="relative z-0 flex flex-col justify-center justify-between w-full gap-4 py-20 text-white bg-gray-900 md:mt-3 align-center bg-content1 md:rounded-large sm:rounded-none">
          <div className="container mx-auto text-center">
            <h2 className="mb-4 text-4xl font-bold">
              O BrasiliApp está de volta
            </h2>
            <span className="inline-block px-4 py-2 mb-4 text-xs text-white bg-yellow-500 bg-opacity-50 rounded-full">
              Até quando? Não sabemos!
            </span>
            <p className="max-w-2xl mx-auto mb-8 text-lg">
              Fiscalize como o seu deputado federal esta gastando o dinheiro
              público, seja da cota parlamentar ou da verba de gabinete,
              acompanhe as falas deles durante as sessões do plenário e entre em
              contato cobrando por melhorias.
            </p>
            <Link
              href="/deputado-federal"
              className="inline-flex items-center px-4 py-2 text-lg font-semibold text-white transition duration-300 ease-in-out bg-gray-500 rounded hover:bg-gray-600"
              title="Acesse o BrasiliApp"
            >
              <div className="flex flex-col">
                Você só acredita vendo?
                <span className="block text-xs font-normal">
                  então veja e continue sem acreditar
                </span>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 ml-1 fill-current"
                viewBox="0 0 20 20"
              >
                <path d="M10 3a.997.997 0 00.707.293l6 6a.999.999 0 000-1.414l-6-6a.999.999 0 00-1.414 1.414L15.586 10l-5.293 5.293a.999.999 0 101.414 1.414l6-6a.999.999 0 000-1.414l-6-6A.997.997 0 0010 3z" />
              </svg>
            </Link>
          </div>
        </section>

        <section className="py-16 ">
          <div className="container flex flex-col items-center mx-auto md:flex-row">
            <div className="relative w-full h-auto mb-8 overflow-hidden rounded-lg shadow-lg md:w-1/2 md:mb-0">
              <Image
                src="/gastos-com-cota-parlamentar.png"
                alt="Gastos de deputados com a cota parlamentar"
                className="w-full h-auto rounded-lg "
                width={400}
                height={500}
              />
              <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-gray-300"></div>
              <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-gray-300 to-transparent"></div>
            </div>

            <div className="flex flex-col items-center justify-center md:w-1/2">
              <div className="p-6 text-center bg-white rounded-lg">
                <h2 className="mb-4 text-2xl font-semibold text-gray-800">
                  Gastos da cota parlamentar
                </h2>

                <p className="mb-4 text-gray-600">
                  Você pode acompanhar e ver comprovantes de tudo o que o
                  parlamentou e pediu reembolso, além de fiscalizar pode
                  encontrar inconsistência com os gastos e realizar denuncias de
                  forma anônima.
                </p>
                <div className="mb-4 text-gray-600">
                  <span className="font-semibold">
                    Algumas situações que já aconteceram:
                  </span>
                  <ul>
                    <li>
                      1. Deputado gastando R$ 40.000,00 de combustível no mês.
                    </li>
                    <li>
                      2. Deputado indo em shopping no domingo e gastando
                      <br />
                      mais de R$ 500,00 em alimentação.
                    </li>
                    <li>3. Deputado utilizando sem parar no carro pessoal.</li>
                  </ul>
                </div>

                <Link
                  href="/deputado-federal"
                  className="inline-flex items-center px-4 py-2 text-lg font-semibold text-white transition duration-300 ease-in-out bg-gray-500 rounded hover:bg-gray-600"
                  title="Acesse o BrasiliApp"
                >
                  <div className="flex flex-col">Fiscalizar</div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4 ml-1 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 3a.997.997 0 00.707.293l6 6a.999.999 0 000-1.414l-6-6a.999.999 0 00-1.414 1.414L15.586 10l-5.293 5.293a.999.999 0 101.414 1.414l6-6a.999.999 0 000-1.414l-6-6A.997.997 0 0010 3z" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </main>
    </>
  );
}
