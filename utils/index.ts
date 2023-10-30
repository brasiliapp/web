import type { Expense } from "@/interfaces";
import type { Cpf, Cnpj } from "@/types";

import axios from "axios";

export function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function calculateAge(birthDate: Date): number {
  const currentDate = new Date();
  const birthYear = new Date(birthDate).getFullYear();
  const currentYear = currentDate.getFullYear();

  let age = currentYear - birthYear;

  const birthMonth = new Date(birthDate).getMonth();
  const currentMonth = currentDate.getMonth();
  const birthDay = new Date(birthDate).getDate();
  const currentDay = currentDate.getDate();

  if (
    currentMonth < birthMonth ||
    (currentMonth === birthMonth && currentDay < birthDay)
  ) {
    age--;
  }

  return age;
}

export function getCurrentDateInfo(): {
  numericMonth: number;
  longMonth: string;
  year: number;
} {
  const currentDate = new Date();

  const numericMonth = parseInt(
    (currentDate.getMonth() + 1).toString().padStart(2, "0"),
  );
  const longMonth = currentDate.toLocaleString("pt-BR", { month: "long" });
  const year = currentDate.getFullYear();

  return {
    numericMonth,
    longMonth,
    year,
  };
}

export function getGenderSuffix(gender: string): "a" | "o" {
  const normalizedGender = gender.toLowerCase();

  return normalizedGender === "m" ? "o" : "a";
}

export function formatMonetaryValue(value: number): `R$ ${number}` {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  return formattedValue as `R$ ${number}`;
}

export function formatDate(
  dateString: string,
): "Invalid Date" | `${number}/${number}/${number}` {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate as `${number}/${number}/${number}`;
}

export function getTotalExpense(expenses: Expense[]): number {
  const totalCost = expenses.reduce((accumulator: number, expense: Expense) => {
    const cost = expense["valorLiquido"];

    return accumulator + cost;
  }, 0);

  return totalCost;
}

export function formatCPFCNPJ(numbers: string): Cpf | Cnpj | "Não informado" {
  const numericInput = numbers.replace(/\D/g, "");

  if (numericInput.length === 11) {
    return numericInput.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4",
    ) as Cpf;
  }
  if (numericInput.length === 14) {
    return numericInput.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5",
    ) as Cnpj;
  }
  return "Não informado";
}

export function identifyPerson(
  numbers: Cpf | Cnpj,
): "Pessoa Física" | "Empresa" {
  const numericInput = numbers.replace(/\D/g, "");

  return numericInput.length === 11 ? "Pessoa Física" : "Empresa";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getFormatedPhoneNumber(
  phoneNumber: `${number}-${number}` | `${number}`,
): `(61) ${number}` {
  const cleaned = phoneNumber.replace(/\D/g, "");

  const formatted = cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");

  if (!formatted.startsWith("(61) ")) {
    return `(61) ${formatted}` as `(61) ${number}`;
  }

  return formatted as `(61) ${number}`;
}

export function checkNullObject(obj: Object): boolean {
  for (const key in obj) {
    if (obj[key] !== null) {
      return false;
    }
  }
  return true;
}

// this function is needed to be called in order to bypass Camara's media provider (.mp4 url)
export async function fetchVideos(video_links) {
  console.log("Trying fetch videos", video_links);
  video_links.forEach((item) => {
    if (item.video_links.length > 0) {
      item.video_links.forEach(async (videoLink) => {
        const url = `https://www.camara.leg.br/evento-legislativo/${item.evento_id}/?${videoLink.video_param}&trechosOrador=${item.deputado}&crawl=no`;

        setTimeout(async () => {
          await axios
            .get(url)
            .then((response) => {
              console.log("tetando pegar o video ===> ".url);

              if (!response.ok) {
                console.log("Network response was not ok ===> ".url);
              }
              return response.text();
            })
            .then((data) => {
              console.log("processou ==> ", url);
            })
            .catch((error) => {
              console.log("erro fetching response was not ok ===> ".url);
            });
        }, 249);
      });
    }
  });
}

export function getCapitalizedPhrase(phrase: string): string {
  const wordsFromPhrase = phrase.split(" ");

  const capitalizedPhrase = wordsFromPhrase
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

  return capitalizedPhrase;
}

export function removeDotsFromPhrase(phrase: string): string {
  return phrase.replaceAll(".", "");
}
