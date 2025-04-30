// Service to handle API calls related to listings

// This file contains functions to get, create, update, and delete listings
// It uses Axios for making HTTP requests and wraps the API calls in a utility function for error handling

// client/src/services/listingsService.js

import { wrapAsyncApi } from "../utils/wrapAsyncApi";
import API from "../api/axios";

export const getListings  = () => wrapAsyncApi(() => API.get('/listings'));
export const getListingsBySearch = (query) => wrapAsyncApi(() => API.get(`/listings?q=${encodeURIComponent(query)}`));
export const getListingsByCategory = (category) => wrapAsyncApi(() => API.get(`/listings?category=${encodeURIComponent(category)}`));

export const getListing = (id) => wrapAsyncApi(() => API.get(`/listings/${id}`));
export const createListing = (listingData) => wrapAsyncApi(() => API.post('/listings', listingData));
export const updateListing = (id, listingData) => wrapAsyncApi(() => API.put(`/listings/${id}`, listingData));
export const deleteListing = (id) => wrapAsyncApi(() => API.delete(`/listings/${id}`));