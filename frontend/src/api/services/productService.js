import { BASE_URL } from "../client";

async function getProducts() {
  const response = await fetch(`${BASE_URL}/products`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function getProductByID(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function getProductsByStatus(status) {
  console.log(status);
  const response = await fetch(`${BASE_URL}/products/status/${status}`);
  console.log(response);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function createProduct(product) {
  const response = await fetch(`${BASE_URL}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });
  console.log(response);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function deleteProductByID(id) {
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function updateProduct({ id, updatedProduct }) {
  console.log(updatedProduct);
  const response = await fetch(`${BASE_URL}/products/${id}`, {
    method: "PATCH", // You could also use 'PUT' depending on your API
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedProduct), // The updated fields of the record
  });

  if (!response.ok) {
    throw new Error("Error updating record");
  }

  return response.json(); // Assuming the API returns the updated record
}

export {
  getProducts,
  getProductByID,
  getProductsByStatus,
  createProduct,
  deleteProductByID,
  updateProduct,
};
