import { createContext, useState, useCallback } from "react";

export const WeatherContext = createContext();

const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const WEATHER_API_URL = "https://api.openweathermap.org/data/2.5/weather";

export const WeatherProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [city, setCity] = useState(() => {
    return localStorage.getItem("lastSearchedCity") || "";
  });
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Mensaje personalizado
  const getWeatherMessage = useCallback((temp) => {
    if (temp < 10) {
      return { emoji: "❄️", message: "Hace frío, abrígate bien" };
    } else if (temp >= 10 && temp < 18) {
      return { emoji: "🍂", message: "Temperatura fresca, lleva una chaqueta" };
    } else if (temp >= 18 && temp < 25) {
      return {
        emoji: "☀️",
        message: "Clima agradable, perfecto para trabajar",
      };
    } else if (temp >= 25 && temp < 30) {
      return { emoji: "💧", message: "Hace calor, mantente hidratado" };
    } else {
      return { emoji: "🔥", message: "Mucho calor, bebe agua constantemente" };
    }
  }, []);

  // Buscar clima por ciudad
  const fetchWeather = useCallback(
    async (cityName) => {
      if (!cityName.trim()) {
        setError("Por favor ingresa una ciudad");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `${WEATHER_API_URL}?q=${encodeURIComponent(cityName)}&appid=${API_KEY}&units=metric&lang=es`,
        );

        if (!response.ok) {
          if (response.status === 404) {
            setError("Ciudad no encontrada");
          } else {
            setError("Error al obtener el clima");
          }
          setWeather(null);
          return;
        }

        const data = await response.json();
        const temp = Math.round(data.main.temp);
        const description = data.weather[0].description;
        const message = getWeatherMessage(temp);

        setWeather({
          city: data.name,
          country: data.sys.country,
          temp,
          description,
          message: message.message,
          emoji: message.emoji,
        });

        // Guardar ciudad en localStorage
        localStorage.setItem("lastSearchedCity", cityName);
        setCity(cityName);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError("Error de conexión");
        setWeather(null);
      } finally {
        setLoading(false);
      }
    },
    [getWeatherMessage],
  );

  const loadLastCity = useCallback(async () => {
    const lastCity = localStorage.getItem("lastSearchedCity");
    if (lastCity) {
      await fetchWeather(lastCity);
    }
  }, [fetchWeather]);

  const togglePopup = () => {
    setIsOpen(!isOpen);
    if (!isOpen && !weather) {
      loadLastCity();
    }
  };

  const closePopup = () => {
    setIsOpen(false);
  };

  return (
    <WeatherContext.Provider
      value={{
        isOpen,
        togglePopup,
        closePopup,
        city,
        setCity,
        weather,
        loading,
        error,
        fetchWeather,
        loadLastCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};
