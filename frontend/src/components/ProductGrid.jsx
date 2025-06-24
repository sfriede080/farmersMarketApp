import React from "react";
import "../styles/styles.css";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ProductItem from "./ProductItem";
import useProducts from "../api/hooks/products/useProducts";
import { useState } from "react";
export default function ProductGrid() {
  const { data, isLoading, error } = useProducts();
  const [status, setStatus] = useState(0);

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const statusOptions = [
    { key: 0, label: "ALL" },
    { key: 1, label: "CURRENT" },
    { key: 2, label: "PAST" },
    { key: 3, label: "UPCOMING" },
  ];

  const handleStatusFilterChange = (e) => {
    setStatus(e.target.value);
  };

  const matchesStatus = (product, status) => {
    return (
      status == 0 ||
      statusOptions.find((option) => option.key == status)?.label ===
        product.status
    );
  };

  const filteredProducts = data.data.filter((product) =>
    matchesStatus(product, status)
  );

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 2, // optional, default to 1.
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 3,
      slidesToSlide: 3, // optional, default to 1.
    },
    mobile: {
      breakpoint: { max: 767, min: 464 },
      items: 2,
      slidesToSlide: 1, // optional, default to 1.
    },
  };

  return (
    <div>
      <div className="filter-bar">
        <div className="filter-slot">
          <select
            className="filter-dropdown"
            value={status}
            onChange={handleStatusFilterChange}
          >
            {statusOptions.map((option) => (
              <option value={option.key} key={option.key}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="product-list">
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          infinite={false}
          partialVisible={false}
          sliderClass="carouselUL"
        >
          {filteredProducts.map((product) => (
            <ProductItem product={product} key={product.ID}></ProductItem>
          ))}
        </Carousel>
      </div>
    </div>
  );
}
