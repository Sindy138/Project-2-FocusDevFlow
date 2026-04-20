import { Link } from "react-router-dom";
import { FiEye } from "react-icons/fi";
import Navbar from "./Navbar";
import "./Header.css";

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">
        <Link to="/">FocusDevFlow</Link>
      </h1>

      <div className="actions">
        <Navbar />

        <button className="zenButton" title="Modo Zen">
          <FiEye size={20} />
        </button>
      </div>
    </header>
  );
};

export default Header;
