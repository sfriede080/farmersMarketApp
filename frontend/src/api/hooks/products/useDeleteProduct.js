import { useMutation } from "react-query";
import { deleteProductByID } from "../../services/productService";

const useDeleteProduct = () => {
  return useMutation(deleteProductByID);
};

export default useDeleteProduct;
