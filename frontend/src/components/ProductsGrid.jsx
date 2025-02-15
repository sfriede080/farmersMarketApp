import React, {useState, useEffect} from "react";
import '../styles.css';

export default function ProductsGrid() {

    const [products, setProducts] = useState([]);

    useEffect(() => {
        const m = [
            {'title': "Cookies", 'description': "Chocolate Chip", 'image_path': "cookies.jpg", 'id': 0},
            {'title': "Cake", 'description': "Chocolate", 'image_path': "cookies.jpg", 'id': 1},
            {'title': "Brownies", 'description': "Chocolate Fudge", 'image_path': "cookies.jpg", 'id': 2}];
        setProducts(m);
    }, []);


    return (
        <div className='movies-grid'>
        {products.map(product => (
            <div key = {product.id} className='movie-card'>
                <img src ={`/${product.image_path}`} alt = {product.title}/>
                <div className='movie-card-info'>
                    <h3 className='movie-card-title'>{product.title}</h3>
                    <p className="movie-card-genre">{product.description}</p>
                </div>

            </div>
        ))}
        </div>
    )
}