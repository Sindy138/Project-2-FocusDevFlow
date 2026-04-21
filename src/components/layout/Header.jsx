import { Link, useLocation } from "react-router-dom";
import { FiEye, FiArrowRight } from "react-icons/fi";
import Navbar from "./Navbar";
import "./Header.css";

const Header = () => {
  const location = useLocation();
  const isWrapUp = location.pathname === "/wrap-up";

  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">FocusDevFlow</Link>
      </h1>

      <div className="actions">
        {isWrapUp ? (
          // Navbar minimalista para WrapUp
          <nav className="nav-minimal">
            <Link to="/projects" className="link-projects">
              Projects <FiArrowRight size={16} />
            </Link>
          </nav>
        ) : (
          // Navbar normal para Home y Projects
          <Navbar />
        )}

        {!isWrapUp && (
          <button className="zenButton" title="Modo Zen">
            <FiEye size={20} />
          </button>
        )}
      </div>
    </header>
  );
};

export default Header;
