export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function calculateAge(birthDate) {
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

export function getCurrentDateInfo() {
  const currentDate = new Date();

  const numericMonth = (currentDate.getMonth() + 1).toString().padStart(2, "0");
  const longMonth = currentDate.toLocaleString("pt-BR", { month: "long" });
  const year = currentDate.getFullYear();

  return {
    numericMonth,
    longMonth,
    year,
  };
}

export function getGenderSuffix(gender) {
  const normalizedGender = gender.toLowerCase();

  if (normalizedGender === "m") {
    return "o";
  } else if (normalizedGender === "f") {
    return "a";
  }
}

export function formatMonetaryValue(value) {
  const formattedValue = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

  return formattedValue;
}

export function formatDate(dateString) {
  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid Date";
  }

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear();
  const formattedDate = `${day}/${month}/${year}`;

  return formattedDate;
}

export function calculateTotal(items, costPropertyName) {
  const totalCost = items?.reduce((accumulator, item) => {
    const cost = item[costPropertyName];

    if (typeof cost === "number" && !isNaN(cost)) {
      return accumulator + cost;
    }
    return accumulator;
  }, 0);

  return totalCost;
}

export function formatCPFCNPJ(numbers) {
  const numericInput = numbers.replace(/\D/g, "");

  if (numericInput.length === 11) {
    return numericInput.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
  } else if (numericInput.length === 14) {
    return numericInput.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5"
    );
  } else {
    return "Não informado";
  }
}

export function identifyPerson(numbers) {
  const numericInput = numbers.replace(/\D/g, "");

  if (numericInput.length === 11) {
    return { name: "Pessoa Física", type: 1 };
  } else if (numericInput.length === 14) {
    return { name: "Empresa", type: 0 };
  } else {
    return { name: "Empresa", type: 0 };
  }
}

export function slugify(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function formatPhoneNumberDf(input) {
  const cleaned = input.replace(/\D/g, "");

  const formatted = cleaned.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");

  if (!formatted.startsWith("(61) ")) {
    return "(61) " + formatted;
  }

  return formatted;
}

export function checkNullObject(obj) {
  for (const key in obj) {
    if (obj[key] !== null) {
      return false;
    }
  }
  return true;
}

export function propertyValuesArray(arr, propertyKey, type) {
  if (!Array.isArray(arr)) {
    throw new TypeError("First argument must be an array");
  }
  if (typeof propertyKey !== "string") {
    throw new TypeError("Second argument must be a string");
  }

  return arr
    .map((obj) => {
      if (obj && typeof obj === "object" && obj.hasOwnProperty(propertyKey)) {
        if (type === "number") {
          return Number(obj[propertyKey]);
        }
        return String(obj[propertyKey]);
      }
      return null;
    })
    .filter((value) => value !== null);
}

export function findFirstMp4Url(data) {
  for (let i = 0; i < data.length; i++) {
    const videoLinks = data[i].video_links;

    for (let j = 0; j < videoLinks.length; j++) {
      if (videoLinks[j].mp4_url) {
        return videoLinks[j].mp4_url;
      }
    }
  }

  return null; 
}

//this function is needed to be called in order to bypass Camara's media provider (.mp4 url)
export async function fetchVideos(video_links) {
  video_links.forEach((item) => {
    if (Array.isArray(item.video_links) && item.video_links.length > 0) {
      item.video_links.forEach(async(videoLink) => {
        const url = `https://www.camara.leg.br/evento-legislativo/${item.evento_id}/?${videoLink.video_param}&trechosOrador=${item.deputado}&crawl=no`;

        setTimeout(async()=> {
          await fetch(url)
          .then((response) => {
            console.log("tetando pegar o video ===> ". url);

            if (!response.ok) {
              console.log("Network response was not ok ===> ". url);
            }
            return response.text();
          })
          .then((data) => {
            console.log("processou ==> ", url);
          })
          .catch((error) => {
            console.log("erro fetching response was not ok ===> ". url);
          });
        },249)
      });
    }
  });
}
