/**
 * Common TypeScript types and interfaces
 * Add your application-specific types here
 */

// Example User type
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

// Example API Response wrapper
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

// Pagination types
export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form types
export interface FormFieldError {
  field: string;
  message: string;
}

// Generic ID type
export type ID = string | number;

// Status types
export type Status = "idle" | "loading" | "success" | "error";

// Theme types
export type Theme = "light" | "dark" | "system";
