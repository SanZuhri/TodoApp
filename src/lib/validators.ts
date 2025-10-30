/**
 * Validation Utilities
 * Common validation functions for forms and data
 */

import { VALIDATION_RULES } from "./constants";

export const validators = {
  /**
   * Validate email format
   */
  email: (value: string): boolean => {
    return VALIDATION_RULES.EMAIL_REGEX.test(value);
  },

  /**
   * Validate password strength
   */
  password: (value: string): boolean => {
    return value.length >= VALIDATION_RULES.PASSWORD_MIN_LENGTH;
  },

  /**
   * Validate username
   */
  username: (value: string): boolean => {
    return (
      value.length >= VALIDATION_RULES.USERNAME_MIN_LENGTH &&
      value.length <= VALIDATION_RULES.USERNAME_MAX_LENGTH
    );
  },

  /**
   * Check if value is empty
   */
  required: (value: any): boolean => {
    if (typeof value === "string") {
      return value.trim().length > 0;
    }
    return value !== null && value !== undefined;
  },

  /**
   * Validate minimum length
   */
  minLength: (value: string, min: number): boolean => {
    return value.length >= min;
  },

  /**
   * Validate maximum length
   */
  maxLength: (value: string, max: number): boolean => {
    return value.length <= max;
  },

  /**
   * Validate URL format
   */
  url: (value: string): boolean => {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  },

  /**
   * Validate phone number (basic format)
   */
  phone: (value: string): boolean => {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    return phoneRegex.test(value) && value.replace(/\D/g, "").length >= 10;
  },

  /**
   * Validate number is within range
   */
  range: (value: number, min: number, max: number): boolean => {
    return value >= min && value <= max;
  },
};

/**
 * Validation error messages
 */
export const validationMessages = {
  required: "This field is required",
  email: "Please enter a valid email address",
  password: `Password must be at least ${VALIDATION_RULES.PASSWORD_MIN_LENGTH} characters`,
  username: `Username must be between ${VALIDATION_RULES.USERNAME_MIN_LENGTH} and ${VALIDATION_RULES.USERNAME_MAX_LENGTH} characters`,
  url: "Please enter a valid URL",
  phone: "Please enter a valid phone number",
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must not exceed ${max} characters`,
  range: (min: number, max: number) => `Must be between ${min} and ${max}`,
};
