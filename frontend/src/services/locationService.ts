import api from './database.ts";

interface Location {
  court_id: number;
  location_name: string;
  description?: string;
}

export const createLocation = async (location: Location) => {
  const response = await api.post('/locations', location);
  return response.data;
};

export const getLocationById = async (locationId: number) => {
  const response = await api.get(`/locations/${locationId}`);
  return response.data;
};

export const updateLocation = async (locationId: number, location: Partial<Location>) => {
  const response = await api.put(`/locations/${locationId}`, location);
  return response.data;
};

export const deleteLocation = async (locationId: number) => {
  const response = await api.delete(`/locations/${locationId}`);
  return response.data;
};