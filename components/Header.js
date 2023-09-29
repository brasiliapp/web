"use client";
import React from "react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  Image,
  Modal,
  ModalContent,
  Tooltip,
  ModalBody,
  useDisclosure,
  Tabs,
  Tab,
  Card,
  CardBody,
} from "@nextui-org/react";

import SocialMediaShare from "./SocialMediaShare";
import DonateButton from "./DonateButton";

export default function Header() {
  const menuItems = ["Gastos dos Deputados"];
  const { isOpen, onOpen, onOpenChange } = useDisclosure(true);
  const { isOpenStripe, onOpenStripe, onOpenChangeStripe } =
    useDisclosure(true);

  return (
    <Navbar shouldHideOnScroll isBordered maxWidth="xl">
      <Modal
        isOpen={isOpenStripe}
        placement="center"
        onOpenChange={onOpenChangeStripe}
        backdrop="blur"
        size="sm"
        scrollBehavior="inside"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalBody>
                <DonateButton />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
      <Modal
        isOpen={isOpen}
        placement="bottom-center"
        onOpenChange={onOpenChange}
        backdrop="blur"
        size="xl"
        scrollBehavior="outside"
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: {
                duration: 0.3,
                ease: "easeOut",
              },
            },
            exit: {
              y: -20,
              opacity: 0,
              transition: {
                duration: 0.2,
                ease: "easeIn",
              },
            },
          },
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {/* <ModalHeader className="flex flex-col gap-1">
                Junte-se à Transparência: Adote o BrasiliApp
              </ModalHeader> */}
              <ModalBody>
                <h2 className="mt-4 mb-0 text-2xl font-semibold">
                  Juntos pela transparência
                </h2>
                <p className="mb-2 text-gray-700">
                  No Brasil, a política é para o povo, pelo povo e com o
                  dinheiro do povo. É nosso direito e dever garantir que nossos
                  representantes eleitos usem nossos recursos públicos de
                  maneira responsável e transparente. É por isso que estamos
                  empolgados em apresentar o BrasiliApp, uma ferramenta poderosa
                  que coloca o controle em suas mãos.
                </p>
                <div className="mb-2">
                  <h3 className="mb-2 text-lg font-semibold">
                    Benefícios do BrasiliApp:
                  </h3>
                  <ul className="pl-4 text-gray-700 list-disc list-inside">
                    <li>
                      Transparência Total: Com o BrasiliApp, você pode acessar
                      facilmente informações detalhadas sobre como seus
                      deputados federais estão utilizando a cota parlamentar,
                      garantindo que seu dinheiro seja usado de forma ética.
                    </li>
                    <li>
                      Fiscalização Cidadã: Tornamos simples monitorar o
                      desempenho de nossos representantes, incentivando a
                      responsabilidade e a prestação de contas.
                    </li>
                    <li>
                      Tomada de Decisão Informada: Com dados claros sobre o
                      histórico de gastos dos deputados, você pode tomar
                      decisões mais informadas nas eleições, escolhendo
                      candidatos comprometidos com a gestão responsável dos
                      recursos públicos.
                    </li>
                    <li>
                      Combate à Corrupção: O BrasiliApp ajuda a identificar
                      qualquer mau uso de recursos públicos, fortalecendo nossa
                      luta contra a corrupção.
                    </li>
                  </ul>
                </div>
                <div className="mb-4">
                  <h3 className="mb-2 text-lg font-semibold">
                    Como você pode contribuir:
                  </h3>
                  <div className="flex flex-col w-full">
                    <Tabs aria-label="apoiando" size="lg">
                      <Tab key="using" title="Utilizando">
                        <Card>
                          <CardBody>
                            O BrasiliApp coloca o poder de fiscalização nas suas
                            mãos. Use-o para acompanhar seus deputados e
                            compartilhe para que mais pessoas se juntem à causa
                            da transparência na política brasileira. Juntos,
                            podemos construir um Brasil mais responsável e
                            justo. Baixe e compartilhe o BrasiliApp hoje para
                            fazer a diferença!
                            {/* <SocialMediaShare /> */}
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab key="building" title="Construindo">
                        <Card>
                          <CardBody>
                            Desenvolvedores e profissionais de tecnologia, vocês
                            podem fazer a diferença! O BrasiliApp é open source
                            e precisa da sua expertise para fortalecer nossa
                            democracia. Contribua com suas habilidades para
                            aumentar a transparência na política brasileira e
                            capacitar cidadãos. Junte-se a nós na missão de
                            construir um Brasil mais justo e transparente. Vamos
                            codificar a mudança! Em breve no github.
                            https://github.com/orgs/brasiliapp/repositories
                          </CardBody>
                        </Card>
                      </Tab>
                      <Tab key="donating" title="Doando">
                        <Card>
                          <CardBody>
                            O BrasiliApp é grátis, sem anúncios e sem cadastro.
                            Mas se você puder e quiser contribuir, a sua doação
                            vai ajudar com os custos de servidores e hospedagem.
                            Qualquer doação, por menor que seja, faz a
                            diferença. Ajude-nos a fortalecer nossa democracia.
                            <div className="mt-4 text-center">
                              <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">
                                Doação Segura
                              </span>

                              <DonateButton />
                            </div>
                          </CardBody>
                        </Card>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>

      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarContent className="sm:hidden" justify="center">
        <NavbarBrand>
          <Link href="/" aria-current="page" color="black">
            <Image
              width={45}
              height={45}
              alt="BrasiliApp - Gastos dos deputados federais"
              src="/logo-brasiliapp.png"
            />
          </Link>

          {/* <p className="ml-3 font-bold text-inherit">BrasiliApp</p> */}
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex" justify="center">
        <NavbarBrand>
          <Link href="/" aria-current="page" color="warning">
            <Image
              width={45}
              height={45}
              className="mr-4"
              alt="BrasiliApp - Gastos dos deputados federais"
              src="/logo-brasiliapp.png"
            />

            <p className="ml-3 font-bold text-black">BrasiliApp</p>
          </Link>
        </NavbarBrand>
        <Tooltip content="Ver todos os deputados federais">
          <NavbarItem isActive>
            <Link href="/deputado-federal/" aria-current="page" color="warning">
              Deputados Federais
            </Link>
          </NavbarItem>
        </Tooltip>
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
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
        </NavbarItem>
        <NavbarItem>
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
        </NavbarItem>
        <NavbarItem>
          <Tooltip content="Você pode fazer a diferença">
            <Button onPress={onOpen} color="danger" variant="flat">
              Apoie{" "}
              <svg
                aria-hidden="true"
                focusable="false"
                height="24"
                role="presentation"
                viewBox="0 0 24 24"
                width="24"
                className="text-danger animate-heartbeat"
                tabIndex="-1"
              >
                <path
                  d="M12.62 20.81c-.34.12-.9.12-1.24 0C8.48 19.82 2 15.69 2 8.69 2 5.6 4.49 3.1 7.56 3.1c1.82 0 3.43.88 4.44 2.24a5.53 5.53 0 0 1 4.44-2.24C19.51 3.1 22 5.6 22 8.69c0 7-6.48 11.13-9.38 12.12Z"
                  fill="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                ></path>
              </svg>
            </Button>
          </Tooltip>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href="/deputado-federal"
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
