import { BASE_URL } from "../client";

async function getProductCategories() {
  const response = await fetch(`${BASE_URL}/productCategories`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function createProductCategory({ category, description }) {
  const response = await fetch(`${BASE_URL}/productCategories`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ category, description }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export { getProductCategories, createProductCategory };
