import { useQuery } from "react-query";
import { getProductsByStatus } from "../../services/productService";

function useProductsByStatus(status) {
  return useQuery(["products", status], () => getProductsByStatus(status), {
    enabled: !!status, // Only run the query if status is provided
  });
}

export default useProductsByStatus;
