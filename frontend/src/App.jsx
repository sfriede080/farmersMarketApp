import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './styles.css'
import Header from './components/Header'
import Footer from './components/Footer'
import ProductsGrid from './components/ProductsGrid'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className = "App">

        <div className='container'>
          <Header></Header>
          <ProductsGrid></ProductsGrid>
        </div>
        <Footer></Footer>
      </div>
    </>
  )
}

export default App
