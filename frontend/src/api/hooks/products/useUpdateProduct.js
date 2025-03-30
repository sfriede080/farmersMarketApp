import { useMutation } from "react-query";
import { updateProduct } from "../../services/productService";

const useUpdateProduct = () => {
  return useMutation(updateProduct);
};

export default useUpdateProduct;
