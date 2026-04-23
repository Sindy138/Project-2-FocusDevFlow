import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useContext } from "react";
import { FiArrowRight, FiArrowLeft, FiSearch } from "react-icons/fi";
import { Cloud } from "lucide-react";
import { WeatherContext } from "../../context/WeatherContext";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const { togglePopup } = useContext(WeatherContext);
  const [searchParams, setSearchParams] = useSearchParams();
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
    <header className="header">
      {isHome && (
        <h1 className="logo">
          <Link to="/">FocusFlow</Link>
        </h1>
      )}

      {isProjects && (
        <div className="header-nav-section">
          <FiArrowLeft size={20} />
          <Link
            to="/wrap-up"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            Daily Wrap
          </Link>
        </div>
      )}

      <div className="actions">
        {isProjects ? (
          <div className="search-container">
            <FiSearch
              style={{ position: "absolute", left: "1rem", color: "#666" }}
            />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{
                padding: "0.75rem 1rem 0.75rem 2.5rem",
                border: "1px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                fontFamily: "inherit",
                width: "250px",
              }}
            />
          </div>
        ) : isWrapUp ? (
          <nav className="nav-minimal">
            <button
              className="link-weather"
              onClick={togglePopup}
              title="Weather"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                color: "inherit",
                fontSize: "inherit",
                fontFamily: "inherit",
              }}
            >
              <Cloud size={18} />
              Weather
            </button>
            <Link to="/projects" className="link-projects">
              Projects <FiArrowRight size={16} />
            </Link>
          </nav>
        ) : null}
      </div>
    </header>
  );
};

export default Header;
