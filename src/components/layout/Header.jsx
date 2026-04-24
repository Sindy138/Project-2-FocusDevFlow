import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import {
  FiArrowRight,
  FiArrowLeft,
  FiSearch,
  FiBarChart2,
  FiFolder,
} from "react-icons/fi";
import { Cloud } from "lucide-react";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import { WeatherContext } from "../../context/WeatherContext";
import Navbar from "./Navbar";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const { togglePopup } = useContext(WeatherContext);
  const [searchParams, setSearchParams] = useSearchParams();
  const isTabletOrDesktop = useMediaQuery("(min-width: 769px)");
  const isHome = location.pathname === "/";
  const isWrapUp = location.pathname === "/wrap-up";
  const isProjects = location.pathname === "/projects";

  const handleSearchChange = (e) => {
    const query = e.target.value;
    if (query.trim()) {
      setSearchParams({ q: query });
    } else {
      setSearchParams({});
    }
  };

  const searchQuery = searchParams.get("q") || "";

  return (
    <header className={`header ${isProjects ? "projects-page" : ""}`}>
      {(isHome || isWrapUp || isProjects) && (
        <>
          <div className="header-branding">
            <h1 className="logo">
              <Link to="/">FocusFlow</Link>
            </h1>
            <h2 className="app-subtitle">Master your flow state.</h2>
          </div>
        </>
      )}

      {isProjects && (
        <div className="header-nav-section">
          <FiArrowLeft size={16} />
          <Link to="/wrap-up" style={{ textDecoration: "none" }}>
            Daily Wrap
            <FiBarChart2
              size={22}
              style={{ marginLeft: "0.5rem", color: "var(--color-focus-main)" }}
            />
          </Link>
        </div>
      )}

      <div className="actions">
        {isProjects ? (
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                padding: "0.5rem 0 0.5rem 2.5rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                fontFamily: "inherit",
                width: "80%",
              }}
            />
          </div>
        ) : isWrapUp ? (
          <nav className="nav-minimal">
            <Link to="/projects" className="link-projects">
              <FiFolder
                size={20}
                style={{
                  marginLeft: "0.5rem",
                  color: "var(--color-focus-main)",
                }}
              />
              Projects <FiArrowRight size={16} />
            </Link>
          </nav>
        ) : null}
      </div>

      {isTabletOrDesktop && isHome && <Navbar />}
    </header>
  );
};

export default Header;
