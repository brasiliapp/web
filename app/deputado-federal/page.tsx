import type { FederalDeputyPoliticalInfo } from "@/interfaces";

import { DeputiesTable } from "./_components";
import { defaultSeoConfig } from "@/seoConfig";

const { title, description } = defaultSeoConfig;

export const metadata = {
  openGraph: {
    url: "/deputado-federal",
    title,
    description,
    images: [
      {
        url: "/logo-brasiliapp.png",
      },
    ],
  },
  alternates: {
    canonical: "/deputado-federal",
  },
};

async function getFederalDeputiesPoliticalInfo(): Promise<
  FederalDeputyPoliticalInfo[]
> {
  try {
    const response = await fetch(
      "https://pub-091f86d833a34a79891548ea8b1cb0ac.r2.dev/deputados.json",
      {
        next: {
          revalidate: 604800, // revalidate per week
        },
      },
    );

    const data = (await response.json()) as FederalDeputyPoliticalInfo[];
    const deputies = data.filter((deputy) => deputy.email !== null);

    return deputies;
  } catch (error) {
    console.error("fail to get deputies => ", error);
    return [];
  }
}

export default async function Page() {
  const deputies: FederalDeputyPoliticalInfo[] =
    await getFederalDeputiesPoliticalInfo();

  return (
    <>
      <div className="container px-5 mx-auto mt-5 text-center">
        <h2 className="mb-4 text-4xl font-bold text-gray-700">
          A mudança começa por aqui
        </h2>

        <p className="max-w-2xl mx-auto mb-8 text-lg">
          Se você não acompanhar e não cobrar essas pessoas que estão aqui em
          baixo, o Brasil nunca vai mudar.
        </p>
      </div>

      <DeputiesTable deputies={deputies} />
    </>
  );
}
