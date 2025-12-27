/**
 * Custom error class for handling HTTP status errors in browser environments.
 * Extends the native Error class to include HTTP status code and status text information.
 * Useful for writing higher-level functions that wrap fetch() and return
 * javascript objects rather than fetch Responses
 *
 * @example
 * ```ts
 * try {
 *   const response = await fetch('/api/users');
 *   if (!response.ok) {
 *     throw new StatusError(response);
 *   }
 *   return await response.json();
 * } catch (error) {
 *   if (error instanceof StatusError) {
 *     if (error.status === 401) {
 *       // Handle unauthorized error
 *       redirectToLogin();
 *     } else if (error.status === 404) {
 *       // Handle not found error
 *       showNotFoundMessage();
 *     }
 *   }
 *   throw error;
 * }
 * ```
 */

export class StatusError extends Error {
  /** The HTTP status code associated with this error */
  public readonly status: number;

  /** The HTTP status text associated with this error */
  public readonly statusText: string;

  /**
   * Creates a new StatusError instance
   * @param response - The Response object from a failed fetch request
   * @param message - Optional custom error message. If not provided, defaults to standard HTTP error format
   */
  constructor(response: Response, message?: string) {
    // Use custom message if provided, otherwise use standard HTTP error format
    super(message || `HTTP ${response.status} ${response.statusText}`);
    this.name = 'StatusError';
    this.status = response.status;
    this.statusText = response.statusText;

    // Required for proper instanceof checks in transpiled code
    Object.setPrototypeOf(this, StatusError.prototype);
  }
}
