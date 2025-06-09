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
      <Link className="site-title" to="/">
        {" "}
        <img
          src={logo}
          background-color="white"
          width="200px"
          alt="Lily & Loaves"
        />{" "}
      </Link>

      <ul>
        <li>
          <Link className="" to="/products">
            Preorder
          </Link>
        </li>
        {user.isAdmin && (
          <li>
            <Link to="/products/edits">Edit Products</Link>
          </li>
        )}
      </ul>
      <h2 className="app-subtitle"> Homemade baked goods and pastries. </h2>
      <ul>
        {!isAuthenticated ? (
          <li>
            <LoginButton />
          </li>
        ) : (
          <li>
            <LogoutButton />
          </li>
        )}
        {isAuthenticated && (
          <li>
            <Link className="" to="/profile">
              Profile
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}
