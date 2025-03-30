import { useQuery } from "react-query";
import { getProducts } from "../../services/productService";

function useProducts() {
  return useQuery(["products"], getProducts);
}

export default useProducts;
