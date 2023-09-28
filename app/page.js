"use client";
import Image from "next/image";
import Link from "next/link";
import { Button, Tooltip } from "@nextui-org/react";
import Head from "next/head";
import Script from "next/script";

import { defaultSeoConfig } from "@/seoConfig";
import { GA_TRACKING_ID } from "../utils/analytics";

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
        <section className="relative z-0 flex flex-col justify-center justify-between w-full gap-4 py-20 mb-16 text-gray-700 bg-gray-100 md:mt-3 align-center bg-content1 md:rounded-large sm:rounded-none">
          <div className="container mx-auto text-center">
            <h2 className="mb-4 text-4xl font-bold">Acompanhe e Compartilhe</h2>
            <Tooltip content="Siga-nos no Instagram">
              <Button
                href="https://www.instagram.com/obrasiliapp"
                as={Link}
                target="_blank"
                isIconOnly
                color="foregound"
                variant="flat"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </Button>
            </Tooltip>
            <Tooltip content="Siga-nos no Twitter (X)">
              <Button
                href="https://twitter.com/brasiliapp"
                as={Link}
                target="_blank"
                isIconOnly
                color="foregound"
                variant="flat"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
                  ></path>
                </svg>
              </Button>
            </Tooltip>
            <p className="max-w-2xl mx-auto mt-16 mb-8 text-lg">
              Aos poucos todos os códigos e scripts utilizados para construir o
              BrasiliApp serão disponibilizados no GitHub, de forma aberta e
              pública para poder ser audidato, copiado ou estudado.
            </p>
            <Link
              href="https://github.com/brasiliapp"
              className="inline-flex items-center px-4 py-2 text-lg font-semibold text-white transition duration-300 ease-in-out bg-gray-900 rounded hover:bg-gray-600"
              title="Acesse o github do BrasiliApp"
              target="_blank"
            >
              <div className="flex flex-col">
                <span className="block text-xs font-normal">
                  github.com/brasiliapp
                </span>
              </div>
            </Link>
            <Link
              href="https://discord.com/invite/Udb7ZTac9F"
              className="inline-flex items-center px-4 py-2 ml-4 text-lg font-semibold text-white transition duration-300 ease-in-out bg-indigo-500 rounded hover:bg-indigo-400"
              title="Acesse o discord do BrasiliApp"
              target="_blank"
            >
              <div className="flex flex-col">
                <span className="block text-xs font-normal">Discord</span>
              </div>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
