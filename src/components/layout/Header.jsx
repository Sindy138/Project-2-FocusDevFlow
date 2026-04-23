import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { FiEye, FiArrowRight, FiArrowLeft, FiSearch } from "react-icons/fi";
import Navbar from "./Navbar";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
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
      {!isProjects && (
        <h1 className="logo">
          <Link to="/">FocusFlow</Link>
        </h1>
      )}

      {isProjects && (
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              position: "relative",
            }}
          >
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
          // Navbar minimalista para WrapUp
          <nav className="nav-minimal">
            <Link to="/projects" className="link-projects">
              Projects <FiArrowRight size={16} />
            </Link>
          </nav>
        ) : (
          // Navbar normal para Home
          <Navbar />
        )}

        {!isWrapUp && !isProjects && (
          <button className="zenButton" title="Modo Zen">
            <FiEye size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
