import { useMutation } from "react-query";
import { deleteProductByID } from "../../services/productService";
import { useQueryClient } from "react-query";

const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductByID,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export default useDeleteProduct;
