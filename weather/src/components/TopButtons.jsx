import React from "react";

const TopButtons = ({ setQuery }) => {
  const cities = [
    {
      id: 1,
      name: "London",
    },
    {
      id: 2,
      name: "Sydney",
    },
    {
      id: 3,
      name: "Tokyo",
    },
    {
      id: 4,
      name: "Delhi",
    },
    {
      id: 5,
      name: "Toronto",
    },
  ];

  return (
    <div className="flex flex-wrap items-center justify-around my-6">
      {cities.map((city) => (
        <button
          key={city.id}
          className="text-sm sm:text-lg font-medium hover:text-amber-300 px-3 py-2 rounded-md transition ease-in"
          onClick={() => setQuery({ q: city.name })}
        >
          {city.name}
        </button>
      ))}
    </div>
  );
};

export default TopButtons;
