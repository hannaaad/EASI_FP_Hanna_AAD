const express = require("express");
const { Board } = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;
const dhtSensor = require("node-dht-sensor").promises;
const Gpio = require("onoff").Gpio;

const app = express();
const PORT = 3000;

let fanState = false;
let lightState = false;
let pumpState = false;
const TEMPERATURE_THRESHOLD = 25;
const TEMPERATURE_LOW_THRESHOLD = 22;
const LIGHT_THRESHOLD = 2;

const board = new Board({
  io: new Raspi()
});

board.on("ready", () => {
  const ledLight = new Gpio(3, 'out');
  const fan = new Gpio(9, 'out'); // L293D driver for fan
  const pump = new Gpio(11, 'out'); // L293D driver for pump
  const lightDetector = new Gpio(27, 'in', 'both'); // GPIO 27 for Light Detection
  const irFlameSensor = new Gpio(17, 'in', 'both'); // Corrected GPIO for IR Flame Sensor


  console.log("System Ready.");

  async function readTemperatureHumidity() {
    try {
      const { temperature, humidity } = await dhtSensor.read(11, 4);
      console.log(`Temperature: ${temperature} °C, Humidity: ${humidity} %`);
      return { temperature, humidity };
    } catch (error) {
      console.error("Failed to read from DHT sensor:", error);
      return { temperature: null, humidity: null };
    }
  }

  function controlFan(temperature) {
    if (temperature >= TEMPERATURE_THRESHOLD && !fanState) {
      fan.writeSync(1);
      fanState = true;
      console.log("Fan ON");
    } else if (temperature <= TEMPERATURE_LOW_THRESHOLD && fanState) {
      fan.writeSync(0);
      fanState = false;
      console.log("Fan OFF");
    }
  }

  function controlLight(lightValue) {
    if (lightValue < LIGHT_THRESHOLD && !lightState) {
      ledLight.writeSync(1);
      lightState = true;
      console.log("Light ON");
    } else if (lightValue >= LIGHT_THRESHOLD && lightState) {
      ledLight.writeSync(0);
      lightState = false;
      console.log("Light OFF");
    }
  }

  function controlPump() {
    if (!pumpState) {
      pump.writeSync(1);
      pumpState = true;
      console.log("Pump ON");
    } else {
      pump.writeSync(0);
      pumpState = false;
      console.log("Pump OFF");
    }
  }

  irFlameSensor.watch((err, value) => {
    if (err) {
      console.error("Error reading IR Flame Sensor:", err);
      return;
    }
    console.log(value ? "No Flame Detected" : "Flame Detected");
  });

  app.get("/api/sensors", async (req, res) => {
    const { temperature, humidity } = await readTemperatureHumidity();
    const lightValue = 3; // Placeholder for light detection

    if (temperature !== null) controlFan(temperature);
    controlLight(lightValue);

    res.json({
      temperature,
      humidity,
      lightValue,
      fanState,
      lightState,
      pumpState
    });
  });
});

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
