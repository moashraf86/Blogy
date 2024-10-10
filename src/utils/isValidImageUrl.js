/**
 * Validates if the provided URL is a valid image URL.
 * @param {string} url - The URL to validate.
 * @returns {Promise<boolean>} - Returns true if the URL is valid and points to an image, otherwise false.
 */
export const isValidImageUrl = async (url) => {
  // Regular expression to validate the URL format including query parameters
  const urlPattern =
    /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|svg|webp|tiff|ico)(\?.*)?)$/i;

  // Check if the URL matches the pattern
  if (!urlPattern.test(url)) {
    return false; // Invalid URL format
  }

  try {
    const response = await fetch(url, { method: "HEAD" });

    // Check if the response status is OK and the Content-Type is an image
    const contentType = response.headers.get("Content-Type");
    return response.ok && contentType && contentType.startsWith("image/");
  } catch (error) {
    console.error("Error fetching URL:", error);
    return false; // Fetch failed or URL is not reachable
  }
};
