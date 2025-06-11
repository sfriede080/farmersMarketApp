import React, { useState } from "react";
import "../styles/styles.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductCard from "./ProductCard";
import useProductsByStatus from "../api/hooks/products/useProductsByStatus";
import useProductCategories from "../api/hooks/productCategories/useProductCategories";

export default function ProductShowcase() {
  const {
    data: products,
    isLoading: productsIsLoading,
    error: productsError,
  } = useProductsByStatus("CURRENT");

  const {
    data: productCategories,
    isLoading: productCategoriesIsLoading,
    error: productCategoriesError,
  } = useProductCategories();

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 1, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("0");

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategory(e.target.value);
  };

  const matchesType = (product, category) => {
    return category === "0" || product.category_FK == category;
  };

  const matchesSearchTerm = (product, searchTerm) => {
    return (
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm)
    );
  };

  if (products.data.length == 0) {
    return (
      <>
        <h3>
          Currently, there are no items available for preorder. Please check
          again later!
        </h3>
      </>
    );
  }

  if (productsIsLoading || productCategoriesIsLoading)
    return <p>Loading products...</p>;
  if (productsError)
    return (
      <p>
        {productsError.status} Error: {productsError.message}
      </p>
    );
  if (productCategoriesError)
    return (
      <p>
        {productCategoriesError.status} Error: {productCategoriesError.message}
      </p>
    );

  const filteredProducts = products.data.filter(
    (product) =>
      matchesType(product, category) && matchesSearchTerm(product, searchTerm)
  );

  return (
    <div>
      <div className="search-options">
        <input
          type="text"
          placeholder="Search products..."
          className="search-input"
          value={searchTerm}
          onChange={handleSearchChange}
        ></input>

        <div className="filter-bar">
          <div className="filter-slot">
            <select
              className="filter-dropdown"
              value={category}
              onChange={handleCategoryFilterChange}
            >
              <option value="0">All Products</option>
              {productCategories.data.map((category) => (
                <option value={category.ID} key={category.ID}>
                  {category.category}s
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {filteredProducts.length == 0 ? (
        <div className="product-list">
          <p>No products found :(</p>
        </div>
      ) : (
        <div className="product-list">
          <Carousel
            responsive={responsive}
            swipeable={true}
            draggable={true}
            infinite={true}
            partialVisible={false}
            sliderClass="carouselUL"
          >
            {filteredProducts.map((product) => (
              <ProductCard product={product} key={product.ID}></ProductCard>
            ))}
          </Carousel>
        </div>
      )}
    </div>
  );
}
