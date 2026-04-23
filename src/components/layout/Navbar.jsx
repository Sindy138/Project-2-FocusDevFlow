import { NavLink } from "react-router-dom";
import { FiBarChart2, FiFolder } from "react-icons/fi";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="nav">
      <ul className="list">
        <li>
          <NavLink
            to="/wrap-up"
            className={({ isActive }) => (isActive ? "active" : "link")}
          >
            <FiBarChart2 className="icon" />
            <span>Daily</span>
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) => (isActive ? "active" : "link")}
          >
            <FiFolder className="icon" />
            <span>Projects</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
