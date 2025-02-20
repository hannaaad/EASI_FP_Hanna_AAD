-- Enable foreign key constraints
PRAGMA foreign_keys = ON;

-- Create the schema (not needed in SQLite, databases are file-based)

-- Table: users
CREATE TABLE IF NOT EXISTS users (
  user_id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  first_name TEXT DEFAULT NULL,
  last_name TEXT DEFAULT NULL,
  phone_number TEXT DEFAULT NULL,
  address TEXT DEFAULT NULL,
  country TEXT DEFAULT NULL,
  date_of_birth DATE DEFAULT NULL,
  sex TEXT CHECK (sex IN ('M', 'F', 'O')) DEFAULT 'O',
  status TEXT CHECK (status IN ('active', 'inactive')) DEFAULT 'active',
  role TEXT CHECK (role IN ('admin', 'user')) NOT NULL DEFAULT 'user',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Table: courts
CREATE TABLE IF NOT EXISTS courts (
  court_id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  section_name TEXT NOT NULL,
  section_type TEXT CHECK (section_type IN ('indoor', 'outdoor')) NOT NULL,
  open_time TEXT NOT NULL, -- Store time as TEXT (HH:MM:SS)
  close_time TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Table: locations
CREATE TABLE IF NOT EXISTS locations (
  location_id INTEGER PRIMARY KEY AUTOINCREMENT,
  court_id INTEGER NOT NULL,
  location_name TEXT NOT NULL,
  description TEXT DEFAULT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (court_id) REFERENCES courts (court_id) ON DELETE CASCADE
);

-- Table: reservations
CREATE TABLE IF NOT EXISTS reservations (
  reservation_id INTEGER PRIMARY KEY AUTOINCREMENT,
  date DATE NOT NULL,
  start_time TEXT NOT NULL,
  end_time TEXT NOT NULL,
  token TEXT DEFAULT NULL,
  number_of_people INTEGER NOT NULL CHECK (number_of_people > 0),
  user_id INTEGER DEFAULT NULL, -- Can be NULL if user account is deleted
  court_id INTEGER NOT NULL,
  status TEXT CHECK (status IN ('active', 'cancelled', 'completed')) DEFAULT 'active',
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users (user_id) ON DELETE SET NULL,
  FOREIGN KEY (court_id) REFERENCES courts (court_id) ON DELETE CASCADE
);

-- Table: reviews
CREATE TABLE IF NOT EXISTS reviews (
  review_id INTEGER PRIMARY KEY AUTOINCREMENT,
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  comment TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  reservation_id INTEGER NOT NULL,
  FOREIGN KEY (reservation_id) REFERENCES reservations (reservation_id) ON DELETE CASCADE
);

-- Table: sensors
CREATE TABLE IF NOT EXISTS sensors (
  sensor_id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT CHECK (type IN ('DHT11', 'Photosensor', 'IR Sensor')) NOT NULL,
  model TEXT NOT NULL,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- Table: sensor_locations (Mapping Sensors to Locations - Many-to-Many)
CREATE TABLE IF NOT EXISTS sensor_locations (
  sensor_location_id INTEGER PRIMARY KEY AUTOINCREMENT,
  sensor_id INTEGER NOT NULL,
  location_id INTEGER NOT NULL,
  installed_at TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sensor_id) REFERENCES sensors (sensor_id) ON DELETE CASCADE,
  FOREIGN KEY (location_id) REFERENCES locations (location_id) ON DELETE CASCADE
);

-- Table: sensor_readings
CREATE TABLE IF NOT EXISTS sensor_readings (
  reading_id INTEGER PRIMARY KEY AUTOINCREMENT,
  sensor_id INTEGER NOT NULL,
  location_id INTEGER NOT NULL,
  temperature REAL DEFAULT NULL,
  humidity REAL DEFAULT NULL,
  light_level INTEGER DEFAULT NULL CHECK (light_level IN (0, 1)), -- 1 for bright, 0 for dark
  fire_detected INTEGER DEFAULT NULL CHECK (fire_detected IN (0, 1)), -- 1 if fire detected, 0 otherwise
  timestamp TEXT DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sensor_id) REFERENCES sensors (sensor_id) ON DELETE CASCADE,
  FOREIGN KEY (location_id) REFERENCES locations (location_id) ON DELETE CASCADE
);
