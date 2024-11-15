// client/src/useSensorData.js
import { useEffect, useState } from "react";

function useSensorData() {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://localhost:3000/api/sensors");
      const data = await response.json();
      setSensorData(data);
    };

    fetchData();

    const interval = setInterval(fetchData, 10000); // Poll every 10 seconds
    return () => clearInterval(interval);
  }, []);

  return sensorData;
}

export default useSensorData;
