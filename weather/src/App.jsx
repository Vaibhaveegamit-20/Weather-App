import React, { useEffect, useState } from "react";
import TopButtons from "./components/TopButtons";
import Inputs from "./components/Inputs";
import TimeAndLocation from "./components/TimeAndLocation";
import TempAndDetails from "./components/TempAndDetails";
import Forecast from "./components/Forecast";
import getFormattedWeatherData from "./services/weatherService";
import { ToastContainer, toast } from "react-toastify"; // to provide toast notifications
import "react-toastify/dist/ReactToastify.css";

//function to capitalize first letter
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const App = () => {
  const [query, setQuery] = useState({ q: "boston" });
  const [units, setUnits] = useState("metric");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false); //

  const getWeather = async () => {
    const cityName = query.q ? query.q : "current location";

    toast.info(`Fetching weather data for ${capitalizeFirstLetter(cityName)}`);
    setLoading(true);

    try {
      const data = await getFormattedWeatherData({ ...query, units });
      toast.success(`Fetched weather data for ${data.name}, ${data.country}`);
      setWeather(data);
    } catch (error) {
      toast.error("Failed to fetch weather data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWeather();
  }, [query, units]);

  //method to make the background change
  const formatBackground = () => {
    if (!weather || weather.temp === undefined)
      return "from-cyan-600 to-blue-700";
    const threshold = units === "metric" ? 0 : 32;
    const threshold1 = units === "metric" ? 20 : 68;
    const threshold2 = units === "metric" ? 40 : 104;

    if (weather.temp <= threshold) {
      return "from-sky-200 to-cyan-400 ";
    } else if (weather.temp >= threshold && weather.temp <= threshold1) {
      return "from-cyan-600 to-blue-700 ";
    } else if (weather.temp > threshold1 && weather.temp <= threshold2) {
      return "from-yellow-500 to-orange-700";
    } else {
      return "from-orange-400 to-red-700";
    }
  };

  return (
    <div
      className={`mx-auto max-w-screen-lg mt-4 py-5 px-4 sm:px-6 md:px-12 lg:px-20 xl:px-32 bg-gradient-to-br shadow-xl shadow-gray-400 ${formatBackground()}`}
    >
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} setUnits={setUnits} units={units} />

      {/* Loading spinner */}
      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-t-transparent border-amber-400"></div>
        </div>
      ) : (
        weather && (
          <>
            <TimeAndLocation weather={weather} />
            <TempAndDetails weather={weather} units={units} />
            <Forecast title="3 hour step forecast" data={weather.hourly} />
            <Forecast title="daily forecast" data={weather.daily} />
          </>
        )
      )}
      <ToastContainer autoClose={1500} hideProgressBar={true} theme="colored" />
    </div>
  );
};

export default App;
