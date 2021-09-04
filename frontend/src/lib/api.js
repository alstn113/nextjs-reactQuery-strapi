import axios from "./client";

export const getReviews = async () => {
  const { data } = await axios.get(`/reviews`);
  return data;
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
