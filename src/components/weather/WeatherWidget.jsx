import { useContext, useState, useEffect } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { Cloud, MapPin, X } from "lucide-react";
import "./WeatherWidget.css";

const WeatherWidget = () => {
  const {
    isOpen,
    closePopup,
    city,
    setCity,
    weather,
    loading,
    error,
    fetchWeather,
  } = useContext(WeatherContext);

  const [inputValue, setInputValue] = useState(city);

  useEffect(() => {
    setInputValue(city);
  }, [city]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      fetchWeather(inputValue);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay con blur */}
      <div className="weather-overlay" onClick={closePopup}></div>

      {/* Modal */}
      <div className="weather-modal">
        {/* Header */}
        <div className="weather-header">
          <div className="weather-title">
            <Cloud size={24} />
            <h2>Weather Companion</h2>
          </div>
          <button
            className="weather-close-btn"
            onClick={closePopup}
            aria-label="Cerrar"
          >
            <X size={24} />
          </button>
        </div>

        {/* Search Section */}
        <form className="weather-search-form" onSubmit={handleSearch}>
          <div className="weather-input-container">
            <MapPin size={20} className="weather-input-icon" />
            <input
              type="text"
              placeholder="Buscar ciudad..."
              value={inputValue}
              onChange={handleInputChange}
              className="weather-input"
              disabled={loading}
            />
          </div>
          <button
            type="submit"
            className="weather-search-btn"
            disabled={loading}
          >
            {loading ? "Loading" : "Buscar"}
          </button>
        </form>

        {/* Error Message */}
        {error && <div className="weather-error">{error}</div>}

        {/* Weather Display */}
        {weather && (
          <div className="weather-display">
            <div className="weather-location">
              {weather.city}, {weather.country}
            </div>

            <div className="weather-main">
              <div className="weather-temp-section">
                <span className="weather-temp">{weather.temp}°C</span>
                <span className="weather-description">
                  {weather.description}
                </span>
              </div>
            </div>

            <div className="weather-message">
              <span className="weather-emoji">{weather.emoji}</span>
              <span className="weather-text">{weather.message}</span>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!weather && !error && !loading && (
          <div className="weather-empty">
            <Cloud size={48} />
            <p>Busca una ciudad para ver el clima</p>
          </div>
        )}
      </div>
    </>
  );
};

export default WeatherWidget;
