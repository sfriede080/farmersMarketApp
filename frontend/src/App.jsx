import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductsGrid from './components/ProductsGrid'
import ProductsList from './components/ProductsList'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

function App() {
  const [products, setProducts] = useState([]);
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

  return (
    <>
      <div className = "App">

        <div className='container'>
          <Header></Header>

          <Router>
            <nav>
              <ul>
                <li>
                  <Link to="/">Home</Link>
                  <Link to="/products">Preorder</Link>
                </li>
              </ul>
            </nav>
            <Routes>
              <Route path="/" element={<ProductsList/>}></Route>
              <Route path="/products" element={<ProductsGrid products={products}/>}></Route>
            </Routes>
          </Router>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
