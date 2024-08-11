import { useQuery } from "@tanstack/react-query";
import { fetchBookmarksCount } from "../services/fetchBookmarksCount";

/**
 * Custom hook to fetch the number of bookmarks for a specific post.
 *
 * @param {Object} post - The post object containing the ID for fetching bookmarks count.
 * @returns {Object} - Result of the query, including bookmarks count data and query status.
 */
export const useFetchBookmarksCount = (post) => {
  return useQuery({
    queryKey: ["bookmarksCount", post.id],
    queryFn: () => fetchBookmarksCount(post),
  });
};
