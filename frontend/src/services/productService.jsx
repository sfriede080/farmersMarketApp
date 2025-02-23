import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:5000",
})

const getProducts = () => api.get("products");
const createProduct = () => api.post("products");
const deleteProduct = (id) => api.delete('products/${id}');

export {getProducts, deleteProduct}