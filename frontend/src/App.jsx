import { useState, useEffect, useReducer } from 'react'
import './App.css'
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductShowcase from './components/ProductShowcase'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import ProductEditor from './components/ProductEditor'
import productReducer from './reducers/productReducer'
import ProductForm from './components/ProductForm'
import UserContext from './context/UserContext'
import { getProducts } from './api/services/productService'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'

const queryClient = new QueryClient()

export default function App() {

  const user = {name: "Admin", isAdmin: true}
  return (
    <QueryClientProvider client={queryClient}>
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
                <Route path="/" element={<Home/>}></Route>
                <Route path="/products" element={<ProductShowcase/>}></Route>
                <Route path="/products/edits" element={<ProductEditor/>}></Route>
                <Route path="/products/edits/add" element={<ProductForm/>}></Route>
                <Route path="/products/edits/update:id" element={<ProductForm></ProductForm>}></Route>
              </Routes>
            </Router>
          </div>
          <Footer></Footer>
        </div>
      </UserContext.Provider>
      </QueryClientProvider>
  )
}
