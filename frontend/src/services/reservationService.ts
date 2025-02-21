import api from './database';

interface Review {
  rating: number;
  comment: string;
  reservation_id: number;
}

export const createReview = async (review: Review) => {
  const response = await api.post('/reviews', review);
  return response.data;
};

export const getReviewById = async (reviewId: number) => {
  const response = await api.get(`/reviews/${reviewId}`);
  return response.data;
};

export const updateReview = async (reviewId: number, review: Partial<Review>) => {
  const response = await api.put(`/reviews/${reviewId}`, review);
  return response.data;
};

export const deleteReview = async (reviewId: number) => {
  const response = await api.delete(`/reviews/${reviewId}`);
  return response.data;
};