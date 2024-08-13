import { useQuery } from "@tanstack/react-query";
import { fetchBookmarksCount } from "../services/fetchBookmarksCount";

/**
 * Custom hook to fetch the number of bookmarks for a specific post.
 *
 * @param {Object} post - The post object containing the ID for fetching bookmarks count.
 * @returns {Object} - Result of the query, including bookmarks count data and query status.
 */
export const useFetchBookmarksCount = (postId) => {
  return useQuery({
    queryKey: ["bookmarksCount", postId],
    queryFn: () => fetchBookmarksCount(postId),
    enabled: !!postId, // Enable the query if the post ID is available
  });
};
