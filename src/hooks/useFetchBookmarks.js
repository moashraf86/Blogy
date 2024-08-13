import { useQuery } from "@tanstack/react-query";
import { fetchBookmarks } from "../services/fetchBookmarks";

/**
 * Custom hook to fetch bookmarks for a specific user.
 *
 * @param {Object} currentUser - The current user object containing the user userId.
 * @param {boolean} isGuest - Flag indicating if the user is a guest.
 * @returns {Object} - Result of the query, including bookmarks data and query status.
 */
export const useFetchBookmarks = (userId, isGuest) => {
  return useQuery({
    queryKey: ["bookmarks", userId],
    queryFn: () => fetchBookmarks(userId, isGuest),
    enabled: !!userId && !isGuest, // Enable the query if the user is signed
  });
};
