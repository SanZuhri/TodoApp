/**
 * Environment Variables
 * Type-safe access to environment variables
 */

export const env = {
  // API
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
  
  // App
  appName: import.meta.env.VITE_APP_NAME || "Ultimate React Template",
  appVersion: import.meta.env.VITE_APP_VERSION || "1.0.0",
  
  // Feature flags
  enableAnalytics: import.meta.env.VITE_ENABLE_ANALYTICS === "true",
  enableDebug: import.meta.env.VITE_ENABLE_DEBUG === "true",
  
  // Environment
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
} as const;
