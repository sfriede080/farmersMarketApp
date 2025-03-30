import { useMutation } from "react-query";
import { createProduct } from "../../services/productService";

const useCreateProduct = () => {
  return useMutation(createProduct);
};

export default useCreateProduct;
