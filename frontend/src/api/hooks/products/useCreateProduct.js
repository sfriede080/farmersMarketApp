import { useMutation } from "react-query";
import { createProduct } from "../../services/productService";
import { useQueryClient } from "react-query";

const useCreateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });
};

export default useCreateProduct;
