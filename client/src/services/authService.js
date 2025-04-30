// Service for authentication-related API calls

// This file contains functions to handle user signup, login, logout, and fetching the current user
// It uses Axios for making HTTP requests and wraps the API calls in a utility function for error handling

// client/src/services/authService.js

import { wrapAsyncApi } from '../utils/wrapAsyncApi';
import API from '../api/axios';

export const signup = (userData) => wrapAsyncApi(()=>API.post('/users/signup', userData));
export const login = (userData) => wrapAsyncApi(()=>API.post('/users/login', userData));
export const logout = () => wrapAsyncApi(()=>API.get('/users/logout'));
export const getCurrentUser = () => wrapAsyncApi(()=>API.get('/users/current'));

// (Wishlist)
export const getWishlist = () => wrapAsyncApi(()=>API.get('/users/wishlist'));
export const addToWishlist = (listingId) => wrapAsyncApi(()=>API.post(`/users/wishlist/${listingId}`));
export const removeFromWishlist = (listingId) => wrapAsyncApi(()=>API.delete(`/users/wishlist/${listingId}`));