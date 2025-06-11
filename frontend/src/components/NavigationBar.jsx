import { useContext } from "react";
import { Link } from "react-router-dom";
import UserContext from "../context/UserContext";
import "../styles/NavigationBar.css";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";
import logo from "../assets/logo.png";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavigationBar() {
  const { user, isAuthenticated, isLoading } = useContext(UserContext);
  return (
    <nav className="nav">
      <div className="navbar-left">
        <Link className="site-title" to="/">
          {" "}
          <img
            src={logo}
            background-color="white"
            width="200px"
            alt="Lily & Loaves"
          />{" "}
        </Link>

        <Link className="nav-link" to="/products">
          Preorder
        </Link>

        {user.isAdmin && (
          <Link className="nav-link" to="/products/edits">
            Edit Products
          </Link>
        )}
      </div>

      <h2 className="center-title"> Homemade baked goods and pastries. </h2>

      <div className="navbar-right">
        {!isAuthenticated ? (
          <LoginButton className="nav-link" />
        ) : (
          <>
            <Link className="nav-link" to="/profile">
              Profile
            </Link>
            <LogoutButton className="nav-link" />
          </>
        )}
      </div>
    </nav>
  );
}
