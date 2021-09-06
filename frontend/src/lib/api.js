import axios from "./client";

export const getReviews = async () => {
  const { data } = await axios.get(`/reviews`);
  return data;
};

export const getReviewsInfinite = async ({ pageParam = 0 }) => {
  const { data: count } = await axios.get(`/reviews/count`);
  const { data } = await axios.get(`/reviews?_start=${pageParam}&_limit=5`);
  const nextCursor = count / 5 - 1 > pageParam ? pageParam + 1 : undefined;
  return { data, nextCursor };
};

export const getReviewById = async (id) => {
  const { data } = await axios.get(`/reviews/${id}`);
  return data;
};

export const getCategories = async () => {
  const { data } = await axios.get(`/categories`);
  return data;
};

export const getCategoryById = async (id) => {
  const { data } = await axios.get(`/categories/${id}`);
  return data;
};
