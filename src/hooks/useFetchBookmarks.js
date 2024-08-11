import { useQuery } from "@tanstack/react-query";
import { fetchBookmarks } from "../services/fetchBookmarks";

/**
 * Custom hook to fetch bookmarks for a specific user.
 *
 * @param {Object} currentUser - The current user object containing the user ID.
 * @param {boolean} isGuest - Flag indicating if the user is a guest.
 * @returns {Object} - Result of the query, including bookmarks data and query status.
 */
export const useFetchBookmarks = (currentUser, isGuest) => {
  return useQuery({
    queryKey: ["bookmarks", currentUser.id],
    queryFn: () => fetchBookmarks(currentUser, isGuest),
  });
};
