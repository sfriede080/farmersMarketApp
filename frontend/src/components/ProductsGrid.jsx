import React, {useState, useEffect} from "react";
import '../styles.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductCard from "./ProductCard";

export default function ProductsGrid() {

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

    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [productType, setProductType] = useState("All Products");


    useEffect(() => {
        const m = [
            {'title': "Cookies", 'productType':"Cookies", 'description': "Chocolate Chip", 'image_path': "cookies.jpg", 'id': 0},
            {'title': "Cake", 'productType':"Cakes",'description': "Chocolate", 'image_path': "cookies.jpg", 'id': 1},
            {'title': "Brownies", 'productType':"Other",'description': "Chocolate Fudge", 'image_path': "cookies.jpg", 'id': 2},
            {'title': "Cookies", 'productType':"Cookies", 'description': "Chocolate Chip", 'image_path': "cookies.jpg", 'id': 3},
            {'title': "Cake", 'productType':"Cakes",'description': "Chocolate", 'image_path': "cookies.jpg", 'id': 4},
            {'title': "Brownies", 'productType':"Other",'description': "Chocolate Fudge", 'image_path': "cookies.jpg", 'id': 5},
        ]
        setProducts(m);
    }, []);

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value)
    }

    const handleProductTypeFilterChange = (e) => {
      setProductType(e.target.value)
    }

    const matchesType = (product, productType) => {
      return (productType === "All Products" || 
      product.productType === productType)
    }

    const matchesSearchTerm = (product, searchTerm) => {
      return (product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm))
    }

    const filteredProducts = products.filter((product) => 
      matchesType(product, productType) && matchesSearchTerm(product, searchTerm)
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
            <select className="filter-dropdown" value={productType} onChange={handleProductTypeFilterChange}>
              <option>All Products</option>
              <option>Cookies</option>
              <option>Cakes</option>
              <option>Other</option>
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