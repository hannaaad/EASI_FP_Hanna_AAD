import express from 'express';
import * as sqlite3 from 'sqlite3'; // Use * as for sqlite3
import { open } from 'sqlite';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Open SQLite database
async function openDb() {
  return open({
    filename: '../../../EASI.db', // Path to your SQLite database file
    driver: sqlite3.Database,
  });
}

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

// Routes for each table
// Users
app.get('/users', async (req, res) => {
  const db = await openDb();
  const users = await db.all('SELECT * FROM users');
  res.json(users);
});

app.get('/users/:id', async (req, res) => {
  const db = await openDb();
  const user = await db.get('SELECT * FROM users WHERE user_id = ?', [req.params.id]);
  res.json(user);
});

app.post('/users', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `INSERT INTO users (username, password_hash, email, first_name, last_name, phone_number, address, country, date_of_birth, sex, status, role) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      req.body.username,
      req.body.password_hash,
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      req.body.phone_number,
      req.body.address,
      req.body.country,
      req.body.date_of_birth,
      req.body.sex,
      req.body.status,
      req.body.role,
    ]
  );
  res.json(result);
});

app.put('/users/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `UPDATE users SET 
     username = ?, password_hash = ?, email = ?, first_name = ?, last_name = ?, phone_number = ?, address = ?, country = ?, date_of_birth = ?, sex = ?, status = ?, role = ?
     WHERE user_id = ?`,
    [
      req.body.username,
      req.body.password_hash,
      req.body.email,
      req.body.first_name,
      req.body.last_name,
      req.body.phone_number,
      req.body.address,
      req.body.country,
      req.body.date_of_birth,
      req.body.sex,
      req.body.status,
      req.body.role,
      req.params.id,
    ]
  );
  res.json(result);
});

app.delete('/users/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run('DELETE FROM users WHERE user_id = ?', [req.params.id]);
  res.json(result);
});

// Courts
app.get('/courts', async (req, res) => {
  const db = await openDb();
  const courts = await db.all('SELECT * FROM courts');
  res.json(courts);
});

app.get('/courts/:id', async (req, res) => {
  const db = await openDb();
  const court = await db.get('SELECT * FROM courts WHERE court_id = ?', [req.params.id]);
  res.json(court);
});

app.post('/courts', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `INSERT INTO courts (name, section_name, section_type, open_time, close_time) 
     VALUES (?, ?, ?, ?, ?)`,
    [
      req.body.name,
      req.body.section_name,
      req.body.section_type,
      req.body.open_time,
      req.body.close_time,
    ]
  );
  res.json(result);
});

app.put('/courts/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `UPDATE courts SET 
     name = ?, section_name = ?, section_type = ?, open_time = ?, close_time = ?
     WHERE court_id = ?`,
    [
      req.body.name,
      req.body.section_name,
      req.body.section_type,
      req.body.open_time,
      req.body.close_time,
      req.params.id,
    ]
  );
  res.json(result);
});

app.delete('/courts/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run('DELETE FROM courts WHERE court_id = ?', [req.params.id]);
  res.json(result);
});

// Locations
app.get('/locations', async (req, res) => {
  const db = await openDb();
  const locations = await db.all('SELECT * FROM locations');
  res.json(locations);
});

app.get('/locations/:id', async (req, res) => {
  const db = await openDb();
  const location = await db.get('SELECT * FROM locations WHERE location_id = ?', [req.params.id]);
  res.json(location);
});

app.post('/locations', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `INSERT INTO locations (court_id, location_name, description) 
     VALUES (?, ?, ?)`,
    [req.body.court_id, req.body.location_name, req.body.description]
  );
  res.json(result);
});

app.put('/locations/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `UPDATE locations SET 
     court_id = ?, location_name = ?, description = ?
     WHERE location_id = ?`,
    [req.body.court_id, req.body.location_name, req.body.description, req.params.id]
  );
  res.json(result);
});

app.delete('/locations/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run('DELETE FROM locations WHERE location_id = ?', [req.params.id]);
  res.json(result);
});

// Reservations
app.get('/reservations', async (req, res) => {
  const db = await openDb();
  const reservations = await db.all('SELECT * FROM reservations');
  res.json(reservations);
});

app.get('/reservations/:id', async (req, res) => {
  const db = await openDb();
  const reservation = await db.get('SELECT * FROM reservations WHERE reservation_id = ?', [req.params.id]);
  res.json(reservation);
});

app.post('/reservations', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `INSERT INTO reservations (date, start_time, end_time, token, number_of_people, user_id, court_id, status) 
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      req.body.date,
      req.body.start_time,
      req.body.end_time,
      req.body.token,
      req.body.number_of_people,
      req.body.user_id,
      req.body.court_id,
      req.body.status,
    ]
  );
  res.json(result);
});

app.put('/reservations/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `UPDATE reservations SET 
     date = ?, start_time = ?, end_time = ?, token = ?, number_of_people = ?, user_id = ?, court_id = ?, status = ?
     WHERE reservation_id = ?`,
    [
      req.body.date,
      req.body.start_time,
      req.body.end_time,
      req.body.token,
      req.body.number_of_people,
      req.body.user_id,
      req.body.court_id,
      req.body.status,
      req.params.id,
    ]
  );
  res.json(result);
});

app.delete('/reservations/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run('DELETE FROM reservations WHERE reservation_id = ?', [req.params.id]);
  res.json(result);
});

// Reviews
app.get('/reviews', async (req, res) => {
  const db = await openDb();
  const reviews = await db.all('SELECT * FROM reviews');
  res.json(reviews);
});

app.get('/reviews/:id', async (req, res) => {
  const db = await openDb();
  const review = await db.get('SELECT * FROM reviews WHERE review_id = ?', [req.params.id]);
  res.json(review);
});

app.post('/reviews', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `INSERT INTO reviews (rating, comment, reservation_id) 
     VALUES (?, ?, ?)`,
    [req.body.rating, req.body.comment, req.body.reservation_id]
  );
  res.json(result);
});

app.put('/reviews/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `UPDATE reviews SET 
     rating = ?, comment = ?, reservation_id = ?
     WHERE review_id = ?`,
    [req.body.rating, req.body.comment, req.body.reservation_id, req.params.id]
  );
  res.json(result);
});

app.delete('/reviews/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run('DELETE FROM reviews WHERE review_id = ?', [req.params.id]);
  res.json(result);
});

// Sensors
app.get('/sensors', async (req, res) => {
  const db = await openDb();
  const sensors = await db.all('SELECT * FROM sensors');
  res.json(sensors);
});

app.get('/sensors/:id', async (req, res) => {
  const db = await openDb();
  const sensor = await db.get('SELECT * FROM sensors WHERE sensor_id = ?', [req.params.id]);
  res.json(sensor);
});

app.post('/sensors', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `INSERT INTO sensors (type, model) 
     VALUES (?, ?)`,
    [req.body.type, req.body.model]
  );
  res.json(result);
});

app.put('/sensors/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `UPDATE sensors SET 
     type = ?, model = ?
     WHERE sensor_id = ?`,
    [req.body.type, req.body.model, req.params.id]
  );
  res.json(result);
});

app.delete('/sensors/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run('DELETE FROM sensors WHERE sensor_id = ?', [req.params.id]);
  res.json(result);
});

// Sensor Locations
app.get('/sensor-locations', async (req, res) => {
  const db = await openDb();
  const sensorLocations = await db.all('SELECT * FROM sensor_locations');
  res.json(sensorLocations);
});

app.get('/sensor-locations/:id', async (req, res) => {
  const db = await openDb();
  const sensorLocation = await db.get('SELECT * FROM sensor_locations WHERE sensor_location_id = ?', [req.params.id]);
  res.json(sensorLocation);
});

app.post('/sensor-locations', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `INSERT INTO sensor_locations (sensor_id, location_id) 
     VALUES (?, ?)`,
    [req.body.sensor_id, req.body.location_id]
  );
  res.json(result);
});

app.delete('/sensor-locations/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run('DELETE FROM sensor_locations WHERE sensor_location_id = ?', [req.params.id]);
  res.json(result);
});

// Sensor Readings
app.get('/sensor-readings', async (req, res) => {
  const db = await openDb();
  const sensorReadings = await db.all('SELECT * FROM sensor_readings');
  res.json(sensorReadings);
});

app.get('/sensor-readings/:id', async (req, res) => {
  const db = await openDb();
  const sensorReading = await db.get('SELECT * FROM sensor_readings WHERE reading_id = ?', [req.params.id]);
  res.json(sensorReading);
});

app.post('/sensor-readings', async (req, res) => {
  const db = await openDb();
  const result = await db.run(
    `INSERT INTO sensor_readings (sensor_id, location_id, temperature, humidity, light_level, fire_detected) 
     VALUES (?, ?, ?, ?, ?, ?)`,
    [
      req.body.sensor_id,
      req.body.location_id,
      req.body.temperature,
      req.body.humidity,
      req.body.light_level,
      req.body.fire_detected,
    ]
  );
  res.json(result);
});

app.delete('/sensor-readings/:id', async (req, res) => {
  const db = await openDb();
  const result = await db.run('DELETE FROM sensor_readings WHERE reading_id = ?', [req.params.id]);
  res.json(result);
});