import { useQuery } from "react-query";
import { getProductByID } from "../../services/productService";

function useProduct(productID) {
  return useQuery(["product", productID], () => getProductByID(productID), {
    enabled: !!productID, // Only run the query if productID is provided
  });
}

export default useProduct;
