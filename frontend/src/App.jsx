import "./styles/App.css";
import "./styles/styles.css";
import Footer from "./components/Footer";
import ProductShowcase from "./components/ProductShowcase";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductEditor from "./components/ProductEditor";
import ProductForm from "./components/ProductForm";
import UserContext from "./context/UserContext.js";
import NavigationBar from "./components/NavigationBar";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfile from "./components/UserProfile";
import useSyncUser from "./api/hooks/users/useSyncUser";
import { CartProvider } from "./context/CartContext.jsx";
import Cart from "./components/Cart";
export default function App() {
  const {
    user,
    isAuthenticated,
    isLoading: auth0Loading,
    getAccessTokenSilently,
  } = useAuth0();

  const { data: finalUser, isLoading: dbUserLoading } = useSyncUser({
    user,
    getAccessTokenSilently,
    isAuthenticated,
  });

  const isLoading = auth0Loading || dbUserLoading;

  if (isLoading) return <div>Loading...</div>;

  const userContextValue = {
    user: { ...finalUser },
    isLoading: isLoading,
    isAuthenticated: isAuthenticated,
    isAdmin: true,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      <CartProvider userId={userContextValue.user.ID}>
        <Router>
          <NavigationBar />
          <div className="App">
            <div>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/profile" element={<UserProfile />}></Route>
                <Route path="/cart" element={<Cart />}></Route>
                <Route path="/products" element={<ProductShowcase />}></Route>
                <Route
                  path="/products/edits"
                  element={<ProductEditor />}
                ></Route>
                <Route
                  path="/products/edits/add"
                  element={<ProductForm />}
                ></Route>
                <Route
                  path="/products/edits/update:id"
                  element={<ProductForm></ProductForm>}
                ></Route>
              </Routes>
            </div>
          </div>
        </Router>
        <Footer></Footer>
      </CartProvider>
    </UserContext.Provider>
  );
}
