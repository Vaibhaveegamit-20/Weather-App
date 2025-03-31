import React from "react";

const TimeAndLocation = ({
  weather: { formattedLocalTime, name, country },
}) => {
  return (
    <div className="m-2 sm:m-0">
      {/* Day, date and Local time display */}
      <div className="flex items-center justify-center sm:my-6 my-4">
        <p className="text-sm sm:text-xl font-extralight">
          {formattedLocalTime}
        </p>
      </div>

      {/* Place along with country display */}
      <div className="flex items-center justify-center sm:my-3 my-2">
        <p className="text-lg sm:text-3xl font-medium">{`${name},${country}`}</p>
      </div>
    </div>
  );
};

export default TimeAndLocation;
