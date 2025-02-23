import { useState, useEffect, useReducer } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductShowcase from './components/ProductShowcase'
import ProductsList from './components/ProductsList'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import ProductEditor from './components/ProductEditor'
import productReducer from './reducers/productReducer'
import ProductForm from './components/ProductForm'
import UserContext from './context/UserContext'

export default function App() {

  const user = {name: "Admin", isAdmin: true}

  const initialState = {
    products: [
      {'name': "Cookies", 'category':"1", 'description': "Chocolate Chip", 'image': "cookies.jpg", 'id': 0, "status": "1", "unit": "dozen", "unitsInStock": 0, "price": 10.00},
      {'name': "Cake", 'category':"2",'description': "Chocolate", 'image': "cookies.jpg", 'id': 1, "status": "1", "unit": "dozen", "unitsInStock": 0, "price": 10.00},
      {'name': "Brownies", 'category':"3",'description': "Chocolate Fudge", 'image': "cookies.jpg", 'id': 2, "status": "1", "unit": "dozen", "unitsInStock": 0, "price": 10.00},
      {'name': "Cookies", 'category':"1", 'description': "Chocolate Chip", 'image': "cookies.jpg", 'id': 3, "status": "1", "unit": "dozen", "unitsInStock": 0, "price": 10.00},
      {'name': "Cake", 'category':"2",'description': "Chocolate", 'image': "cookies.jpg", 'id': 4, "status": "1", "unit": "dozen", "unitsInStock": 0, "price": 10.00},
      {'name': "Brownies", 'category':"3",'description': "Chocolate Fudge", 'image': "cookies.jpg", 'id': 5, "status": "1", "unit": "dozen", "unitsInStock": 0, "price": 10.00},
    ]
  }
  const [state, dispatch] = useReducer(productReducer, initialState)

  return (
    <UserContext.Provider value = {user}>
        <div className = "App">
          <div className='container'>
            <Header></Header>
            <Router>
              <nav>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                    <Link to="/products">Preorder</Link>
                    {user.isAdmin && <Link to="/products/edits">Edit Products</Link>}
                  </li>
                </ul>
              </nav>
              <Routes>
                <Route path="/" element={<ProductsList/>}></Route>
                <Route path="/products" element={<ProductShowcase/>}></Route>
                <Route path="/products/edits" element={<ProductEditor products={state["products"]} dispatch = {dispatch}/>}></Route>
                <Route path="/products/edits/add" element={<ProductForm dispatch = {dispatch}/>}></Route>
                <Route path="/products/edits/update:id" element={<ProductForm dispatch = {dispatch}></ProductForm>}></Route>
              </Routes>
            </Router>
          </div>
          <Footer></Footer>
        </div>
      </UserContext.Provider>
  )
}
