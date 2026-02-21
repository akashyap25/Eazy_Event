/**
 * Utility functions for handling API responses
 */

/**
 * Extracts data from API response, handling both old and new response formats
 * @param {Object} response - Axios response object
 * @param {string} fallback - Fallback value if data is not found
 * @returns {*} - Extracted data
 */
export const extractApiData = (response, fallback = null) => {
  if (!response || !response.data) {
    return fallback;
  }

  // New format: { success: true, data: [...], pagination: {...} }
  if (response.data.success && response.data.data !== undefined) {
    return response.data.data;
  }

  // Old format: direct data
  return response.data;
};

/**
 * Extracts array data from API response with safety checks
 * @param {Object} response - Axios response object
 * @param {Array} fallback - Fallback array if data is not found or not an array
 * @returns {Array} - Extracted array data
 */
export const extractApiArray = (response, fallback = []) => {
  const data = extractApiData(response, fallback);
  return Array.isArray(data) ? data : fallback;
};

/**
 * Extracts object data from API response with safety checks
 * @param {Object} response - Axios response object
 * @param {Object} fallback - Fallback object if data is not found
 * @returns {Object} - Extracted object data
 */
export const extractApiObject = (response, fallback = {}) => {
  const data = extractApiData(response, fallback);
  return data && typeof data === 'object' && !Array.isArray(data) ? data : fallback;
};

/**
 * Checks if API response indicates success
 * @param {Object} response - Axios response object
 * @returns {boolean} - True if response indicates success
 */
export const isApiSuccess = (response) => {
  return response && response.data && response.data.success === true;
};

/**
 * Extracts error message from API response
 * @param {Object} error - Axios error object
 * @returns {string} - Error message
 */
export const extractApiError = (error) => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message;
  }
  
  if (error.message) {
    return error.message;
  }
  
  return 'An unexpected error occurred';
};