import React, { useEffect, useState } from "react";

export const ArchivalTicker: React.FC = () => {
  const [times, setTimes] = useState({
    london: "",
    india: "",
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();

      const lonStr = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      const indStr = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }).format(now);

      setTimes({ london: lonStr, india: indStr });
    };

    updateTimes();
    const interval = setInterval(updateTimes, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="archival-live-ticker">
      <div className="ticker-pulse-dot"></div>
      <span className="ticker-item">
        <strong>LONDON</strong> {times.london || "12:00:00"} GMT
      </span>
      <span className="ticker-separator">✦</span>
      <span className="ticker-item">
        <strong>GUJARAT</strong> {times.india || "17:30:00"} IST
      </span>
      <span className="ticker-separator">✦</span>
      <span className="ticker-item">
        ATELIER DISPATCH ACTIVE
      </span>
    </div>
  );
};
