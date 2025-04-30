// This file contains the axios instance for making API calls
// It sets the base URL for the API and enables sending cookies with requests

// Importing axios for making HTTP requests
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8080/api',
  withCredentials: true, // sends cookies with every request
});

export default API;
