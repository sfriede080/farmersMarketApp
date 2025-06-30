import { BASE_URL } from "../client";

async function addPreorderItem(userId, productId, quantity) {
  const response = await fetch(`${BASE_URL}/preorder/add/${userId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ productId, quantity }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

async function getPreorder(userId, status) {
  const response = await fetch(`${BASE_URL}/preorder/${userId}/${status}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  const res = await response.json();
  return res;
}

async function deletePreorderItem(userId, productId) {
  const response = await fetch(`${BASE_URL}/preorder/${userId}/${productId}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export { addPreorderItem, getPreorder, deletePreorderItem };
