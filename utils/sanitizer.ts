/**
 * Sanitizes user input for the Spinner Wheel.
 * Rules:
 * - Trim whitespace.
 * - Max length: 20 characters.
 * - Remove special characters < > { } ;
 */
export const sanitizeInput = (input: string): string => {
  if (!input) return '';

  // 1. Trim whitespace
  let clean = input.trim();

  // 2. Remove blocked characters to prevent injection/breaking layout
  // eslint-disable-next-line no-useless-escape
  clean = clean.replace(/[<>\{\};]/g, '');

  // 3. Enforce max length (20 chars)
  if (clean.length > 20) {
    clean = clean.substring(0, 20);
  }

  return clean;
};
