import React, { useState } from "react";
import { MdOutlineSearch, MdMyLocation } from "react-icons/md";
import axios from "axios";

const Inputs = ({ setQuery, setUnits, units }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const API_KEY1 = "100e06fb6emsh99e1d3c02331855p1a5103jsnb5b6a7161c77";

  const fetchSuggestions = async (value) => {
    try {
      const response = await axios.get(
        "https://wft-geo-db.p.rapidapi.com/v1/geo/cities",
        {
          params: { namePrefix: value, limit: 5 },
          headers: {
            "X-RapidAPI-Key": API_KEY1,
            "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
          },
        }
      );
      const data = response.data.data.map(
        (place) => `${place.city}, ${place.countryCode}`
      );
      setSuggestions(data);
    } catch (error) {
      console.error("GeoDB API Error:", error);
    }
  };

  //
  const handleInputChange = (e) => {
    const value = e.currentTarget.value;
    setCity(value);
    if (value.length >= 2) {
      fetchSuggestions(value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSearchClick = () => {
    if (city !== "") {
      setQuery({ q: city });
      setCity("");
      setSuggestions([]);
    }
  };

  //
  const handleSuggestionClick = (selected) => {
    setQuery({ q: selected });
    setCity("");
    setSuggestions([]);
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setQuery({ lat: latitude, lon: longitude });
        setCity("");
        setSuggestions([]);
      });
    }
  };

  return (
    <div className="flex sm:flex-row flex-col justify-center my-6 gap-4 m-2 sm:m-0">
      <div className="flex flex-col relative sm:w-3/4 w-full items-center justify-center space-y-1">
        <div className="flex flex-row w-full justify-center items-center space-x-2">
          <input
            value={city}
            onChange={handleInputChange}
            type="text"
            placeholder="Search by city..."
            className="text-gray-500 text-sm sm:text-lg font-light p-2 shadow-xl capitalize focus:outline-none w-[80%] sm:w-full placeholder:lowercase rounded-md"
          />
          <MdOutlineSearch
            size={24}
            className="sm:size-[30px] transform transition-transform duration-200 cursor-pointer ease-out sm:hover:scale-125 hover:scale-110"
            onClick={handleSearchClick}
          />
          <MdMyLocation
            size={20}
            className="sm:size-[30px] transform transition-transform duration-200 cursor-pointer ease-out sm:hover:scale-125 hover:scale-110"
            onClick={handleLocationClick}
          />
        </div>

        {/* Suggestions Dropdown */}
        {suggestions.length > 0 && (
          <ul className="absolute top-14 z-10 bg-white w-[80%] sm:w-full rounded shadow text-gray-800 max-h-60 overflow-y-auto">
            {suggestions.map((suggestion, index) => (
              <li
                key={index}
                onClick={() => handleSuggestionClick(suggestion)}
                className="px-4 py-2 text-sm hover:bg-gray-200 cursor-pointer"
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* °C / °F Toggle */}
      <div className="flex flex-row sm:w-1/4 items-center justify-center">
        <button
          className={`sm:text-2xl text-xl font-medium transition ease-out hover:scale-125 ${
            units === "metric" ? "text-amber-300" : "text-white"
          }`}
          onClick={() => setUnits("metric")}
        >
          °C
        </button>
        <p className="sm:text-2xl text-xl font-medium mx-1 text-white">|</p>
        <button
          className={`sm:text-2xl text-xl font-medium transition ease-out hover:scale-125 ${
            units === "imperial" ? "text-amber-300" : "text-white"
          }`}
          onClick={() => setUnits("imperial")}
        >
          °F
        </button>
      </div>
    </div>
  );
};

export default Inputs;
