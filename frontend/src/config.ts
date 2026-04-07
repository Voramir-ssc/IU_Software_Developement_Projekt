/**
 * Zentrale Konfiguration für die Frontend-Anwendung.
 * Nutzt 127.0.0.1 statt localhost, um IPv6-Probleme unter macOS zu vermeiden.
 * Port 5001 entspricht der Backend-Konfiguration (Workaround für AirPlay-Konflikt).
 */
export const API_BASE_URL = 'http://127.0.0.1:5001/api';
