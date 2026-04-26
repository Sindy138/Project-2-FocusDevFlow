import { NavLink, useLocation } from "react-router-dom";
import { useContext } from "react";
import { FiBarChart2, FiFolder, FiClock } from "react-icons/fi";
import { Cloud } from "lucide-react";
import { WeatherContext } from "../../context/WeatherContext";
import "./Navbar.css";

const Navbar = () => {
  const location = useLocation();
  const { togglePopup } = useContext(WeatherContext);
  const isHome = location.pathname === "/";
  const isWrapUp = location.pathname === "/wrap-up";
  const isProjects = location.pathname === "/projects";

  return (
    <nav className="nav-bottom">
      <ul className="nav-list">
        {/* Timer - Solo en WrapUp y Projects */}
        {(isWrapUp || isProjects) && (
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive ? "nav-item active" : "nav-item"
              }
            >
              <FiClock className="nav-icon" />
              <span className="nav-label">Timer</span>
            </NavLink>
          </li>
        )}

        {/* Daily Log - En todas las páginas */}
        <li>
          <NavLink
            to="/wrap-up"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FiBarChart2 className="nav-icon" />
            <span className="nav-label">Daily Log</span>
          </NavLink>
        </li>

        {/* Projects - En todas las páginas */}
        <li>
          <NavLink
            to="/projects"
            className={({ isActive }) =>
              isActive ? "nav-item active" : "nav-item"
            }
          >
            <FiFolder className="nav-icon" />
            <span className="nav-label">Projects</span>
          </NavLink>
        </li>

        {/* Weather - En todas las páginas */}
        <li>
          <button
            className="nav-item nav-weather-btn"
            onClick={togglePopup}
            title="Weather"
          >
            <Cloud size={24} className="nav-icon" />
            <span className="nav-label">Weather</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
