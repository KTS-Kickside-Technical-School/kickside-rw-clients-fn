import React, { useState, useEffect } from "react";

const DigitalClock: React.FC = () => {
  const [time, setTime] = useState<string>("");
  const [date, setDate] = useState<string>("");

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const formattedTime = now.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      }); // Format HH:MM:SS
      const formattedDate = now.toLocaleDateString([], {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      }); // Format Day, Month Date, Year

      setTime(formattedTime);
      setDate(formattedDate);
    };

    updateClock();
    const timerId = setInterval(updateClock, 1000);

    return () => clearInterval(timerId);
  }, []);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-lg shadow-md p-4 flex flex-col items-center space-y-2">
      <span className="text-4xl">{time}</span>
      <span className="text-sm uppercase tracking-wide">{date}</span>
    </div>
  );
};

export default DigitalClock;
