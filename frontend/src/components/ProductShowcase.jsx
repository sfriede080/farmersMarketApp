import React, {useState} from "react";
import '../styles.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from "./ProductCard";
import useProducts from "../api/hooks/useProducts";
import useProductCategories from "../api/hooks/useProductCategories";
export default function ProductShowcase() {

  const { data: products, isLoading: productsIsLoading, error: productsError } = useProducts();
  const { data: productCategories, isLoading: productCategoriesIsLoading, error: productCategoriesError } = useProductCategories();

  const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 4 // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 768 },
        items: 3,
        slidesToSlide: 3 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 767, min: 464 },
        items: 2,
        slidesToSlide: 1 // optional, default to 1.
      }
    };

    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("0")

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value)
    }

    const handleCategoryFilterChange = (e) => {
      setCategory(e.target.value)
    }
    
    const matchesType = (product, category) => {
      return (category === "0" || 
      product.category_FK == category)
    }

    const matchesSearchTerm = (product, searchTerm) => {
      return (product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm))
    }

     
  if (productsIsLoading || productCategoriesIsLoading) return <p>Loading products...</p>;
  if (productsError) return <p>{productsError.status} Error: {productsError.message}</p>;
  if (productCategoriesError) return <p>{productCategoriesError.status} Error: {productCategoriesError.message}</p>;


  const filteredProducts = products.data.filter((product) => 
    matchesType(product, category) && matchesSearchTerm(product, searchTerm)
  )

    return (
      <div>
        <input 
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
          ></input>

        <div className="filter-bar">
          <div className="filter-slot">
            <select className="filter-dropdown" value={category} onChange={handleCategoryFilterChange}>
              <option value ="0">All Products</option>
              {productCategories.data.map((category) => (
                <option value = {category.ID}>{category.category}</option>
              ))}
            </select>
          </div>
        </div>


         <div className="parent">
            <Carousel 
            responsive={responsive}
            swipeable={true}
            draggable={true}
            infinite={true}
            partialVisible={false}
            >
                        {filteredProducts.map(product => (
                            <ProductCard product={product} key={product.id}></ProductCard>
                        ))}
            </Carousel>
          </div>
      </div>
    )
}