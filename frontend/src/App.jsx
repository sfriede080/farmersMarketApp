import './App.css'
import './styles.css'
import Footer from './components/Footer'
import ProductShowcase from './components/ProductShowcase'
import Home from './components/Home'
import {BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";
import ProductEditor from './components/ProductEditor'
import ProductForm from './components/ProductForm'
import UserContext from './context/UserContext'
import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import NavigationBar from './components/NavigationBar'

const queryClient = new QueryClient()

export default function App() {

  const user = {name: "Admin", isAdmin: true}
  return (
    <QueryClientProvider client={queryClient}>
    <UserContext.Provider value = {user}>
            <Router>
              <NavigationBar/>
              <div className = "App">
                <div>
                  <Routes>
                    <Route path="/" element={<Home/>}></Route>
                    <Route path="/products" element={<ProductShowcase/>}></Route>
                    <Route path="/products/edits" element={<ProductEditor/>}></Route>
                    <Route path="/products/edits/add" element={<ProductForm/>}></Route>
                    <Route path="/products/edits/update:id" element={<ProductForm></ProductForm>}></Route>
                  </Routes>
                  </div>
              </div>
            </Router>
          <Footer></Footer>
      </UserContext.Provider>
      </QueryClientProvider>
  )
}
