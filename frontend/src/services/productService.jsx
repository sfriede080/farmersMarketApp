import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
})

const getProducts = () => api.get("products");
const getProductByID = (id) => api.get('products/${id}');
const createProduct = () => api.post("products");
const deleteProductByID = (id) => api.delete('products/${id}');

export {getProducts, getProductByID, createProduct, deleteProductByID}