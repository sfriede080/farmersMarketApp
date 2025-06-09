import { useMutation } from "react-query";
import { updateProduct } from "../../services/productService";
import { useQueryClient } from "react-query";

const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export default useUpdateProduct;
