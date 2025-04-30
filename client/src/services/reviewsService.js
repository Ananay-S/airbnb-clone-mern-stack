// Services to handle reviews related API calls


// This file contains functions to get, create and delete reviews for listings
// It uses Axios for making HTTP requests and wraps the API calls in a utility function for error handling

// client/src/services/reviewsService.js

import { wrapAsyncApi } from "../utils/wrapAsyncApi";
import API from "../api/axios";

export const getReviews = (id) => wrapAsyncApi(() => API.get(`/listings/${id}/reviews`));
export const createReview = (id, reviewData) => wrapAsyncApi(() => API.post(`/listings/${id}/reviews`, reviewData));
export const deleteReview = (id, reviewId) => wrapAsyncApi(() => API.delete(`/listings/${id}/reviews/${reviewId}`));