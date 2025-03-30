import { BASE_URL } from "../client";

async function getProducts() {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
  };


const getProductByID = (id) => api.get('products/${id}');
const createProduct = async (product) => {
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product)
    };
    
    fetch(`${BASE_URL}/products`, options)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
};
const deleteProductByID = (id) => api.delete('products/${id}');

export {getProducts, getProductByID, createProduct, deleteProductByID}