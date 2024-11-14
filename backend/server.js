const express = require("express");
const { Board, Sensor, Relay } = require("johnny-five");
const board = new Board();

const app = express();
const PORT = 3000;

// Thresholds and pin mappings
const TEMPERATURE_THRESHOLD = 27;
const TEMPERATURE_LOW_THRESHOLD = 21;
const LIGHT_THRESHOLD = 5;
let previousTemperature = 0;
let fanState = false;
let lightState = false;

board.on("ready", () => {
  // Define sensors and actuators (correct Raspberry Pi pins)
  const temperatureSensor = new Sensor("A0"); // Temperature sensor connected to pin A0
  const lightSensor = new Sensor("A2"); // Light sensor connected to pin A2
  const flameSensor = new Sensor("A1"); // Flame sensor connected to pin A1
  const fanRelay = new Relay(7); // Fan connected to pin 7 (Relay pin)
  const lightRelay = new Relay(3); // Light connected to pin 3 (Relay pin)
  const pumpRelay = new Relay(11); // Pump connected to pin 11 (Relay pin)

  console.log("System Ready.");

  // Functions for handling each action
  function readTemperature() {
    const temperature = temperatureSensor.value; // Mock value, scale it based on sensor data
    console.log(`Temperature: ${temperature} °C`);
    return temperature;
  }

  function readHumidity() {
    // Replace with your humidity sensor reading logic if available
    return 50; // Mock humidity value
  }

  function readLight() {
    const lightValue = lightSensor.value;
    console.log(`Light value: ${lightValue}`);
    return lightValue;
  }

  function checkFlame() {
    const flameValue = flameSensor.value;
    if (flameValue < LIGHT_THRESHOLD) {
      console.log("Flame detected!");
      pumpRelay.on();
      setTimeout(() => pumpRelay.off(), 2000);
    }
    return flameValue;
  }

  function controlFan(temperature) {
    if (temperature >= TEMPERATURE_THRESHOLD && !fanState) {
      fanRelay.on();
      fanState = true;
      console.log("Fan ON");
    } else if (temperature <= TEMPERATURE_LOW_THRESHOLD && fanState) {
      fanRelay.off();
      fanState = false;
      console.log("Fan OFF");
    }
  }

  function controlLight(lightValue) {
    if (lightValue < LIGHT_THRESHOLD && !lightState) {
      lightRelay.on();
      lightState = true;
      console.log("Light ON");
    } else if (lightValue >= LIGHT_THRESHOLD && lightState) {
      lightRelay.off();
      lightState = false;
      console.log("Light OFF");
    }
  }

  // API Routes
  app.get("/api/sensors", (req, res) => {
    const temperature = readTemperature();
    const humidity = readHumidity();
    const light = readLight();
    const flame = checkFlame();

    // Control actuators based on sensor readings
    controlFan(temperature);
    controlLight(light);

    // Send sensor data to the client
    res.json({
      temperature,
      humidity,
      light,
      flame,
      fanState,
      lightState
    });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
