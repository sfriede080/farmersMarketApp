import "./styles/App.css";
import "./styles/styles.css";
import Footer from "./components/Footer";
import ProductShowcase from "./components/ProductShowcase";
import Home from "./components/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductEditor from "./components/ProductEditor";
import ProductForm from "./components/ProductForm";
import UserContext from "./context/UserContext";
import { QueryClient, QueryClientProvider } from "react-query";
import NavigationBar from "./components/NavigationBar";
import { useAuth0 } from "@auth0/auth0-react";
import UserProfile from "./components/UserProfile";

const queryClient = new QueryClient();

export default function App() {
  const { user, isAuthenticated, isLoading } = useAuth0();

  const userContextValue = {
    user: { ...user, isAdmin: true },
    isAuthenticated: isAuthenticated,
    isLoading: isLoading,
  };

  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={userContextValue}>
        <Router>
          <NavigationBar />
          <div className="App">
            <div>
              <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/profile" element={<UserProfile />}></Route>
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
      </UserContext.Provider>
    </QueryClientProvider>
  );
}
