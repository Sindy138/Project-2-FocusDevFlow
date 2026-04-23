import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { WeatherProvider } from "./context/WeatherContext";
import { useMediaQuery } from "./hooks/useMediaQuery";
import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import WeatherWidget from "./components/weather/WeatherWidget";
import HomePage from "./pages/HomePage";
import WrapUpPage from "./pages/WrapUpPage";
import ProjectPage from "./pages/ProjectPage";
import "./App.css";

function App() {
  const isMobile = !useMediaQuery("(min-width: 769px)");

  return (
    <WeatherProvider>
      <Router>
        <div className="app-container">
          <Header />

          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/wrap-up" element={<WrapUpPage />} />
              <Route path="/projects" element={<ProjectPage />} />
            </Routes>
          </main>

          {isMobile && <Navbar />}
          <WeatherWidget />
        </div>
      </Router>
    </WeatherProvider>
  );
}

export default App;
