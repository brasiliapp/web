"use client";

import Link from "next/link";
import { Tooltip, Button } from "@nextui-org/react";

export function Footer() {
  return (
    <footer className="p-10 md:mt-3 z-0 text-gray-700 flex flex-col align-center relative justify-between gap-4 bg-content1 md:rounded-large sm:rounded-none  w-full">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-4">Acompanhe e Compartilhe</h2>
        <Tooltip content="Siga-nos no Instagram">
          <Button
            href="https://www.instagram.com/obrasiliapp"
            as={Link}
            target="_blank"
            isIconOnly
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
            variant="flat"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
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
        <p className="text-lg mb-8 max-w-2xl mx-auto mt-16">
          Aos poucos todos os códigos e scripts utilizados para construir o
          BrasiliApp serão disponibilizados no GitHub, de forma aberta e pública
          para poder ser audidato, copiado ou estudado.
        </p>
        <Link
          href="https://github.com/brasiliapp"
          className="bg-gray-900 hover:bg-gray-600 text-white py-2 px-4 rounded text-lg font-semibold transition duration-300 ease-in-out inline-flex items-center"
          title="Acesse o github do BrasiliApp"
          target="_blank"
        >
          <div className="flex flex-col">
            <span className="text-xs block font-normal">
              github.com/brasiliapp
            </span>
          </div>
        </Link>
        <Link
          href="https://discord.com/invite/Udb7ZTac9F"
          className="bg-indigo-500 ml-4 hover:bg-indigo-400 text-white py-2 px-4 rounded text-lg font-semibold transition duration-300 ease-in-out inline-flex items-center"
          title="Acesse o discord do BrasiliApp"
          target="_blank"
        >
          <div className="flex flex-col">
            <span className="text-xs block font-normal">Discord</span>
          </div>
        </Link>
      </div>
    </footer>
  );
}
