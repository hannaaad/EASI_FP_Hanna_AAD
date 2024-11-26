const express = require("express");
//const dhtSensor = require("node-dht-sensor").promises;
//const { GpioChip } = require('gpiod');

const app = express();
const PORT = 3000;

app.use(express.json());

let fanState = false;
let lightState = false;
let pumpState = false;
const TEMPERATURE_THRESHOLD = 25;
const TEMPERATURE_LOW_THRESHOLD = 22;

// const gpioChip = new GpioChip("gpiochip512");
// const fan = gpioChip.getLine(0); // Update with the correct line
// const ledLight = gpioChip.getLine(1); // Update with the correct line
// const pump = gpioChip.getLine(2); // Update with the correct line
// const lightDetector = gpioChip.getLine(3); // Update with the correct line
// const irFlameSensor = gpioChip.getLine(4); // Update with the correct line

// function requestOutputs() {
//   fan.requestOutputMode();
//   ledLight.requestOutputMode();
//   pump.requestOutputMode();
// }

// function controlDevice(device, state) {
//   device.setValue(state ? 1 : 0);
// }

// async function readTemperatureHumidity() {
//   try {
//     const { temperature, humidity } = await dhtSensor.read(11, 4);
//     return { temperature, humidity };
//   } catch (error) {
//     console.error("Failed to read temperature and humidity:", error);
//     return { temperature: null, humidity: null };
//   }
// }

// function validateDeviceState(req, res, next) {
//   const { state } = req.body;
//   if (typeof state !== "boolean") {
//     return res.status(400).json({ error: "State must be a boolean" });
//   }
//   next();
// }
app.get("/", async (req, res) => {
  return res.json({ data:"raspi api working" });
});

// app.get("/api/sensors", async (req, res) => {
//   const { temperature, humidity } = await readTemperatureHumidity();
//   const lightValue = lightDetector.getValueSync(); // Replace with line read logic
//   res.json({ temperature, humidity, lightValue, fanState, lightState, pumpState });
// });

// app.post("/api/pump", validateDeviceState, (req, res) => {
//   const { state } = req.body;
//   controlDevice(pump, state);
//   pumpState = state;
//   res.json({ pumpState });
// });

// app.put("/api/devices", (req, res) => {
//   const { fan, light } = req.body;
//   if (fan !== undefined) {
//     controlDevice(fan, fan);
//     fanState = fan;
//   }
//   if (light !== undefined) {
//     controlDevice(ledLight, light);
//     lightState = light;
//   }
//   res.json({ fanState, lightState });
// });

// app.patch("/api/devices/:device", (req, res) => {
//   const { device } = req.params;

//   if (device === "fan") {
//     fanState = !fanState;
//     controlDevice(fan, fanState);
//     res.json({ fanState });
//   } else if (device === "light") {
//     lightState = !lightState;
//     controlDevice(ledLight, lightState);
//     res.json({ lightState });
//   } else {
//     res.status(400).json({ error: "Invalid device" });
//   }
// });

// app.delete("/api/devices", (req, res) => {
//   controlDevice(fan, false);
//   controlDevice(ledLight, false);
//   controlDevice(pump, false);
//   fanState = false;
//   lightState = false;
//   pumpState = false;
//   res.json({ message: "All devices reset to off state", fanState, lightState, pumpState });
// });

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
  //requestOutputs();
});
