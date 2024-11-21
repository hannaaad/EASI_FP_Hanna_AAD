const express = require("express");
const dhtSensor = require("node-dht-sensor").promises;
const Gpio = require("onoff").Gpio;

const app = express();
const PORT = 3000;

app.use(express.json());

let fanState = false;
let lightState = false;
let pumpState = false;
const TEMPERATURE_THRESHOLD = 25;
const TEMPERATURE_LOW_THRESHOLD = 22;
const LIGHT_THRESHOLD = 2;

const ledLight = new Gpio(3, "out");
const fan = new Gpio(9, "out");
const pump = new Gpio(11, "out");
const lightDetector = new Gpio(27, "in", "both");
const irFlameSensor = new Gpio(17, "in", "both");

async function readTemperatureHumidity() {
  try {
    const { temperature, humidity } = await dhtSensor.read(11, 4);
    return { temperature, humidity };
  } catch (error) {
    return { temperature: null, humidity: null };
  }
}

function controlFan(state) {
  fan.writeSync(state ? 1 : 0);
  fanState = state;
}

function controlLight(state) {
  ledLight.writeSync(state ? 1 : 0);
  lightState = state;
}

function controlPump(state) {
  pump.writeSync(state ? 1 : 0);
  pumpState = state;
}

irFlameSensor.watch((err, value) => {
  if (err) return;
});

function validateDeviceState(req, res, next) {
  const { state } = req.body;
  if (typeof state !== 'boolean') {
    return res.status(400).json({ error: "State must be a boolean" });
  }
  next();
}

app.get("/api/sensors", async (req, res) => {
  const { temperature, humidity } = await readTemperatureHumidity();
  const lightValue = lightDetector.readSync();

  res.json({
    temperature,
    humidity,
    lightValue,
    fanState,
    lightState,
    pumpState
  });
});

app.post("/api/pump", validateDeviceState, (req, res) => {
  const { state } = req.body;
  controlPump(state);
  res.json({ pumpState });
});

app.put("/api/devices", (req, res) => {
  const { fan, light } = req.body;

  if (fan !== undefined) controlFan(fan);
  if (light !== undefined) controlLight(light);

  res.json({ fanState, lightState });
});

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

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
