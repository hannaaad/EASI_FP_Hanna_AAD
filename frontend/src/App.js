// client/src/App.js
import React from "react";
import useSensorData from "./useSensorData";

function App() {
  const sensorData = useSensorData();

  return (
    <div>
      <h1>Sensor Data</h1>
      {sensorData ? (
        <div>
          <p>Temperature: {sensorData.temperature} °C</p>
          <p>Humidity: {sensorData.humidity} %</p>
          <p>Light: {sensorData.light}</p>
          <p>Flame: {sensorData.flame ? "Detected" : "Not detected"}</p>
          <p>Fan State: {sensorData.fanState ? "On" : "Off"}</p>
          <p>Light State: {sensorData.lightState ? "On" : "Off"}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default App;
