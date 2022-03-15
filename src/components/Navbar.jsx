import { Link } from "react-router-dom";
import "./Navbar.css";

export const Navbar = () => {
    return (
        <div id="navBar">
            <div id="nav1">
                <div><Link to="/" className="link">Home</Link></div>
                <div><Link to="/completed" className="link">Completed</Link></div>
            </div>
        </div>
    )
}