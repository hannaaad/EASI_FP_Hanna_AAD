const express = require("express");
const { Board, Relay } = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;
const dhtSensor = require("node-dht-sensor").promises;
const Gpio = require("onoff").Gpio;

const app = express();
const PORT = 3000;
let fanState = false;
let lightState = false;
const TEMPERATURE_THRESHOLD = 25; // Example threshold for fan control
const TEMPERATURE_LOW_THRESHOLD = 22; // Example threshold for fan off
const LIGHT_THRESHOLD = 2; // Example threshold for light control

const board = new Board({
  io: new Raspi()
});

board.on("ready", () => {
  const fanRelay = new Gpio(9, 'out');
  const lightRelay = new Gpio(3, 'out');
  const pumpRelay = new Gpio(11, 'out');

  console.log("System Ready.");

  async function readTemperatureHumidity() {
    try {
      const { temperature, humidity } = await dhtSensor.read(12, 4);
      console.log(`Temperature: ${temperature} °C, Humidity: ${humidity} %`);
      return { temperature, humidity };
    } catch (error) {
      console.error("Failed to read from DHT sensor:", error);
      return { temperature: null, humidity: null };
    }
  }

  function controlFan(temperature) {
    if (temperature >= TEMPERATURE_THRESHOLD && !fanState) {
      fanRelay.writeSync(1);
      fanState = true;
      console.log("Fan ON");
    } else if (temperature <= TEMPERATURE_LOW_THRESHOLD && fanState) {
      fanRelay.writeSync(0);
      fanState = false;
      console.log("Fan OFF");
    }
  }

  function controlLight(lightValue) {
    if (lightValue < LIGHT_THRESHOLD && !lightState) {
      lightRelay.writeSync(1);
      lightState = true;
      console.log("Light ON");
    } else if (lightValue >= LIGHT_THRESHOLD && lightState) {
      lightRelay.writeSync(0);
      lightState = false;
      console.log("Light OFF");
    }
  }

  app.get("/api/sensors", async (req, res) => {
    const { temperature, humidity } = await readTemperatureHumidity();

    if (temperature !== null) {
      controlFan(temperature);
    }

    const lightValue = 3; // Placeholder value for light
    controlLight(lightValue);

    res.json({
      temperature,
      humidity,
      lightValue,
      fanState,
      lightState
    });
  });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
