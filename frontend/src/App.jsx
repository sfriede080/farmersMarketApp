import "./styles/App.css";
import "./styles/styles.css";
import Footer from "./components/Footer";
import ProductShowcase from "./components/ProductShowcase";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductEditor from "./components/ProductEditor";
import ProductForm from "./components/ProductForm";
import UserContext from "./context/UserContext";
import NavigationBar from "./components/NavigationBar";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfile from "./components/UserProfile";
import useSyncUser from "./api/hooks/users/useSyncUser";
import { useEffect } from "react";

export default function App() {
  const { user, isAuthenticated, isLoading, getAccessTokenSilently } =
    useAuth0();

  const syncUserMutation = useSyncUser({ user, getAccessTokenSilently });

  useEffect(() => {
    if (isAuthenticated && user) {
      syncUserMutation.mutate();
    }
  }, [isAuthenticated, user]);

  const userContextValue = {
    user: { ...user, isAdmin: true },
    isAuthenticated: isAuthenticated,
    isLoading: isLoading,
  };

  console.log(userContextValue);

  return (
    <UserContext.Provider value={userContextValue}>
      <Router>
        <NavigationBar />
        <div className="App">
          <div>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/profile" element={<UserProfile />}></Route>
              <Route path="/products" element={<ProductShowcase />}></Route>
              <Route path="/products/edits" element={<ProductEditor />}></Route>
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
    </UserContext.Provider>
  );
}
