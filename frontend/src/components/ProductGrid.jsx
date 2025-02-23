import React, {useState} from "react";
import '../styles.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ProductItem from "./ProductItem";

export default function ProductGrid({products, dispatch}) {

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


    return (
      <div>
         <div className="parent">
            <Carousel 
            responsive={responsive}
            swipeable={true}
            draggable={true}
            infinite={true}
            partialVisible={false}
            >
                        {products.map(product => (
                            <ProductItem product={product} dispatch={dispatch} key={product.id}></ProductItem>
                        ))}
            </Carousel>
          </div>
      </div>
    )
}