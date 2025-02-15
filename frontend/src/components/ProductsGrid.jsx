import React, {useState, useEffect} from "react";
import '../styles.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

export default function ProductsGrid() {

    const responsive = {
        superLargeDesktop: {
          // the naming can be any, depends on you.
          breakpoint: { max: 4000, min: 3000 },
          items: 5
        },
        desktop: {
          breakpoint: { max: 3000, min: 1024 },
          items:4 
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1
        }
      };

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const m = [
            {'title': "Cookies", 'description': "Chocolate Chip", 'image_path': "cookies.jpg", 'id': 0},
            {'title': "Cake", 'description': "Chocolate", 'image_path': "cookies.jpg", 'id': 1},
            {'title': "Brownies", 'description': "Chocolate Fudge", 'image_path': "cookies.jpg", 'id': 2},
            {'title': "Cookies", 'description': "Chocolate Chip", 'image_path': "cookies.jpg", 'id': 0},
            {'title': "Cake", 'description': "Chocolate", 'image_path': "cookies.jpg", 'id': 1},
            {'title': "Brownies", 'description': "Chocolate Fudge", 'image_path': "cookies.jpg", 'id': 2}];
        setProducts(m);
    }, []);


    return (
        <div className="gd-carousel-wrapper">
        <Carousel 
         responsive={responsive}
         showDots={true}
         ssr={true}
         customTransition="all .5"
         transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-20-px"
        partialVisbile={true}
         >
                    {products.map(product => (
                        <div key = {product.id} className='card'>
                            <img src ={`/${product.image_path}`} alt = {product.title}/>
                            <div className='card-content'>
                                <h2>{product.title}</h2>
                                <p>{product.description}</p>
                                <a href="#" class="button">
                                    Add to Cart
                                </a>
                            </div>
                        </div>
                    ))}
        </Carousel>
        </div>
    )
}