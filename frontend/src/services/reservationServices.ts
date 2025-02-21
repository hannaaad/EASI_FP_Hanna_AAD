import api from '../api';

interface Reservation {
  date: string;
  start_time: string;
  end_time: string;
  token?: string;
  number_of_people: number;
  user_id?: number;
  court_id: number;
  status?: 'active' | 'cancelled' | 'completed';
}

export const createReservation = async (reservation: Reservation) => {
  const response = await api.post('/reservations', reservation);
  return response.data;
};

export const getReservationById = async (reservationId: number) => {
  const response = await api.get(`/reservations/${reservationId}`);
  return response.data;
};

export const updateReservation = async (reservationId: number, reservation: Partial<Reservation>) => {
  const response = await api.put(`/reservations/${reservationId}`, reservation);
  return response.data;
};

export const deleteReservation = async (reservationId: number) => {
  const response = await api.delete(`/reservations/${reservationId}`);
  return response.data;
};