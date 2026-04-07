/**
 * Central configuration for the frontend application.
 * Using 127.0.0.1 instead of localhost to avoid IPv6 resolution issues on macOS
 * and to match the backend port changed from 5000 to 5001 (AirPlay conflict).
 */
export const API_BASE_URL = 'http://127.0.0.1:5001/api';
