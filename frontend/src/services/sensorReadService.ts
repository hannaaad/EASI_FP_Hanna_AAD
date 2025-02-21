import api from '../api';

interface SensorReading {
  sensor_id: number;
  location_id: number;
  temperature?: number;
  humidity?: number;
  light_level?: 0 | 1;
  fire_detected?: 0 | 1;
}

export const createSensorReading = async (sensorReading: SensorReading) => {
  const response = await api.post('/sensor-readings', sensorReading);
  return response.data;
};

export const getSensorReadingById = async (readingId: number) => {
  const response = await api.get(`/sensor-readings/${readingId}`);
  return response.data;
};

export const deleteSensorReading = async (readingId: number) => {
  const response = await api.delete(`/sensor-readings/${readingId}`);
  return response.data;
};