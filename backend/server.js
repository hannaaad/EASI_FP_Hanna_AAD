const express = require("express");
const { Board } = require("johnny-five");
const Raspi = require("raspi-io").RaspiIO;
const dhtSensor = require("node-dht-sensor").promises;
const Gpio = require("onoff").Gpio;

const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

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
  const ledLight = new Gpio(3, "out");
  const fan = new Gpio(9, "out"); // L293D driver for fan
  const pump = new Gpio(11, "out"); // L293D driver for pump
  const lightDetector = new Gpio(27, "in", "both"); // GPIO 27 for Light Detection
  const irFlameSensor = new Gpio(17, "in", "both"); // IR Flame Sensor

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

  function controlFan(state) {
    fan.writeSync(state ? 1 : 0);
    fanState = state;
    console.log(`Fan ${state ? "ON" : "OFF"}`);
  }

  function controlLight(state) {
    ledLight.writeSync(state ? 1 : 0);
    lightState = state;
    console.log(`Light ${state ? "ON" : "OFF"}`);
  }

  function controlPump(state) {
    pump.writeSync(state ? 1 : 0);
    pumpState = state;
    console.log(`Pump ${state ? "ON" : "OFF"}`);
  }

  irFlameSensor.watch((err, value) => {
    if (err) {
      console.error("Error reading IR Flame Sensor:", err);
      return;
    }
    console.log(value ? "No Flame Detected" : "Flame Detected");
  });

  // --- API ROUTES ---

  // GET: Retrieve sensor states and readings
  app.get("/api/sensors", async (req, res) => {
    const { temperature, humidity } = await readTemperatureHumidity();
    const lightValue = 3; // Placeholder for light detection

    res.json({
      temperature,
      humidity,
      lightValue,
      fanState,
      lightState,
      pumpState
    });
  });

  // POST: Control pump manually
  app.post("/api/pump", (req, res) => {
    const { state } = req.body;
    controlPump(state);
    res.json({ pumpState });
  });

  // PUT: Set fan and light states
  app.put("/api/devices", (req, res) => {
    const { fan, light } = req.body;

    if (fan !== undefined) controlFan(fan);
    if (light !== undefined) controlLight(light);

    res.json({ fanState, lightState });
  });

  // PATCH: Adjust fan or light state (toggle-like behavior)
  app.patch("/api/devices/:device", (req, res) => {
    const { device } = req.params;

    if (device === "fan") {
      fanState = !fanState;
      controlFan(fanState);
      res.json({ fanState });
    } else if (device === "light") {
      lightState = !lightState;
      controlLight(lightState);
      res.json({ lightState });
    } else {
      res.status(400).json({ error: "Invalid device" });
    }
  });

  // DELETE: Reset all devices to off state
  app.delete("/api/devices", (req, res) => {
    controlFan(false);
    controlLight(false);
    controlPump(false);

    res.json({
      message: "All devices reset to off state",
      fanState,
      lightState,
      pumpState
    });
  });

  // --- END OF API ROUTES ---
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
