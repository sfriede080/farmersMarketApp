import React, {useState, useEffect} from "react";
import '../styles.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from "./ProductCard";
import { getProducts } from "../services/productService";

export default function ProductShowcase() {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((result) => {
      setProducts(result.data.data);
    })
    .catch(err => {
      console.log(err);
    });
  }, [])


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
      product.category === category)
    }

    const matchesSearchTerm = (product, searchTerm) => {
      return (product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm))
    }

    const filteredProducts = products.filter((product) => 
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
              <option value = "1">Cookies</option>
              <option value = "2">Cakes</option>
              <option value = "3">Other</option>
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