import { getRandomPage } from "./helpers";

const TOKEN = "";
const URL = "https://api.dev.nuuvem.co/v3/br";

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    Accept: "application/vnd.api+json",
    "Accept-Language": "en",
  },
};

async function getSampleProduct({
  numOfCharacters = 8,
  perPage = 50,
  allPages,
  excludedPages = [],
} = {}) {
  const pages = allPages === undefined ? await getAllPages(perPage) : allPages;
  const page = getRandomPage(pages, excludedPages);

  const { data } = await getProducts(page, perPage);
  const words = data.filter(
    (word) => word.attributes.name.trim().length === numOfCharacters
  );

  if (words.length >= 1) {
    console.log(words);
    return words;
  } else {
    return await getSampleProduct({
      numOfCharacters: numOfCharacters,
      perPage: perPage,
      allPages: pages,
      excludedPages: [...excludedPages, page],
    });
  }
}

async function getProducts(page = 1, perPage = 25) {
  return fetch(
    `${URL}/products?page[number]=${page}&page[size]=${perPage}`,
    options
  )
    .then((response) => response.json())
    .then((data) => data);
}

async function getAllPages(perPage = 25) {
  const data = await getProducts(1, perPage);

  return data.meta.pagination.last;
}

export { getSampleProduct };
