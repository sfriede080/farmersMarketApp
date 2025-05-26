import { useContext } from "react";
import { Link} from "react-router-dom";
import UserContext from "../context/UserContext";
import "./NavigationBar.css";

export default function NavigationBar() {
    const user = useContext(UserContext);
    return (
        <nav className="nav">
            <Link className="site-title" to="/"> <img src="../../public/logo1(smaller).png"  background-color="white" width="200px" alt='Lily & Loaves'/> </Link>
            <h2 className = 'app-subtitle'> Homemade baked goods and pastries. </h2>
            <ul>
                <li>   
                    <Link className="" to="/products">Preorder</Link>
                </li>
                    {user.isAdmin && (<li><Link to="/products/edits">Edit Products</Link></li>)}
            </ul>

        </nav>
    );
};
