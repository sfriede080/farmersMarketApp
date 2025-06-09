import { BASE_URL } from "../client";

async function getProductCategories() {
  const response = await fetch(`${BASE_URL}/productCategories`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export { getProductCategories };
