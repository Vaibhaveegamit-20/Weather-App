import React from "react";

const Forecast = ({ title, data }) => {
  return (
    <div className="m-2">
      <div className="flex items-center justify-start mt-6">
        <p className="font-medium uppercase sm:text-base text-xs">{title}</p>
      </div>
      <hr className="my-1" />
      <div className="flex items-center justify-between gap-2">
        {data.map((d, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p className="font-light sm:text-lg text-xs">{d.title}</p>
            <img
              src={d.icon}
              alt="weather icon"
              className="sm:w-14 w-10 my-1"
            />
            <p className="font-medium sm:text-lg text-xs">{`${d.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forecast;
