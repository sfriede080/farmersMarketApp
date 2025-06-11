import { useMutation } from "react-query";
import { createProductCategory } from "../../services/productCategoryService";
import { useQueryClient } from "react-query";

const useCreateProducCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createProductCategory,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["productCategories"] });
      return data;
    },
  });
};

export default useCreateProducCategory;
