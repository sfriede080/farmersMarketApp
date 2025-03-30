import { useQuery } from "react-query";
import { getProductCategories } from "../../services/productCategoryService";

function useProductCategories() {
  return useQuery(["productCategories"], getProductCategories);
}

export default useProductCategories;
